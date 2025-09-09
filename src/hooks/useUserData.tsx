import {useContext} from "react";
import {UserDataInitContext} from "../contexts/UserDataInitProvider.tsx";

export const useUserData = () =>  useContext(UserDataInitContext);