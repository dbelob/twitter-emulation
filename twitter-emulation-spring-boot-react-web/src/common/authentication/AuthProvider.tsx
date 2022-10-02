import React from 'react';
import { AuthContextType } from './AuthContextType';
import { fakeAuthProvider } from './FakeAuthProvider';

let AuthContext = React.createContext<AuthContextType>(null!);

function useAuth() {
    return React.useContext(AuthContext);
}

function AuthProvider({children}: { children: React.ReactNode }) {
    let [username, setUsername] = React.useState<any>(null);

    let signin = (newUsername: string, password: string, callback: VoidFunction) => {
        return fakeAuthProvider.signin(() => {
            setUsername(newUsername);
            callback();
        });
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
