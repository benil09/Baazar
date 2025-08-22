import express from "express";
import { protectRoute , adminRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/",protectRoute,adminRoute,async (req, res) => {
    try {
        const analyticsData =  await getAnalyticsData()
    
    } catch (error) {
        
    }


})

export default router;