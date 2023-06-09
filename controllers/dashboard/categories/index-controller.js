const prismaClient = require("@prisma/client");

const prisma = new prismaClient.PrismaClient();

async function get(req, res) {
  try {
    await prisma.$connect();
    const categories = await prisma.category.findMany();

    res.render("pages/dashboard/categories/index", {
      layout: "layouts/layout-dashboard",
      title: `Kategori | ${process.env.APP_NAME}`,
      navbarTitle: "Kategori",
      categories,
    });
  } catch (err) {
    res.send(err.message);
  }
}

module.exports = {
  get,
};
