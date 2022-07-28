const Router = require("router");
const CostController = require("../controller/cost/cost.controller");
const DashboardController = require("../controller/dashboard.controller");
const HomeController = require("../controller/index.controller");
const UserController = require("../controller/user/user.controller");
const router = Router();
const homeController = new HomeController();
const dashboardController = new DashboardController();
const userController = new UserController();
const costController = new CostController();
// home page
router.get("/", userController.readSession, homeController.showHomePage);

//dashboard page
router.get(
  "/dashboard",
  userController.readSession,
  dashboardController.showPage
);
//register
router.get("/register", userController.showRegisterPage);

router.get("/login", userController.showLoginPage);
router.get("/logout", userController.logout);

router.post("/register", userController.regiter);

router.post("/login", userController.login);

router.get("/cost", userController.readSession, costController.showListPage);
router.get(
  "/cost/create",
  userController.readSession,
  costController.showCreatePage
);
router.post(
  "/cost/create",
  userController.readSession,
  costController.createCosts
);
router.get(
  "/cost/update/:id",
  userController.readSession,
  costController.showUpdatePage
);
router.post(
  "/cost/update/:id",
  userController.readSession,
  costController.updateCost
);
router.get(
  "/cost/delete/:id",
  userController.readSession,
  costController.deleteCost
);

module.exports = router;
