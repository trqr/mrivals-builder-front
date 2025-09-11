import {useContext} from "react";
import {UserDataInitContext} from "../contexts/UserDataInitProvider.tsx";

export const useUserData = () => {
    const context = useContext(UserDataInitContext);
    if (!context) {
        throw new Error("useData must be used within a DataProvider");
    }
    return context;
};