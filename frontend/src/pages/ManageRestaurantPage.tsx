import { useCreateMyRestaurantRequest, useGetMyRestaurantRequest, useUpdateMyRestaurantRequest } from '@/api/MyRestaurantApi'
import ManageRestaurantForm from '@/forms/manage-restaurant-form/ManageRestaurantForm'
import React from 'react'

export default function ManageRestaurantPage() {

  const { createMyRestaurant, isLoading: createLoading } = useCreateMyRestaurantRequest();
  const {updateMyRestaurant, isLoading: updateLoading} = useUpdateMyRestaurantRequest();
  const { restaurant } = useGetMyRestaurantRequest()

  const isUpdating = !!restaurant;

  return (
    <ManageRestaurantForm onSave={isUpdating ? updateMyRestaurant : createMyRestaurant} isLoading={createLoading || updateLoading} restaurant={restaurant}/>
  )
}
