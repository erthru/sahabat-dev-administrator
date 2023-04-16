const prismaClient = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new prismaClient.PrismaClient();

function login(req, res) {
  try {
    res.render("pages/login", {
      title: `Login | ${process.env.APP_NAME}`,
      errorFlashMessage: req.flash("error"),
    });
  } catch (err) {
    res.send(err.message);
  }
}

async function attemp(req, res) {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (!user) {
      req.flash("error", "login failed");
      res.redirect("/login");
      return;
    }

    const isAuthenticated = await bcrypt.compare(password, user.password);

    if (!isAuthenticated) {
      req.flash("error", "login failed");
      res.redirect("/login");
      return;
    }

    req.session.user = user;

    await new Promise(function (resolve, reject) {
      req.session.save(function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    res.redirect("/dashboard");
  } catch (err) {
    res.send(err.message);
  }
}

module.exports = {
  login,
  attemp,
};
