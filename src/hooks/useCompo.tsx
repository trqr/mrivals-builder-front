import {useContext} from "react";
import {CompoContext} from "../contexts/CompoProvider.tsx";

export const useCompo = () => {
    const context = useContext(CompoContext);
    if (!context) {
        throw new Error("useData must be used within a DataProvider");
    }
    return context;
};