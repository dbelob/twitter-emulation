import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import Loading from '../../home/Loading';

function RequireAuth({children}: { children: JSX.Element }) {
    const auth = useAuth();
    const location = useLocation();

    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they log in, which is a nicer user experience
    // than dropping them off on the home page.
    return (
        <>
            {
                auth.loading ?
                    <Loading/> :
                    (!auth.username ?
                        <Navigate to="/login" state={{from: location}} replace/> :
                        children)
            }
        </>
    );
}

export default RequireAuth;
