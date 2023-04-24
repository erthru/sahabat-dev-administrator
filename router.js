const express = require("express");
const authMiddleware = require("./middlewares/auth");
const uploadMiddleware = require("./middlewares/upload");
const indexController = require("./controllers/index-controller");
const loginController = require("./controllers/login-controller");
const forgotPasswordController = require("./controllers/forgot-password-controller");
const logoutController = require("./controllers/logout-controller");
const dashboardIndexController = require("./controllers/dashboard/index-controller");
const dashboardUsersIndexController = require("./controllers/dashboard/users/index-controller");
const dashboardUsersAddController = require("./controllers/dashboard/users/add-controller");
const dashboardUsersDetailController = require("./controllers/dashboard/users/detail-controller");
const dashboardPostsIndexController = require("./controllers/dashboard/posts/index-controller");
const dashboardPostsAddController = require("./controllers/dashboard/posts/add-controller");
const dashboardPostsDetailController = require("./controllers/dashboard/posts/detail-controller");
const dashboardCategoriesIndexController = require("./controllers/dashboard/categories/index-controller");
const dashboardCategoriesAddController = require("./controllers/dashboard/categories/add-controller");
const dashboardCategoriesDetailController = require("./controllers/dashboard/categories/detail-controller");
const dashboardProfileController = require("./controllers/dashboard/profile-controller");
const apiSeedController = require("./controllers/api/seed-controller");
const apiSessionOnlyController = require("./controllers/api/session-only-controller");
const apiCategoryController = require("./controllers/api/category-controller");
const apiPostController = require("./controllers/api/post-controller");

const router = express.Router();

router.get("/", indexController.get);
router.get("/login", authMiddleware.guest, loginController.get);
router.post("/login", authMiddleware.guest, loginController.post);

router.get(
  "/forgot-password",
  authMiddleware.guest,
  forgotPasswordController.get
);

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
  dashboardCategoriesIndexController.get
);

router.get(
  "/dashboard/categories/add",
  authMiddleware.required,
  dashboardCategoriesAddController.get
);

router.post(
  "/dashboard/categories/add",
  authMiddleware.required,
  dashboardCategoriesAddController.post
);

router.get(
  "/dashboard/categories/:id",
  authMiddleware.required,
  dashboardCategoriesDetailController.get
);

router.put(
  "/dashboard/categories/:id",
  authMiddleware.required,
  dashboardCategoriesDetailController.put
);

router.delete(
  "/dashboard/categories/:id",
  authMiddleware.required,
  dashboardCategoriesDetailController.remove
);

router.get(
  "/dashboard/profile",
  authMiddleware.required,
  dashboardProfileController.get
);

router.put(
  "/dashboard/profile",
  authMiddleware.required,
  dashboardProfileController.put
);

// api
router.get("/api/seeds", apiSeedController.seed);

router.post(
  "/api/session-only/upload/image",
  authMiddleware.required,
  uploadMiddleware.upload("image").single("file"),
  apiSessionOnlyController.imageUpload
);

router.get("/api/posts", apiPostController.getAll);
router.get("/api/categories", apiCategoryController.getAll);

module.exports = router;
