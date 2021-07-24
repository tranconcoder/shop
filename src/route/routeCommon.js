import { Router } from "express";
import commonController from "../app/controller/commonController.js";
const router = Router();

router.get("/", commonController.homePage);

export default router;
