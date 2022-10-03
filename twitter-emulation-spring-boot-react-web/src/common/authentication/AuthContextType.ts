export interface AuthContextType {
    username: any;
    signin: (username: string, password: string, successCallback: VoidFunction, errorCallback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
}
