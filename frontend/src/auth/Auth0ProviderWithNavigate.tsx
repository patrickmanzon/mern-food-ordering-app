import { useCreateUser } from '@/api/UserApi';
import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';

type Props = {
    children: React.ReactNode
}


function Auth0ProviderWithNavigate({children}: Props) {

    const domain = import.meta.env.VITE_AUTH0_DOMAIN;
    const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_AUTH0_CALLBNACK_URL;
    const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

    const navigate = useNavigate();

    if(!domain || !clientId || !redirectUri || !audience) {
        throw new Error("unable to initialize auth");
    }

    const onRedirectCallback = () => {
        console.log("navigate here!");
        navigate("/auth-callback");
    }

    return (
        <Auth0Provider 
            domain={domain} 
            clientId={clientId} 
            authorizationParams=
            {
                {
                    redirect_uri: redirectUri,
                    audience
                }
            }
        onRedirectCallback={onRedirectCallback}
        >
            { children }
        </Auth0Provider>
    )
}

Auth0ProviderWithNavigate.propTypes = {}

export default Auth0ProviderWithNavigate
