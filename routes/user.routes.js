import express from "express";
import userController  from "../controller/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import multerUpload from "../middleware/multer.upload.js";

const router = express.Router();
router.post("/signup",userController.signup);       
router.post("/login",userController.login);  
router.post("/create-post",authMiddleware.auth,multerUpload.uploadMiddleware,userController.createPost);
router.post("/create-bulk-post",authMiddleware.auth,multerUpload.uploadMultipleImage,userController.multiplePostCreation);
router.post("/create-comment",authMiddleware.auth,userController.createComment);
router.post("/post-like",authMiddleware.auth,userController.likePost);
router.post("/post-list",authMiddleware.auth,userController.getPostList);

export default router;