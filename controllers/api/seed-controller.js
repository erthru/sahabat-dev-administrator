const prismaClient = require("@prisma/client");
const bcrypt = require("bcrypt");

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

    await prisma.$connect();

    await Promise.all([
      prisma.user.deleteMany({}),
      prisma.post.deleteMany({}),
      prisma.category.deleteMany({}),
      prisma.Tag.deleteMany({}),
      prisma.usedTag.deleteMany({}),
    ]);

    const password = await bcrypt.hash("admin", 10);

    await prisma.user.create({
      data: {
        username: "admin",
        password: password,
        role: "ADMIN",
        fullname: "Sahabat Dev Admin",
      },
    });

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
