const prisma = require("../initPrisma");
const { assignChatT, getMessage } = require("../../../src/joi");
const { HttpError, ValidationError } = require("../../../src/error");
const Joi = require("joi");
const { writeFile, existsSync } = require("fs");
const path = require("path");
const { task } = require("../initPrisma");
module.exports = class Sockets {
  static activeUsers = new Map();
  // join a user to a room
  static async joinRoom(socket, userId, chatroomId) {
    const { error } = assignChatT({ userId, chatroomId });

    if (error) {
      throw new ValidationError(400, error);
    }
    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    });
    const chatroom = await prisma.chatRoom.findUnique({
      where: {
        id: Number(chatroomId),
      },
    });
    if (!chatroom) {
      throw new HttpError(404, "Chatroom not found");
    }
    const userList = [];
    chatroom.participants.forEach(async (id) => {
      userList.push(
        await prisma.user.findUnique({
          where: {
            id,
          },
        })
      );
    });
    socket.user = user;
    socket.chatroom = chatroom;
    this.activeUsers.set(socket.id, user);
    return { chatroom, user, userList };
  }

  static async storeMessage(payload, file = undefined, fileName) {
    let { userId, chatroomId, message, type } = payload;
    // const schema = Joi.string();
    // const { error } = schema.validate(message);
    // // validation
    // console.log(message, file);
    // if (error) {
    //   console.log(error);
    //   throw new ValidationError(400, error);
    // }
    const fullname =
      file && `Philimon/public/uploads/${Date.now() + "-" + fileName}`;
    const main = file && `/uploads/${Date.now() + "-" + fileName}`;

    if (file && fileName) {
      writeFile(fullname, file, (err) => {
        console.log(err);
      });
    }
    type = file ? (type = "file") : (type = "string");
    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    });
    const chat = await prisma.chat.create({
      data: {
        body: message,
        chatroomId: Number(chatroomId),
        ownerId: user.id,
        type,
        path: main,
        size: file && Buffer.byteLength(file).toString(),
      },
    });
    const updated = await prisma.lastSeen.update({
      where: {
        userId_chatroomId: {
          chatroomId: Number(chatroomId),
          userId: user.id,
        },
      },
      data: {
        chatId: chat.id,
      },
    });
    const read = await prisma.read.create({
      data: {
        chatId: chat.id,
        userId: user.id,
      },
    });
    if (updated && read) {
      return chat;
    }
    throw new HttpError(400, "Update failed");
  }

  static async deleteMessage(payload) {
    let { userId, chatroomId, chatId } = payload;
    const { error } = getMessage({ userId, chatroomId, chatId });

    if (error) {
      throw new ValidationError(400, error);
    }
    const currentchat = await prisma.chat.findUnique({
      where: {
        id: chatId,
      },
    });
    if (!currentchat) {
      return false;
    }
    const lastchat = await prisma.chat.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        createdAt: {
          lt: currentchat?.createdAt,
        },
      },
      take: 1,
    });
    await prisma.lastSeen.update({
      where: {
        userId_chatroomId: {
          chatroomId,
          userId,
        },
      },
      data: {
        chatId: lastchat[0]?.id,
      },
    });
    await prisma.chat.delete({
      where: {
        id: Number(chatId),
      },
    });
    return true;
  }

  static async getallMessages(chatroomId) {
    const schema = Joi.number().required();
    const { error, value } = schema.validate(Number(chatroomId));
    // validation
    if (error) {
      console.log(error);
      throw new ValidationError(400, error);
    }
    const chats = await prisma.chat.findMany({
      where: {
        chatroomId: Number(chatroomId),
      },
    });
    return chats;
  }

  static async getmyMessages(payload) {
    const { userId, chatroomId } = payload;
    const { error } = assignChatT({ userId, chatroomId });

    if (error) {
      throw new ValidationError(400, error);
    }
    const lastSeen = await prisma.lastSeen.findUnique({
      where: {
        userId_chatroomId: {
          chatroomId: Number(chatroomId),
          userId: Number(userId),
        },
      },
      include: {
        chat: true,
      },
    });
    const myChats = await prisma.chat.count({
      where: {
        chatroomId: Number(chatroomId),
        createdAt: {
          lte: lastSeen.chat?.createdAt,
        },
      },
    });
    console.log(lastSeen, myChats);
    const readChats = await prisma.chat.findMany({
      where: {
        chatroomId: Number(chatroomId),
        createdAt: {
          lte: lastSeen.chat?.createdAt,
        },
      },
      include: {
        owner: true,
        readers: {
          select: {
            user: true,
          },
        },
      },
      skip: myChats > 5 ? myChats - 5 : 0,
      take: 5,
    });
    const unreadChats = await prisma.chat.count({
      where: {
        chatroomId: Number(chatroomId),
        createdAt: {
          gt: lastSeen.chat?.createdAt,
        },
      },
    });

    readChats.forEach(async (chat) => {
      await prisma.read.upsert({
        where: {
          userId_chatId: {
            chatId: chat.id,
            userId,
          },
        },
        create: {
          chatId: chat.id,
          userId,
        },
        update: {},
      });
    });
    console.log("presentmessages", readChats, unreadChats);
    return { readChats, unreadChats };
  }

  static async getcursorMessages(payload) {
    let { userId, chatroomId, chatId } = payload;
    const { error } = getMessage({ userId, chatroomId, chatId });

    if (error) {
      throw new ValidationError(400, error);
    }
    const lastSeen = await prisma.lastSeen.findUnique({
      where: {
        userId_chatroomId: {
          chatroomId: Number(chatroomId),
          userId: Number(userId),
        },
      },
    });
    console.log(lastSeen);
    let [take, skip] = [5, 1];
    let chatlast = chatId;
    if (lastSeen.chatId > chatId || !lastSeen.chatId) {
      take = -5;
    }
    console.log(lastSeen.chatId);
    if (chatlast === -1) {
      chatId =
        lastSeen.chatId ??
        (
          await prisma.chat.findFirst({
            orderBy: {
              createdAt: "desc",
            },
          })
        ).id;
    }
    console.log(chatId);
    let messages = await prisma.chat.findMany({
      where: {
        chatroomId: Number(chatroomId),
      },
      cursor: {
        id: chatId ?? undefined,
      },
      include: {
        owner: true,
        readers: {
          select: {
            user: true,
          },
        },
      },
      skip,
      take: chatlast === -1 ? undefined : take,
    });
    if (lastSeen.chatId <= chatId) {
      await prisma.lastSeen.update({
        where: {
          userId_chatroomId: {
            chatroomId: Number(chatroomId),
            userId: Number(userId),
          },
        },
        data: {
          chatId: messages[messages.length - 1]?.id,
        },
      });
    }
    messages.forEach(async (chat) => {
      console.log("messages read for loop", chat.id, userId);
      await prisma.chat.update({
        where: {
          id: chat.id,
        },
        data: {
          readers: {
            connectOrCreate: {
              where: {
                userId_chatId: {
                  chatId: chat.id,
                  userId,
                },
              },
              create: {
                userId,
              },
            },
          },
        },
        include: {
          readers: {
            select: {
              user: true,
            },
          },
          owner: true,
        },
      });
      console.log(chat.readers, "here\n");
    });

    // disgusting hot fix, please make a better solution.
    messages = await prisma.chat.findMany({
      where: {
        chatroomId: Number(chatroomId),
      },
      cursor: {
        id: chatId ?? undefined,
      },
      include: {
        owner: true,
        readers: {
          select: {
            user: true,
          },
        },
      },
      skip,
      take: chatlast === -1 ? undefined : take,
    });
    console.log(messages, userId, "cursormessages");
    return { messages };
  }

  static async readMessage(payload) {
    const { userId, chatroomId, chatId } = payload;
    const { error } = assignChatT({ userId, chatroomId });

    if (error) {
      throw new ValidationError(400, error);
    }
    await prisma.lastSeen.update({
      where: {
        userId_chatroomId: {
          chatroomId: chatroomId,
          userId: userId,
        },
      },
      data: {
        chatId,
      },
    });
    await prisma.read.upsert({
      where: {
        userId_chatId: {
          chatId,
          userId,
        },
      },
      create: {
        chatId,
        userId,
      },
      update: {},
    });
    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
      },
      include: {
        readers: {
          select: {
            user: true,
          },
        },
        owner: true,
      },
    });

    return chat;
  }
};
