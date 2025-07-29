import cookieParser from "cookie-parser";
import cors from "cors"; // if using ES Modules
import dotenv from "dotenv";
import express from "express";
import path from "path";
import connectDB from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import cartRoutes from "./routes/cart.route.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();
const port = process.env.PORT || 8000;
const __dirname = path.resolve();

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", // ✅ allow frontend origin
    credentials: true, // ✅ allow cookies
  })
);

//authentication
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  // app.get("*",(req,res)=>{
  //   res.sendFile(path.resolve(__dirname, "frontend" , "dist" , "index.html"))
  // })

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(port, () => {
  console.log("server is running ");
  connectDB();
});
