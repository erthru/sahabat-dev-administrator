const express = require("express");
const authMiddleware = require("./middlewares/auth");
const uploadMiddleware = require("./middlewares/upload");
const indexController = require("./controllers/index-controller");
const loginController = require("./controllers/login-controller");
const logoutController = require("./controllers/logout-controller");
const dashboardIndexController = require("./controllers/dashboard/index-controller");
const dashboardUsersIndexController = require("./controllers/dashboard/users/index-controller");
const dashboardUsersAddController = require("./controllers/dashboard/users/add-controller");
const dashboardUsersDetailController = require("./controllers/dashboard/users/detail-controller");
const dashboardPostsIndexController = require("./controllers/dashboard/posts/index-controller");
const dashboardPostsAddController = require("./controllers/dashboard/posts/add-controller");
const dashboardPostsDetailController = require("./controllers/dashboard/posts/detail-controller");
const dashboardCategoryIndexController = require("./controllers/dashboard/categories/index-controller");
const dashboardCategoryAddController = require("./controllers/dashboard/categories/add-controller");
const apiSeedController = require("./controllers/api/seed-controller");
const apiSessionOnlyController = require("./controllers/api/session-only-controller");

const router = express.Router();

router.get("/", indexController.get);
router.get("/login", authMiddleware.guest, loginController.get);
router.post("/login", authMiddleware.guest, loginController.post);
router.get("/logout", logoutController.get);

router.get("/dashboard", authMiddleware.required, dashboardIndexController.get);

router.get(
  "/dashboard/users",
  authMiddleware.required,
  dashboardUsersIndexController.get
);

router.get(
  "/dashboard/users/add",
  authMiddleware.required,
  dashboardUsersAddController.get
);

router.post(
  "/dashboard/users/add",
  authMiddleware.required,
  dashboardUsersAddController.post
);

router.get(
  "/dashboard/users/:id",
  authMiddleware.required,
  dashboardUsersDetailController.get
);

router.put(
  "/dashboard/users/:id",
  authMiddleware.required,
  dashboardUsersDetailController.put
);

router.delete(
  "/dashboard/users/:id",
  authMiddleware.required,
  dashboardUsersDetailController.remove
);

router.get(
  "/dashboard/posts",
  authMiddleware.required,
  dashboardPostsIndexController.get
);

router.get(
  "/dashboard/posts/add",
  authMiddleware.required,
  dashboardPostsAddController.get
);

router.post(
  "/dashboard/posts/add",
  authMiddleware.required,
  dashboardPostsAddController.post
);

router.get(
  "/dashboard/posts/:id",
  authMiddleware.required,
  dashboardPostsDetailController.get
);

router.put(
  "/dashboard/posts/:id",
  authMiddleware.required,
  dashboardPostsDetailController.put
);

router.delete(
  "/dashboard/posts/:id",
  authMiddleware.required,
  dashboardPostsDetailController.remove
);

router.get(
  "/dashboard/categories",
  authMiddleware.required,
  dashboardCategoryIndexController.get
);

router.get(
  "/dashboard/categories/add",
  authMiddleware.required,
  dashboardCategoryAddController.get
);

router.post(
  "/dashboard/categories/add",
  authMiddleware.required,
  dashboardCategoryAddController.post
);

// api
router.get("/api/seeds", apiSeedController.seed);

router.post(
  "/api/session-only/upload/image",
  authMiddleware.required,
  uploadMiddleware.upload("image").single("file"),
  apiSessionOnlyController.imageUpload
);

module.exports = router;
