const prismaClient = require("@prisma/client");
const helpers = require("../../../utils/helpers");

const prisma = new prismaClient.PrismaClient();

function get(req, res) {
  try {
    res.render("pages/dashboard/categories/add", {
      layout: "layouts/layout-dashboard",
      title: `Tambah Kategori | ${process.env.APP_NAME}`,
      navbarTitle: "Tambah Kategori",
    });
  } catch (err) {
    res.send(err.message);
  }
}

async function post(req, res) {
  try {
    const { name } = req.body;
    await prisma.$connect();

    await prisma.category.create({
      data: {
        name,
        slug: helpers.generateSlug(name),
      },
    });

    req.flash("toastSuccess", "Berhasil membuat kategori");
    res.redirect("/dashboard/categories");
  } catch (err) {
    res.send(err.message);
  }
}

module.exports = {
  get,
  post,
};
