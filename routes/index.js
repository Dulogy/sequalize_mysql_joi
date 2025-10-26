import express from "express";
import adminRoutes from "./admin.routes.js";
import userRoutes from "./user.routes.js";

const router = express.Router();

router.use("/admin", adminRoutes);
router.use("/user", userRoutes);   

export default router;
