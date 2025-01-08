import { Request, Response } from "express";
import Stripe from "stripe";

const STRIPE = new Stripe(process.env.STRIPE_API_SECRET as string);
const FRONTEND_URL = process.env.FRONTEND_URL as string;

type CheckoutSessionRequest = {
    
}


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