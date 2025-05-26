const Router = require("express").Router;
const router = new Router();
const contrroler = require("../controller/controller");

router.post("/registration", contrroler.registration);

module.exports = router;
