const prismaClient = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new prismaClient.PrismaClient();

async function get(req, res) {
  try {
    if (req.session.user.role !== "ADMIN") {
      res.send("not allowed");
      return;
    }

    res.render("pages/dashboard/users/add", {
      title: `Tambah Pengguna | ${process.env.APP_NAME}`,
      navbarTitle: "Tambah Pangguna",
    });
  } catch (err) {
    res.send(err.message);
  }
}

async function post(req, res) {
  try {
    if (req.session.user.role !== "ADMIN") {
      res.send("not allowed");
      return;
    }

    const { username, confirmationPassword, password, fullname, email } =
      req.body;

    if (password !== confirmationPassword) {
      req.flash("toastError", "Password tidak sama");
      res.redirect("/dashboard/users/add");
      return;
    }

    await prisma.$connect();
    const encryptedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        username,
        password: encryptedPassword,
        role: "USER",
        fullname,
        email,
      },
    });

    req.flash("toastSuccess", "Berhasil membuat pengguna baru");
    res.redirect("/dashboard/users");
  } catch (err) {
    res.send(err.message);
  }
}

module.exports = {
  get,
  post,
};
