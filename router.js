const express = require("express");
const authMiddleware = require("./middlewares/auth");
const indexController = require("./controllers/index-controller");
const loginController = require("./controllers/login-controller");
const logoutController = require("./controllers/logout-controller");
const dashboardIndexController = require("./controllers/dashboard/index-controller");
const dashboardUsersIndexController = require("./controllers/dashboard/users/index-controller");
const apiSeedController = require("./controllers/api/seed-controller");

const router = express.Router();

router.get("/", indexController.index);
router.get("/login", authMiddleware.guest, loginController.login);
router.post("/login", authMiddleware.guest, loginController.attemp);
router.get("/logout", logoutController.logout);

router.get(
  "/dashboard",
  authMiddleware.required,
  dashboardIndexController.index
);

router.get(
  "/dashboard/users",
  authMiddleware.required,
  dashboardUsersIndexController.index
);

// api
router.get("/api/seeds", apiSeedController.seed);

module.exports = router;
