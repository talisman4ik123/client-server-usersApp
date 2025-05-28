const Router = require("express").Router;
const router = new Router();
const contrroler = require("../controller/controller");
const authMiddleware = require("../middleware/auth-middleware");

router.post("/registration", contrroler.registration);
router.post("/login", contrroler.login);
router.get("/users", authMiddleware, contrroler.getAllUsers);
router.get("/logout", authMiddleware, contrroler.logout);
router.patch("/block", authMiddleware, contrroler.blockSelectedUsers);

module.exports = router;
