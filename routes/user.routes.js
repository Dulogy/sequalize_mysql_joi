import express from "express";
import userController  from "../controller/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();
router.post("/signup",userController.signup);       
router.post("/login",userController.login);  
router.post("/create-post",authMiddleware.auth,userController.createPost);
router.post("/create-comment",authMiddleware.auth,userController.createComment)
router.post("/like",authMiddleware.auth,userController.likePost);

export default router;