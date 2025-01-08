import { SearchState } from "@/pages/SearchPage";
import { ApiResponse, Restaurant } from "@/tpes";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const useGetRestaurantByIdRequest = (restaurantId?: string) => {

    const getRestaurantByIdRequest = async (): Promise<Restaurant> => {
        const response = await fetch(API_BASE_URL+"/restaurant/"+restaurantId);

        if(!response.ok) {
            throw new Error("Restaurant not found");
        }

        return response.json();
    }

    const {data: restaurant, isLoading, isError} = useQuery("getRestaurantById", getRestaurantByIdRequest, {enabled: !!restaurantId});

    return {
        restaurant,
        isLoading,
        isError
    }

} 


export const useSearchRestaurantRequest = (searchState:SearchState, city?:string) => {

    const searchRestaurantRequest = async (): Promise<ApiResponse<Restaurant>> => {

        const urlParams = new URLSearchParams();
        urlParams.set("search", searchState.searchQuery);
        urlParams.set("page", searchState.page.toString());
        urlParams.set("cuisines", searchState.cuisines.join(","));
        urlParams.set("sortOption", searchState.sortOption);

        const response = await fetch(API_BASE_URL+ "/restaurant/search/"+city+"?"+urlParams.toString());

        if(!response.ok) {
            throw new Error("Unable to get restaurants");
        }

        return response.json();
    }

    const {data:result, isLoading} = useQuery(['searchRestaurant', searchState], searchRestaurantRequest, {
        enabled: !!city
    });

    return {
        result,
        isLoading
    }

}
