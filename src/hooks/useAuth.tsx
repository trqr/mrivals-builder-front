import {useContext} from "react";
import {AuthContext} from "../contexts/AuthProvider.tsx";

export const useAuth = () => useContext(AuthContext);