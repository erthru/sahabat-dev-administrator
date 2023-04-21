const prismaClient = require("@prisma/client");
const helpers = require("../../../utils/helpers");

const prisma = new prismaClient.PrismaClient();

async function get(req, res) {
  try {
    const { id } = req.params;
    await prisma.$connect();

    const [categories, post] = await Promise.all([
      await prisma.category.findMany(),
      await prisma.post.findUniqueOrThrow({
        include: {
          category: true,
          user: true,
        },
        where: {
          id: Number(id),
        },
      }),
    ]);

    res.render("pages/dashboard/posts/detail", {
      layout: "layouts/layout-dashboard",
      title: `Detail Postingan | ${process.env.APP_NAME}`,
      navbarTitle: "Detail Postingan",
      categories,
      post,
    });
  } catch (err) {
    res.send(err.message);
  }
}

async function put(req, res) {
  try {
    const { id } = req.params;
    const { title, body, thumbnail, categoryId, tags, status } = req.body;
    await prisma.$connect();

    await prisma.post.update({
      data: {
        title,
        body,
        thumbnail,
        slug: helpers.generateSlug(title),
        status,
        tags,
        categoryId: Number(categoryId),
        userId: req.session.user.id,
      },
      where: {
        id: Number(id),
      },
    });

    req.flash("toastSuccess", "Berhasil memperbarui postingan");
    res.redirect("/dashboard/posts");
  } catch (err) {
    res.send(err.message);
  }
}

module.exports = {
  get,
  put,
};
