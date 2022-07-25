const Router = require("router");
const DashboardController = require("../controller/dashboard.controller");
const HomeController = require("../controller/index.controller");
const router = Router();
const homeController = new HomeController();
const dashboardController = new DashboardController();

// home page
router.get("/", homeController.showHomePage);

//dashboard page
router.get("/dashboard", dashboardController.showPage);

module.exports = router;
