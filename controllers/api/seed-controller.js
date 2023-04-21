const prismaClient = require("@prisma/client");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

const prisma = new prismaClient.PrismaClient();

async function seed(req, res) {
  try {
    const { seedPassword } = req.query;

    if (seedPassword !== process.env.SEED_PASSWORD) {
      res.status(403).json({
        error: 1,
        message: "seed password incorect",
      });

      return;
    }

    req.session = null;

    await new Promise(function (resolve, reject) {
      fs.readdir("public/uploads", function (err, files) {
        if (err) {
          reject(err);
        }

        for (const file of files) {
          if (file !== "dummy.png") {
            fs.unlink(path.join("public/uploads", file), function (err) {
              if (err) {
                reject(err);
              }
            });
          }
        }

        resolve();
      });
    });

    await prisma.$connect();

    await Promise.all([
      prisma.category.deleteMany({}),
      prisma.post.deleteMany({}),
      prisma.user.deleteMany({}),
    ]);

    const encryptedPassword = await bcrypt.hash("123456", 10);

    await Promise.all([
      prisma.user.create({
        data: {
          username: "admin",
          password: encryptedPassword,
          role: "ADMIN",
          fullname: "Sahabat Dev Admin",
          email: "admin@sahabatdev.com",
        },
      }),
      prisma.user.create({
        data: {
          username: "erthru",
          password: encryptedPassword,
          role: "USER",
          fullname: "Suprianto Djmlu",
          email: "ersaka96@gmail.com",
        },
      }),
    ]);

    res.status(201).json({
      error: 0,
      message: "seeded",
    });
  } catch (err) {
    res.status(501).json({
      error: 1,
      message: err.message,
    });
  }
}

module.exports = {
  seed,
};
