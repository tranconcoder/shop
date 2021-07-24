import { Router } from "express";
import authController from "../app/controller/authController.js";
const router = Router();

router.get("/", authController.authPage);

export default router;
