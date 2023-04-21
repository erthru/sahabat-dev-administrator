const prismaClient = require("@prisma/client");
const helpers = require("../../../utils/helpers");

const prisma = new prismaClient.PrismaClient();

async function get(req, res) {
  try {
    const { id } = req.params;
    await prisma.$connect();

    const category = await prisma.category.findUniqueOrThrow({
      where: {
        id: Number(id),
      },
    });

    res.render("pages/dashboard/categories/detail", {
      layout: "layouts/layout-dashboard",
      title: `Detail Kategori | ${process.env.APP_NAME}`,
      navbarTitle: "Detail Kategori",
      category,
    });
  } catch (err) {
    res.send(err.message);
  }
}

async function put(req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;
    await prisma.$connect();

    await prisma.category.update({
      data: {
        name,
        slug: helpers.generateSlug(name),
      },
      where: {
        id: Number(id),
      },
    });

    req.flash("toastSuccess", "Berhasil memperbarui kategori");
    res.redirect("/dashboard/categories");
  } catch (err) {
    res.send(err.message);
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    await prisma.$connect();

    await prisma.category.delete({
      where: {
        id: Number(id),
      },
    });

    req.flash("toastSuccess", "Berhasil menghapus kategori");
    res.redirect("/dashboard/categories");
  } catch (err) {
    res.send(err.message);
  }
}

module.exports = {
  get,
  put,
  remove,
};
