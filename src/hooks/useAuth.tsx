import {useContext} from "react";
import {AuthContext} from "../contexts/AuthProvider.tsx";

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useData must be used within a DataProvider");
    }
    return context;
};