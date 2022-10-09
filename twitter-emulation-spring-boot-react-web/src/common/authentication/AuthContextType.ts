export interface AuthContextType {
    username: any;
    login: (username: string, password: string, successCallback: VoidFunction, errorCallback: VoidFunction) => void;
    logout: (callback: VoidFunction) => void;
}
