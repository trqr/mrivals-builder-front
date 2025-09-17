import {useContext} from "react";
import {LoadingContext} from "../contexts/LoadingProvider.tsx";

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error("useData must be used within a DataProvider");
    }
    return context;
};