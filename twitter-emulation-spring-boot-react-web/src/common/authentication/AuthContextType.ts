export interface AuthContextType {
    username: any;
    signin: (username: string, password: string, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
}
