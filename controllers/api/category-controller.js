const prismaClient = require("@prisma/client");

const prisma = new prismaClient.PrismaClient();

async function getAll(req, res) {
  try {
    await prisma.$connect();

    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });

    res.status(200).json({
      data: categories,
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
