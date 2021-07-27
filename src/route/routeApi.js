import { Router } from "express";
import apiController from "../app/controller/apiController.js";
const router = Router();

router.options(
	"/register/username/check",
	apiController.register.username.check
);

export default router;
