import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../common/authentication/AuthProvider';
import Loading from './Loading';

export default function AnonymousMain() {
    const auth = useAuth();

    return (
        <>
            {
                auth.loading ?
                    <Loading/> :
                    <Navigate to={`/account/show/${auth.username}`} replace/>
            }
        </>
    );
}
