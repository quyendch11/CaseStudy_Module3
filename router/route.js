const Router = require("router");
const CostController = require("../controller/cost/cost.controller");
const DashboardController = require("../controller/dashboard.controller");
const IncomesController = require("../controller/income.controller");
const HomeController = require("../controller/index.controller");
const UserController = require("../controller/user/user.controller");
const router = Router();
const homeController = new HomeController();
const dashboardController = new DashboardController();
const incomesController = new IncomesController();

const userController = new UserController();
const costController = new CostController();
// home page
router.get("/", userController.readSession, homeController.showHomePage);

//dashboard page
router.get("/incomesList",incomesController.showIncomesList)
router.get("/incomesList/create", incomesController.showIncomesForm);
router.post("/incomesList/create",incomesController.createIncomeForm);
router.get("/incomesList/edit/:id", incomesController.showEditIncomeForm);
router.post("/incomesList/edit/:id", incomesController.editIncome);
router.get("/incomesList/delete/:id",incomesController.delete);
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

router.get("/cost", costController.showListPage);
router.get("/cost/create", costController.showCreatePage);

module.exports = router;
