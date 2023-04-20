const prismaClient = require("@prisma/client");

const prisma = new prismaClient.PrismaClient();

async function get(req, res) {
  try {
    if (req.session.user.role !== "ADMIN") {
      res.send("not allowed");
      return;
    }

    await prisma.$connect();

    const users = await prisma.user.findMany({
      orderBy: {
        id: "desc",
      },
    });

    res.render("pages/dashboard/users/index", {
      layout: "layouts/layout-dashboard",
      title: `Pengguna | ${process.env.APP_NAME}`,
      navbarTitle: "Pangguna",
      users,
    });
  } catch (err) {
    res.send(err.message);
  }
}

module.exports = {
  get,
};
