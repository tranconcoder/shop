const { Router } = require("express");
const commonController = require("../app/controller/commonController.js");
const passport = require("../app/middleware/passport.js");
const router = Router();

router.use(passport);
router.get("/", commonController.homePage);

module.exports = router;
