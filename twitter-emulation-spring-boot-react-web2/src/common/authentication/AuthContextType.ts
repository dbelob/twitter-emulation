export interface AuthContextType {
    username: any;
    loading: boolean;
    login: (username: string, password: string, successCallback: VoidFunction, errorCallback: VoidFunction) => void;
    logout: (callback: VoidFunction) => void;
}
