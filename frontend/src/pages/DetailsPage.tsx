import { useGetRestaurantByIdRequest } from '@/api/RestaurantApi';
import CheckOutButton from '@/components/CheckOutButton';
import MenutItem from '@/components/MenutItem';
import OrderSummary from '@/components/OrderSummary';
import RestaurantInfo from '@/components/RestaurantInfo';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardFooter } from '@/components/ui/card';
import { UserFormData } from '@/forms/user-profile-form/UserProfileForm';
import { MenuItem } from '@/tpes';
import { useState } from 'react';

import { useParams } from 'react-router-dom'

export type CartItem = {
    _id:string;
    name: string;
    price: number;
    quantity: number;
}


export default function DetailsPage() {
    const {restaurantId} = useParams();
    const {restaurant, isLoading} = useGetRestaurantByIdRequest(restaurantId);

    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const sessionCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);

        return sessionCartItems ? JSON.parse(sessionCartItems) : [];
    });

    const addToCart = (menuItem: MenuItem) => {
        setCartItems((prevCartItems) => {

            const existingItem = prevCartItems.find(item => item._id === menuItem._id);

            let updatedCartItem;

            if(existingItem) {
                updatedCartItem = prevCartItems.map(item => {
                    if(item._id === menuItem._id) {
                        item.quantity += 1;
                    }
                    return item;
                })
            }else{
                updatedCartItem = [
                    ...prevCartItems,
                    {
                        _id: menuItem._id,
                        name: menuItem.name,
                        price: menuItem.price,
                        quantity: 1
                    }
                ]
            }

            sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updatedCartItem));

            return updatedCartItem;

        })
    }

    const deleteCartItem = (menuItem: MenuItem) => {

        setCartItems((prevCartItems) => {

            const updatedCartItem = prevCartItems.filter(item => item._id !== menuItem._id)

            sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updatedCartItem));

            return updatedCartItem;
        }) 
    }

    const onCheckout = (userFormData: UserFormData) => {
        console.log("userFormData", userFormData);
    }


    if(isLoading || !restaurant) {
        return "Loading...";
    }

    return (
        <div className='flex flex-col gap-10'>
            <AspectRatio ratio={16/5}>
                <img className='rounded-md object-cover h-full w-full' src={restaurant.imageUrl}/>
            </AspectRatio>
            <div className='grid md:grid-cols-[4fr_2fr] gap-4 md:px-32'>
                <div className='flex flex-col gap-4'>
                    <RestaurantInfo restaurant={restaurant}/>
                    <span className='text-2xl font-bold tracking-tight'>Menu</span>
                    {restaurant.menuItems.map((item) => (
                        <MenutItem menuItem={item} key={item._id} addToCart={addToCart}/>
                    ))}
                </div>
                <div>
                    <Card>
                        <OrderSummary restaurant={restaurant} cartItems={cartItems} deleteCartItem={deleteCartItem}/>
                        <CardFooter>
                            <CheckOutButton onCheckout={onCheckout} disabled={cartItems.length === 0}/>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}
