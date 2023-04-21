const prismaClient = require("@prisma/client");

const prisma = new prismaClient.PrismaClient();

async function get(req, res) {
  try {
    await prisma.$connect();

    const postsTotal = await prisma.post.count({
      where: {
        userId: req.session.user.id,
      },
    });

    res.render("pages/dashboard/profile", {
      layout: "layouts/layout-dashboard",
      title: `Profil | ${process.env.APP_NAME}`,
      navbarTitle: "Profil",
      postsTotal,
    });
  } catch (err) {
    res.send(err.message);
  }
}

async function put(req, res) {
  try {
    const { fullname, email } = req.body;
    await prisma.$connect();

    const user = await prisma.user.update({
      data: {
        fullname,
        email,
      },
      where: {
        id: req.session.user.id,
      },
    });

    req.session.user = user;

    req.flash("toastSuccess", "Berhasil memperbarui profil");
    res.redirect("/dashboard/profile");
  } catch (err) {
    res.send(err.message);
  }
}

module.exports = {
  get,
  put,
};
