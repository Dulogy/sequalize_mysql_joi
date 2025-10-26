import express from "express";
import adminController from "../controller/admin.controller.js";
const router = express.Router();

router.post("/create-question",adminController.createQuestion );       
router.post("/question-list", adminController.questionList);     

export default router;