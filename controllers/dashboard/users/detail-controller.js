const prismaClient = require("@prisma/client");

const prisma = new prismaClient.PrismaClient();

async function get(req, res) {
  try {
    if (req.session.user.role !== "ADMIN") {
      res.send("not allowed");
      return;
    }

    const { id } = req.params;
    await prisma.$connect();

    const user = await prisma.user.findFirstOrThrow({
      where: {
        id: Number(id),
        role: "USER",
      },
    });

    res.render("pages/dashboard/users/detail", {
      title: `Detail Pengguna | ${process.env.APP_NAME}`,
      navbarTitle: "Detail Pangguna",
      user,
    });
  } catch (err) {
    res.send(err.message);
  }
}

async function put(req, res) {
  try {
    if (req.session.user.role !== "ADMIN") {
      res.send("not allowed");
      return;
    }

    const { id } = req.params;
    const { username, fullname, email } = req.body;

    await prisma.user.update({
      data: {
        username,
        fullname,
        email,
      },
      where: {
        id: Number(id),
      },
    });

    req.flash("toastSuccess", "Berhasil memperbarui pengguna");
    res.redirect("/dashboard/users");
  } catch (err) {
    res.send(err.message);
  }
}

async function remove(req, res) {
  try {
    if (req.session.user.role !== "ADMIN") {
      res.send("not allowed");
      return;
    }

    const { id } = req.params;

    await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });

    req.flash("toastSuccess", "Berhasil menghapus pengguna");
    res.redirect("/dashboard/users");
  } catch (err) {
    res.send(err.message);
  }
}

module.exports = {
  get,
  put,
  remove,
};
