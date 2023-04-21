const prismaClient = require("@prisma/client");

const prisma = new prismaClient.PrismaClient();

async function get(req, res) {
  try {
    await prisma.$connect();
    const categories = await prisma.category.findMany();

    res.render("pages/dashboard/posts/add", {
      layout: "layouts/layout-dashboard",
      title: `Tambah Postingan | ${process.env.APP_NAME}`,
      navbarTitle: "Tambah Postingan",
      categories,
    });
  } catch (err) {
    res.send(err.message);
  }
}

module.exports = {
  get,
};
