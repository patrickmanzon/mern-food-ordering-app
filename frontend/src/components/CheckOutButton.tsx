import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import { useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import LoadingButton from './LoadingButton';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog';
import UserProfileForm, { UserFormData } from '@/forms/user-profile-form/UserProfileForm';
import { useGetCurrentUser } from '@/api/UserApi';

type Props = {
    onCheckout: (userFormData: UserFormData) => void;
    disabled: boolean
}

export default function CheckOutButton({onCheckout, disabled}: Props) {


    const { isAuthenticated, isLoading: isAuthLoading, loginWithRedirect } = useAuth0();

    const { pathname } = useLocation();

    const {currentUser, isLoading: getCurrentUserLoading} = useGetCurrentUser();

    const onLogin = async() => {
        await loginWithRedirect({
            appState: {
                returnTo: pathname,
            }
        });
    }

    if(isAuthLoading || !currentUser) {
        return <LoadingButton />
    }

    if(!isAuthenticated) {
        return <Button onClick={onLogin} className='bg-orange-500 flex-1'>Login to check out</Button>
    }


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button disabled={disabled} className='bg-orange-500 flex-1'>Checkout</Button>
            </DialogTrigger>
            <DialogContent className='max-w-[425px] md:min-w-[700px] bg-gray-50'>
                <DialogTitle></DialogTitle>
                <UserProfileForm currentUserData={currentUser} onSave={onCheckout} isLoading={getCurrentUserLoading} title='Confirm delivery details' buttonText='Continue to checkout'/>
            </DialogContent>
        </Dialog>
    )
}
