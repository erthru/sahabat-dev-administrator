const prismaClient = require("@prisma/client");

const prisma = new prismaClient.PrismaClient();

async function get(req, res) {
  try {
    await prisma.$connect();
    const posts = await prisma.post.findMany();

    res.render("pages/dashboard/posts/index", {
      title: `Postingan | ${process.env.APP_NAME}`,
      navbarTitle: "Postingan",
      posts,
    });
  } catch (err) {
    res.send(err.message);
  }
}

module.exports = {
  get,
};
