import { Request, response, Response } from "express";
import Restaurant from "../models/Restaurant";
import cloudinary from "cloudinary"
import mongoose from "mongoose";


const getMyRestaurantDetails = async (req: Request, res: Response) => {
    try {
        const {userId} = req;

        const restaurant = await Restaurant.findOne({user: userId});

        if(!restaurant) {
            return res.status(409).json({
                message: "restaurant not found!"
            });
        }

        return res.status(200).json(restaurant);

    } catch (error) {
        console.log(error);
        return res.status(500)
                .json({message: "Something went wrong!"});
    }
} 

const createMyRestaurant = async (req: Request, res: Response) => {

    try {
        const {userId} = req;

        const existingRestaurant = await Restaurant.findOne({user: userId});

        if(existingRestaurant) {
            return res.status(409)
                .json({message: "User restaurant already exists"});
        }

        const image = req.file as Express.Multer.File;
        const base64Image = Buffer.from(image.buffer).toString("base64");
        const dataURI = `data:${image.mimetype};base64,${base64Image}`

        const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

        const restaurant = new Restaurant(req.body);
        restaurant.imageUrl = uploadResponse.url;
        restaurant.user = new mongoose.Types.ObjectId(req.userId);
        restaurant.lastUpdated = new Date();
        await restaurant.save();

        return res.status(201).send(restaurant);
    } catch (error) {
        console.log(error);
        return res.status(500)
                .json({message: "Something went wrong!"});
    }
    
}

export default {
    getMyRestaurantDetails,
    createMyRestaurant
}