import React, { useEffect, useState } from 'react';
import { useInjection } from 'inversify-react';
import { AuthContextType } from './AuthContextType';
import { AuthenticationService } from '../services/AuthenticationService';

const AuthContext = React.createContext<AuthContextType>(null!);

function useAuth() {
    return React.useContext(AuthContext);
}

function AuthProvider({children}: { children: React.ReactNode }) {
    const [username, setUsername] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const authenticationService = useInjection(AuthenticationService);

    useEffect(() => {
        const restoreUsername = async () => {
            setLoading(true);

            await authenticationService.getUser(response => {
                setUsername(response.data?.name);
            });

            setLoading(false);
        };

        restoreUsername();
    }, []);

    const login = (newUsername: string, password: string, successCallback: VoidFunction, errorCallback: VoidFunction) => {
        return authenticationService.authenticate({username: newUsername, password}, () => {
            setUsername(newUsername);
            successCallback();
        }, () => {
            errorCallback();
        });
    };

    const logout = (callback: VoidFunction) => {
        return authenticationService.logout(() => {
            setUsername(null);
            callback();
        });
    };

    const value = {username, loading, login, logout};

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
export { useAuth };
