import { Request, Response } from "express";
import Stripe from "stripe";
import Restaurant, { MenuItemType } from "../models/Restaurant";

const STRIPE = new Stripe(process.env.STRIPE_API_SECRET as string);
const FRONTEND_URL = process.env.FRONTEND_URL as string;

type CheckoutSessionRequest = {
    cartItems: {
        menuItemId: string;
        name: string;
        quantity: string;
    }[];
    deliveryDetails: {
        email:string;
        name:string;
        addressLine1:string;
        city:string;
    };
    restaurantId: string;
}


const createCheckoutSession = async(req: Request, res: Response) => {
    try {
        const checkoutSessionRequest: CheckoutSessionRequest = req.body;

        const restaurant = await Restaurant.findById(checkoutSessionRequest.restaurantId);

        if(!restaurant) {
            throw new Error("Restauran not found!");
        }

        const lineItems = createLineItems(checkoutSessionRequest, restaurant.menuItems);

    } catch (error: any) {
        console.log(error);
        res.status(500).json({message: error.raw.message});
    }
}

const createLineItems = (checkoutSessionRequest: CheckoutSessionRequest, menuItems: MenuItemType[]) => {
    const lineItems = checkoutSessionRequest.cartItems.map(cartItem => {

        const menuItem = menuItems.find(item => item._id.toString() === cartItem.menuItemId.toString());

        if(!menuItem) {
            throw new Error("Menu not found!");
        }

        const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = {
             price_data: {
                product: cartItem.name,
                currency: "usd",
                unit_amount: menuItem.price
             },
             quantity: Number(cartItem.quantity)
        }
        return lineItem;
    });

    return lineItems;
}

export default {
    createCheckoutSession
}