const { Router } = require("express");
const authController = require("../app/controller/authController.js");

const router = Router();

router.get("/", authController.authPage);
router.post("/register", authController.register);

module.exports = router;
