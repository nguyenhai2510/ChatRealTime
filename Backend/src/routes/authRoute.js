import express from "express";
import { SignIn, signUp } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signUp);

router.post("/signin", SignIn)

export default router;
