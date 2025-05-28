const Router = require("express").Router;
const router = new Router();
const controller = require("../controller/controller");
const authMiddleware = require("../middleware/auth-middleware");

router.post("/registration", controller.registration);
router.post("/login", controller.login);
router.get("/users", authMiddleware, controller.getAllUsers);
router.get("/logout", authMiddleware, controller.logout);
router.patch("/block", authMiddleware, controller.blockSelectedUsers);

module.exports = router;
