const Router = require("router");
const DashboardController = require("../controller/dashboard.controller");
const HomeController = require("../controller/index.controller");
const UserController = require("../controller/user.controller");
const router = Router();
const homeController = new HomeController();
const dashboardController = new DashboardController();
const userController = new UserController();
// home page
router.get("/", userController.readSession, homeController.showHomePage);

//dashboard page
router.get(
  "/dashboard",
  userController.readSession,
  dashboardController.showPage
);

router.get("/register", userController.showRegisterPage);

router.get("/login", userController.showLoginPage);
router.get("/logout", userController.logout);

router.post("/register", userController.regiter);

router.post("/login", userController.login);

module.exports = router;
