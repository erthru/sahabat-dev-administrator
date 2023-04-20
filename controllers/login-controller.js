const prismaClient = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new prismaClient.PrismaClient();

function get(req, res) {
  try {
    res.render("pages/login", {
      title: `Login | ${process.env.APP_NAME}`,
    });
  } catch (err) {
    res.send(err.message);
  }
}

async function post(req, res) {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      req.flash("toastError", "Login gagal, username atau password salah");
      res.redirect("/login");
      return;
    }

    const isAuthenticated = await bcrypt.compare(password, user.password);

    if (!isAuthenticated) {
      req.flash("toastError", "Login gagal, username atau password salah");
      res.redirect("/login");
      return;
    }

    req.session.user = user;
    res.redirect("/dashboard");
  } catch (err) {
    res.send(err.message);
  }
}

module.exports = {
  get,
  post,
};
