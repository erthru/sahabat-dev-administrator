const prismaClient = require("@prisma/client");

const prisma = new prismaClient.PrismaClient();

async function get(req, res) {
  try {
    await prisma.$connect();

    const [postsTotal, categoriesTotal] = await Promise.all([
      prisma.post.count(),
      prisma.category.count(),
    ]);

    res.render("pages/dashboard/index", {
      layout: "layouts/layout-dashboard",
      title: `Dashboard | ${process.env.APP_NAME}`,
      navbarTitle: "Dashboard",
      postsTotal,
      categoriesTotal,
    });
  } catch (err) {
    res.send(err.message);
  }
}

module.exports = {
  get,
};
