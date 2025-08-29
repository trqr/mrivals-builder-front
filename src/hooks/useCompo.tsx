import {useContext} from "react";
import {CompoContext} from "../contexts/CompoProvider.tsx";

export const useCompo = () => useContext(CompoContext);