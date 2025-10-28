import express from "express";
import adminController from "../controller/admin.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/create-question",authMiddleware.auth,adminController.createQuestion );       
router.post("/question-list", authMiddleware.auth,adminController.questionList);     

export default router;