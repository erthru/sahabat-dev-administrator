const prismaClient = require("@prisma/client");

const prisma = new prismaClient.PrismaClient();

async function getAll(req, res) {
  try {
    await prisma.$connect();

    const posts = await prisma.post.findMany({
      orderBy: {
        id: "desc",
      },
      include: {
        category: true,
        user: true,
      },
    });

    res.status(200).json({
      data: posts,
    });
  } catch (err) {
    res.status(500).json({
      error: 1,
      message: err.message,
    });
  }
}

module.exports = {
  getAll,
};
