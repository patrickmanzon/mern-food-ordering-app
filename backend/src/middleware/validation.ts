import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";


const handelValidationErrors = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    next();
}


export const validateUserRequest = [
    body("name").isString().notEmpty().withMessage("Name must be a string"),
    body("addressLine1").isString().notEmpty().withMessage("addressLine1 must be a string"),
    body("city").isString().notEmpty().withMessage("City must be a string"),
    body("country").isString().notEmpty().withMessage("Country must be a string"),
    handelValidationErrors,
]

export const validateMyRestaurantRequest = [
    body("restaurantName").notEmpty().withMessage("Restaurant name is required"),
    body("city").isString().notEmpty().withMessage("City must be a string"),
    body("country").isString().notEmpty().withMessage("Country must be a string"),
    body("deliveryPrice").isFloat({min:0}).withMessage("Delivery price must be a positive number"),
    body("estimatedDeliveryTime").isInt({min:0}).withMessage("Estimated delivery time must be a positive integer"),
    body("cuisines").isArray().withMessage("Cuisines must be an array").not().notEmpty().withMessage("Cuisines array cannot be empty"),
    body("menuItems").isArray().withMessage("Menu Items must be an array"),
    body("menuItems.*.name").notEmpty().withMessage("Menu Item name is required"),
    body("menuItems.*.price").isFloat({min:0}).withMessage("Menu Item price is required"),
    handelValidationErrors
];