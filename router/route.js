const Router = require("router");
const DashboardController = require("../controller/dashboard.controller");
const IncomesController = require("../controller/income.controller");
const HomeController = require("../controller/index.controller");
const router = Router();
const homeController = new HomeController();
const dashboardController = new DashboardController();
const incomesController = new IncomesController();

// home page
router.get("/", homeController.showHomePage);

//dashboard page
router.get("/dashboard", dashboardController.showPage);
router.get("/incomesList",incomesController.showIncomesList)
router.get("/incomesList/create", incomesController.showIncomesForm);
router.post("/incomeList/create",incomesController.createIncomeForm);

module.exports = router;
