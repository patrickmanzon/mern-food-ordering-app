import { Restaurant } from "@/tpes";
import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyRestaurantRequest = () => {
    
    const {getAccessTokenSilently} = useAuth0();

    const getMyRestaurantRequest = async (): Promise<Restaurant> => {

        const token = await getAccessTokenSilently();

        const response = await fetch(API_BASE_URL+"/my/restaurant", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer "+ token
            }
        });

        if(!response.ok) {
            throw new Error("Unable to fetch data!");
        }

        return response.json();

    }

    const { data:restaurant, isLoading, error } = useQuery("getMyRestaurant", getMyRestaurantRequest);

    return {
        restaurant,
        isLoading,
        error
    }

}

export const useCreateMyRestaurantRequest = () => {

    const { getAccessTokenSilently } = useAuth0();

    const createMyRestaurantRequest = async  (formData: FormData):Promise<Restaurant> =>  {

        const token = await getAccessTokenSilently();

        const response = await fetch(API_BASE_URL+"/my/restaurant", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
            },
            body: formData
        });

        if(!response.ok) {
            throw new Error("Invalid data");
        }

        return response.json()

    }

    const { mutate: createMyRestaurant, isLoading, isSuccess, error } = useMutation(createMyRestaurantRequest);

    if(isSuccess) {
        toast.success("Restaurant created!");
    }

    if(error) {
        toast.error(error.toString());
    }

    return {
        createMyRestaurant,
        isLoading
    }

}

export const useUpdateMyRestaurantRequest = () => {

    const {getAccessTokenSilently} = useAuth0();

    const updateMyRestaurantRequest = async (formData: FormData):Promise<Restaurant> => {
        
        const token = await getAccessTokenSilently();

        const response = await fetch(API_BASE_URL+`/my/restaurant`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        });

        if(!response.ok) {
            throw new Error("Unable to update restaurant");
        }

        return response.json();

    }

    const { mutate: updateMyRestaurant, isLoading, error, isSuccess } = useMutation(updateMyRestaurantRequest);

    if(error) {
        toast.error(error.toString());
    }

    if(isSuccess) {
        toast.success("Restaurant updated successfully!");
    }

    return {
        updateMyRestaurant,
        isLoading
    }
}