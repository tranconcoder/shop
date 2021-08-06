const { Router } = require("express");
const apiController = require("../app/controller/apiController.js");
const router = Router();

router.options(
	"/register/username/check",
	apiController.register.username.check
);

module.exports = router;
