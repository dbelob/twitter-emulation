import React, { useState } from 'react';
import { useInjection } from 'inversify-react';
import { AuthContextType } from './AuthContextType';
import { AuthenticationDataSource } from '../datasources/AuthenticationDataSource';

const AuthContext = React.createContext<AuthContextType>(null!);

function useAuth() {
    return React.useContext(AuthContext);
}

function AuthProvider({children}: { children: React.ReactNode }) {
    const [username, setUsername] = useState<any>(null);
    const authenticationDataSource = useInjection(AuthenticationDataSource);

    const login = (newUsername: string, password: string, successCallback: VoidFunction, errorCallback: VoidFunction) => {
        return authenticationDataSource.authenticate({username: newUsername, password}, () => {
            setUsername(newUsername);
            successCallback();
        }, () => {
            errorCallback();
        }).subscribe();
    };

    const logout = (callback: VoidFunction) => {
        return authenticationDataSource.logout(() => {
            setUsername(null);
            callback();
        });
    };

    const value = {username, login, logout};

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
export { useAuth };
