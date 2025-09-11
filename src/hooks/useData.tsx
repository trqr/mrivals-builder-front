import {useContext} from "react";
import {DataContext} from "../contexts/DataProvider.tsx";

export const useData = () => useContext(DataContext);