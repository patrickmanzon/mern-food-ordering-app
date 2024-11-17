import { useGetCurrentUser, useUpdateUser } from '@/api/UserApi'
import UserProfileForm from '@/forms/user-profile-form/UserProfileForm'
import React from 'react'

export default function UserProfilePage() {

  const  {currentUser, isLoading: currnentUserLoading} = useGetCurrentUser()
  const {updateUser, isLoading} = useUpdateUser()

  if(!currentUser) {
    return <span>Error loading User data</span>
  }

  if(currnentUserLoading) {
    return <span>Loading...</span>
  }

  return (
    <UserProfileForm onSave={updateUser} isLoading={isLoading} currentUserData={currentUser}/>
  )
}
