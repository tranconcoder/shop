import { Router } from "express";
import authController from "../app/controller/authController.js";

const router = Router();

router.get("/", authController.authPage);
router.post("/register", authController.register);

export default router;
