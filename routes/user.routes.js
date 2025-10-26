import express from "express";
import userController  from "../controller/user.controller.js";
const router = express.Router();

router.post("/login", userController.login);       
router.post("/submit", userController.submitAnswer);     

export default router;