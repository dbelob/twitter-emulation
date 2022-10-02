import React, { useState } from 'react';
import { useInjection } from 'inversify-react';
import { AuthContextType } from './AuthContextType';
import { fakeAuthProvider } from './FakeAuthProvider';
import { AuthenticationDataSource } from '../datasources/AuthenticationDataSource';

let AuthContext = React.createContext<AuthContextType>(null!);

function useAuth() {
    return React.useContext(AuthContext);
}

function AuthProvider({children}: { children: React.ReactNode }) {
    const [username, setUsername] = useState<any>(null);
    const authenticationDataSource = useInjection(AuthenticationDataSource);

    let signin = (newUsername: string, password: string, callback: VoidFunction) => {
        return authenticationDataSource.authenticate({username: newUsername, password},() => {
            setUsername(newUsername);
            callback();
        }).subscribe();
    };

    let signout = (callback: VoidFunction) => {
        return fakeAuthProvider.signout(() => {
            setUsername(null);
            callback();
        });
    };

    let value = {username, signin, signout};

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
export { useAuth };
