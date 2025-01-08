export type User = {
    email: string,
    name: string;
    addressLine1: string;
    city: string
    country: string;
}

export type MenuItem = {
    _id: string;
    name: string;
    price: number
}

export type Restaurant = {
    _id: number;
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

export type ApiResponse<Data> = {
    data: Data[],
    pagination: {
        page: number
        pages: number
        total: number
    }
}