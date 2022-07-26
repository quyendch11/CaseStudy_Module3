const Router = require("router");
const DashboardController = require("../controller/dashboard.controller");
const HomeController = require("../controller/index.controller");
const router = Router();
const homeController = new HomeController();
const dashboardController = new DashboardController();
const CostCateController = require("../controller/costcategories_controller");
let costCateController = new CostCateController();
const costcontroller = require("../controller/costs_controller");
let costController = new costcontroller();
// home page
router.get("/", homeController.showHomePage);

//dashboard page
router.get("/dashboard", dashboardController.showPage);

router.get ('/costcategories',costCateController.showCostCategoriesListPage);
router.get ('/costcategories/create',costCateController.showCostFormCreate);
router.post ('/costcategories/create',costCateController.createCostCategories);
router.get('/costcategories/detail/:id',costController.showCostListPage);
router.get('/costcategories/setcategories/:id',costController.showCostFormCreate);
router.post('/costcategories/setcategories/:id',costController.createCosts);
router.get('/costcategories/edit/:id',costController.showCostEditForm);
router.post('/costcategories/edit/:id',costController.editCost);
router.get ('/costcategories/:id/delete',costCateController.deleteCostCategories);
router.get('/cost/detail/:id',costController.deleteCost);

module.exports = router;
