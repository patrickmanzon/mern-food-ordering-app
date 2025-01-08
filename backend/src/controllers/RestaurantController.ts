import { Request, Response } from "express";
import Restaurant from "../models/Restaurant";


const getRestaurantById = async (req: Request, res: Response) => {

    const {restaurantId} = req.params;

    const restaurant = await Restaurant.findById(restaurantId);

    if(!restaurant) {
        return res.status(404).json({message: "Restaurant not found!"});
    }

    return res.json(restaurant);
    
}

const searchRestaurant = async (req: Request, res: Response) => {

    const city = req.params.city as string;

    const search = req.query.search as string || "";
    const searchCuisines = req.query.cuisines as string || "";
    const sortOption = req.query.sortOption as string || "lastUpdated";
    const page = parseInt(req.query.page as string) || 1;

    const query:any = {};

    query["city"] = new RegExp(city, "i");
    
    const cityCount = await Restaurant.countDocuments(query);

    if(cityCount === 0) {
        return res.status(200).json({
            data: [],
            pagination: {
                page:1,
                pages:0,
                total:0
            }
        });
    }

    if(searchCuisines) {
        const cuisinesArray = searchCuisines.split(",")
            .map(cuisine => new RegExp(cuisine, "i"));

        query["cuisines"] = {
            $all: cuisinesArray
        }

    }

    if(search) {
        const regexSearch = new RegExp(search, "i");
        query["$or"] = [
            {restaurantName: regexSearch},
            { cuisines: {$in: [regexSearch]}}
        ]
    }

    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const restaurants = await Restaurant.find(query).sort({[sortOption]: 1}).skip(skip).limit(pageSize).lean();

    const restaurantTotal = await Restaurant.countDocuments(query);

    return res.status(200).json({
        data: restaurants,
        pagination: {
            page,
            pages:Math.ceil(restaurantTotal / pageSize),
            total:restaurantTotal
        }
    });


}


export default { 
    searchRestaurant,
    getRestaurantById
}