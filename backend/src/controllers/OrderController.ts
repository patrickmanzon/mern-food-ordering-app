import { Request, Response } from "express";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_API_SECRET as string);
const frontendUrl = process.env.FRONTEND_URL as string;




const createCheckoutSession = (req: Request, res: Response) => {
    try {
        
    } catch (error: any) {
        console.log(error);
        res.status(500).json({message: error.raw.message});
    }
}

export default {
    createCheckoutSession
}