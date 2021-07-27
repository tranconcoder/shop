import { Router } from "express";
import commonController from "../app/controller/commonController.js";
import passport from "../app/middleware/passport.js";
const router = Router();

router.use(passport);
router.get("/", commonController.homePage);

export default router;
