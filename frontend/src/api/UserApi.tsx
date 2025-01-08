import { User } from "@/tpes";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const useGetCurrentUser = () => {
    const {getAccessTokenSilently} = useAuth0();

    const getCurrentUser = async (): Promise<User> => {

        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/my/user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        });

        if(!response.ok) {
            throw new Error("Something went wrong!");
        }

        return response.json();

    }

    const {data: currentUser, isLoading, error} = useQuery("getCurrentUser", getCurrentUser);

    return {
        currentUser,
        isLoading,
        error
    }

}


type CreateUserRequest = {
    auth0Id: string;
    email: string;
}

export const useCreateUser = () => {

    const { getAccessTokenSilently } = useAuth0();

    
    const createUserRequest = async (user: CreateUserRequest) => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/my/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }, 
            body: JSON.stringify(user)
        })

        if(!response.ok) {
            throw new Error("Failed to create user");
        }
    }

    const { mutate: createUser, isLoading, isError, isSuccess } = useMutation(createUserRequest);

    return {
        createUser,
        isLoading,
        isError,
        isSuccess
    }
}

type UpdateUserRequest = {
    name: string;
    addressLine1: string;
    city: string
    country: string;
}

export const useUpdateUser = () => {
    const { getAccessTokenSilently } = useAuth0();

    const updateUserRequest = async (formData: UpdateUserRequest) => {

        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/my/user`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(formData)
        });

        if(!response.ok) {
            throw new Error("failed to update user");
        }

    }

    const { 
        mutate: updateUser, 
        isLoading, 
        isSuccess, 
        reset,
        error
    } = useMutation(updateUserRequest);


    if(isSuccess) {
        toast.success("Profile updated successfully.");
    }


    if(error) {
        toast.error(error.toString());
    }

    console.log("called!");

    return {
        updateUser,
        isLoading,
        isSuccess,
        error,
        reset,
    }

}