import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getCoupan, validateCoupan } from "../controllers/coupan.controller.js";

const router = express.Router();


router.get("/",protectRoute,getCoupan);
router.post("/validate",protectRoute,validateCoupan);



export default router;
