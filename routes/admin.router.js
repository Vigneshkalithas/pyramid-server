import express from "express";
import { Signin, Register, Logout } from "../Controllers/admin.controller.js";
import { authorize } from "../middleware/auth.js";

const router = express.Router();
router.post("/login", Signin); // authorize
router.post("/register", Register); // authorize,
router.post("/logout", Logout); // authorize,

export default router;
