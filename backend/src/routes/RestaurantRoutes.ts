
import express from "express";
import { param } from "express-validator";
import RestaurantController from "../controllers/RestaurantController";

const router = express.Router();

router.get("/search/:city", 
    param("city").isString().trim().notEmpty(),
    RestaurantController.searchRestaurant
);

router.get("/:restaurantId", 
    param("restaurantId").isString().trim().notEmpty(), 
    RestaurantController.getRestaurantById)

export default router;