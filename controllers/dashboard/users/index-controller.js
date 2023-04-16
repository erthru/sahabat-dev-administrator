const prismaClient = require("@prisma/client");

const prisma = new prismaClient.PrismaClient();

async function index(req, res) {
  try {
    await prisma.$connect();

    const users = await prisma.user.findMany({
      orderBy: {
        id: "desc",
      },
    });

    res.render("pages/dashboard/users/index", {
      title: `Pengguna | ${process.env.APP_NAME}`,
      navbarTitle: "Pangguna",
      users
    });
  } catch (err) {
    res.send(err.message);
  }
}

module.exports = {
  index,
};
