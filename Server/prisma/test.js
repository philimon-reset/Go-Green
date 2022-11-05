const moment = require("moment");
const prisma = require("./Storageengine/initPrisma");

(async () => {
  // console.log("start testing");
  // console.log(attendanceId);
  // await prisma.attendence.deleteMany({});
  // await prisma.attendence.upsert({
  //   where: {
  //     id: attendanceId ? Number(attendanceId) : 0,
  //   },
  //   update: {
  //     Morning_Entry:
  //       status.toUpperCase() === "MORNING" ? new Date() : undefined,
  //     Afternoon_Entry:
  //       status.toUpperCase() === "AFTERNOON" ? new Date() : undefined,
  //     userId: 1,
  //   },
  //   create: {
  //     Morning_Entry:
  //       status.toUpperCase() === "MORNING" ? new Date() : undefined,
  //     Afternoon_Entry:
  //       status.toUpperCase() === "AFTERNOON" ? new Date() : undefined,
  //     userId: 1,
  //   },
  // });
  const currentchat = (
    await prisma.chat.findUnique({
      where: {
        id: 132,
      },
    })
  ).id;
  console.log(currentchat);
  // const lastchat = await prisma.chat.findMany({
  //   orderBy: {
  //     createdAt: "desc",
  //   },
  //   where: {
  //     createdAt: {
  //       lt: currentchat.createdAt,
  //     },
  //   },
  //   take: 1,
  // });
  // console.log(lastchat);
  // const check = await prisma.lastSeen.update({
  //   where: {
  //     userId_chatroomId: {
  //       chatroomId: 5,
  //       userId: 12,
  //     },
  //   },
  //   data: {
  //     chatId: lastchat[0].id,
  //   },
  // });
  // console.log(check);
})();
