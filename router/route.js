const Router = require("router");
const CostController = require("../controller/cost/cost.controller");
const CostCateController = require("../controller/costCategorie/costCategorie.controller");
const DashboardController = require("../controller/dashboard.controller");
const IncomesController = require("../controller/income/income.controller");
const HomeController = require("../controller/index.controller");
const UserController = require("../controller/user/user.controller");
const incomesController = new IncomesController();
const router = Router();
const homeController = new HomeController();
const dashboardController = new DashboardController();
const userController = new UserController();
const costController = new CostController();
const costCategorieController = new CostCateController();
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
// cost categorie
router.get(
  "/costCategorie",
  userController.readSession,
  costCategorieController.showListPage
);
router.get(
  "/costCategorie/create",
  userController.readSession,
  costCategorieController.showCreatePage
);
router.post(
  "/costCategorie/create",
  userController.readSession,
  costCategorieController.createCosts
);
router.get(
  "/costCategorie/update/:id",
  userController.readSession,
  costCategorieController.showUpdatePage
);

router.post(
  "/costCategorie/update/:id",
  userController.readSession,
  costCategorieController.update
);

router.get(
  "/costCategorie/delete/:id",
  userController.readSession,
  costCategorieController.delete
);

router.get("/incomesList", incomesController.showIncomesList);
router.get("/incomesList/create", incomesController.showIncomesForm);
router.post("/incomesList/create", incomesController.createIncomeForm);
router.get("/incomesList/edit/:id", incomesController.showEditIncomeForm);
router.post("/incomesList/edit/:id", incomesController.editIncome);
router.get("/incomesList/delete/:id", incomesController.delete);
module.exports = router;
