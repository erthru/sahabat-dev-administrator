const prismaClient = require("@prisma/client");
const helpers = require("../../../utils/helpers");

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

async function post(req, res) {
  try {
    const { title, body, thumbnail, categoryId, tags, status } = req.body;
    await prisma.$connect();

    await prisma.post.create({
      data: {
        title,
        body,
        thumbnail,
        slug: helpers.generateSlug(title),
        status,
        totalView: 0,
        tags,
        userId: req.session.user.id,
        categoryId: Number(categoryId),
      },
    });

    req.flash("toastSuccess", "Berhasil membuat postingan");
    res.redirect("/dashboard/posts");
  } catch (err) {
    res.send(err.message);
  }
}

module.exports = {
  get,
  post,
};
