const Router = require("router");
const DashboardController = require("../controller/dashboard.controller");
const HomeController = require("../controller/home.controller");
const UserController = require("../controller/user.controller")
const Notfound_404 = require("../controller/404-notfound.controller");
const UserModule = require("../model/user.model");
const router = Router();
const homeController = new HomeController();
const dashboardController = new DashboardController();
const userController = new UserController();
const notfound_404 = new Notfound_404();
const userModule = new UserModule();

// home page
router.get("/", homeController.showHomePage);

//dashboard page
router.get("/dashboard", dashboardController.showPage);

// 404 not found
router.get("/notfound", notfound_404.showError404Page);

// show userList
router.get("/user", userController.showUserListPage);

// router.get("/user/:id",userController.showDeletePage);

router.get("/user/delete/:id", userController.deleteUserById);

router.get("/user/edit/:id", userController.showUserEdit);

router.post("/user/edit/:id", userController.editUser);

router.get("/user/search", userController.searchUser);

router.get("/user/table",userController.showTable);

module.exports = router;