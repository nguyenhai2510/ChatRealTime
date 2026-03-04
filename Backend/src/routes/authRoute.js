import express from "express";
import { SignIn, SignOut, signUp } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signUp);

router.post("/signin", SignIn)

router.post("/signout", SignOut)

export default router;
