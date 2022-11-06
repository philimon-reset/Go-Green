const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const userData = [
  {
    name: "kebede",
    email: "kebede@email.com",
    password: "test",
    wallet: 500,
    PayPal: "testing",
    Sponsor_B: {
      create: [
        {
          Price: 2,
          tree: {
            connect: {
              id: 34
            }
          },
          City: {
            connect: {
              id: 15
            }
          },
        },
        {
          Price: 9,
          tree: {
            connect: {
              id: 5
            }
          },
          City: {
            connect: {
              id: 3
            }
          },
        },
        {
          Price: 4,
          tree: {
            connect: {
              id: 23
            }
          },
          City: {
            connect: {
              id: 14
            }
          },
        }
      ]
    }
  },
  {
    name: "Phili",
    email: "Phili@email.com",
    password: "root",
    wallet: 300,
    Sponsor_B: {
      create: [
        {
          Price: 7,
          tree: {
            connect: {
              id: 17
            }
          },
          City: {
            connect: {
              id: 23
            }
          },
        },
        {
          Price: 2,
          tree: {
            connect: {
              id: 6
            }
          },
          City: {
            connect: {
              id: 8
            }
          },
        },
        {
          Price: 5,
          tree: {
            connect: {
              id: 23
            }
          },
          City: {
            connect: {
              id: 45
            }
          },
        }
      ]
    }
  },
  {
    name: "Abel",
    email: "Abel@email.com",
    password: "testing",
    Sponsor_B: {
      create: [
        {
          Price: 10,
          tree: {
            connect: {
              id: 10
            }
          },
          City: {
            connect: {
              id: 10
            }
          },
        },
        {
          Price: 7,
          tree: {
            connect: {
              id: 5
            }
          },
          City: {
            connect: {
              id: 3
            }
          },
        },
        {
          Price: 6,
          tree: {
            connect: {
              id: 8
            }
          },
          City: {
            connect: {
              id: 12
            }
          },
        }
      ]
    }
  }
]

async function main() {
  // await prisma.user.deleteMany();
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
