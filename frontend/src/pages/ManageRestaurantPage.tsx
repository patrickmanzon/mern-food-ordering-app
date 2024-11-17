import { useCreateMyRestaurantRequest, useGetMyRestaurantRequest } from '@/api/MyRestaurantApi'
import ManageRestaurantForm from '@/forms/manage-restaurant-form/ManageRestaurantForm'
import React from 'react'

export default function ManageRestaurantPage() {

  const { createMyRestaurant, isLoading } = useCreateMyRestaurantRequest();
  const { restaurant } = useGetMyRestaurantRequest()

 
  return (
    <ManageRestaurantForm onSave={createMyRestaurant} isLoading={isLoading} restaurant={restaurant}/>
  )
}
