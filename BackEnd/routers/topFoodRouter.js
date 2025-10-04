import express from "express";
import { getTopOrderedFoods } from "../Controllers/topFoodController.js";

const topFoodRouter = express.Router();

topFoodRouter.get("/top", getTopOrderedFoods);

export default topFoodRouter;
