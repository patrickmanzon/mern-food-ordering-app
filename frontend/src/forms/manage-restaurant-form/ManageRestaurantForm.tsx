import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/tpes";
import { useEffect } from "react";

const formSchema = z.object({
    restaurantName: z.string({
        required_error: "restaurant name is required"
    }),
    city: z.string({
        required_error: "city name is required"
    }),
    country: z.string({
        required_error: "country name is required"
    }),
    deliveryPrice: z.coerce.number({
        required_error: "delivery price is required",
        invalid_type_error: "must be a valid number"
    }),
    estimatedDeliveryTime: z.coerce.number({
        required_error: "estimated delivery time is required",
        invalid_type_error: "must be a valid number"
    }),
    cuisines: z.array(z.string()).nonempty({
        message: "please selecat at least one item"
    }),
    menuItems: z.array(z.object({
        name: z.string().min(1, "name is required"),
        price: z.coerce.number().min(1, "price is required")
    })),
    imageFile: z.instanceof(File, {message: "image is required"}).optional(),
    imageUrl: z.string().optional(),
}).refine((data) => !!data.imageUrl || !!data.imageFile, {
    message: "image is required",
    path: ["imageFile"]
});

type RestaurantFormData = z.infer<typeof formSchema>


type Props = {
    onSave: (restaurantFormData: FormData) => void;
    isLoading: boolean;
    restaurant: Restaurant | undefined
}



function ManageRestaurantForm({onSave, isLoading, restaurant}: Props) {
    const form = useForm<RestaurantFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cuisines: [],
            menuItems: [{name: "", price: 0}]
        }
    });

    useEffect(() => {

        if(!restaurant) {
            return;
        }

        console.log(restaurant);

        const computedDeliveryPrice = parseInt((restaurant.deliveryPrice / 100).toFixed(2));
        const computedMenuItems = restaurant.menuItems.map(menu => {
            menu.price = parseInt((menu.price / 100).toFixed(2));
            return menu
        });

        
        form.reset({...restaurant, deliveryPrice: computedDeliveryPrice, menuItems: computedMenuItems});

    }, [form, restaurant])

    const onSubmit = (formDataJson: RestaurantFormData) => {
        // TODO - convert formDataJson to a new FormData object
        console.log("formDataJson", formDataJson);

        const formData = new FormData();

        formData.append("restaurantName", formDataJson.restaurantName);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);
        formData.append("deliveryPrice", (formDataJson.deliveryPrice * 100).toFixed(2));
        formData.append("estimatedDeliveryTime", formDataJson.estimatedDeliveryTime);
        // formData.append("estimateDelivieryTime", formDataJson.estimatedDeliveryTime);
        formDataJson.cuisines.forEach((cuisine, index) => {
            formData.append(`cuisines[${index}]`, cuisine);
        })

        formDataJson.menuItems.forEach((menu, index) => {
            formData.append(`menuItems[${index}][name]`, menu.name);
            formData.append(`menuItems[${index}][price]`, (menu.price * 100).toFixed(2));
        });

        if(formDataJson.imageFile) {
            formData.append("imageFile", formDataJson.imageFile);
        }

        onSave(formData);
    }

    return (
        <Form {...form}>
            <form 
                onSubmit={form.handleSubmit(onSubmit)} 
                className="space-y-8 bg-gray-50 p-10 rounded-lg">
                <DetailsSection />
                <Separator />
                <CuisinesSection />
                <Separator />
                <MenuSection />
                <Separator />
                <ImageSection />

                {isLoading ? (<LoadingButton />) : <Button type="submit">Submit</Button>}
            </form> 
        </Form>
    )
}

export default ManageRestaurantForm
