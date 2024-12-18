export type User = {
    email: string,
    name: string;
    addressLine1: string;
    city: string
    country: string;
}

export type MenuItem = {
    name: string;
    price: number
}

export type Restaurant = {
    user: string;
    restaurantName: string;
    city: string;
    country: string;
    deliveryPrice: number
    estimatedDeliveryTime: number
    cuisines: string[]
    menuItems: MenuItem[]
    imageUrl: string
    lastUpdated: string
}