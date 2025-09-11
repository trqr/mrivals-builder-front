import {useContext} from "react";
import {DataInitContext} from "../contexts/DataInitProvider.tsx";

export const useData = () => {
    const context = useContext(DataInitContext);
    if (!context) {
        throw new Error("useData must be used within a DataProvider");
    }
    return context;
};