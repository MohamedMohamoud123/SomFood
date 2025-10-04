import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routers/foodRoute.js";
import userRouter from "./routers/userRouter.js";
import 'dotenv/config'
import cartRouter from "./routers/cardRoute.js";
import orderRouter from "./routers/orderRouter.js";
import topFoodRouter from "./routers/topFoodRouter.js";

const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads")); // ✅ to serve image files

// DB connection
connectDB();

// API endpoints
app.use("/api/food", foodRouter);
app.use("/images",express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/card",cartRouter) 
app.use("/api/order",orderRouter)
app.use("/api/topfoods", topFoodRouter); // ✅ route cusub


// Test Route
app.get("/", (req, res) => {
    res.send("API Working");
});

// Start Server
app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
});
