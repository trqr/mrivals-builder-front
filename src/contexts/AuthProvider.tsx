import {createContext, type Dispatch, type SetStateAction, useEffect, useState} from "react";
import type {UserType} from "../@types/UserType.ts";
import {isTokenValid} from "../api/Auth.service.ts";
import {useUserData} from "../hooks/useUserData.tsx";

type AuthContextType = {
    user: UserType | null;
    isAuthenticated: boolean;
    setUser : Dispatch<SetStateAction<null>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: {children: React.ReactNode}) => {
    const [user, setUser] = useState(null);
    const isAuthenticated = !!user;
    // @ts-expect-error bien dans le context
    const {saveUserGameStats} = useUserData();

    const fetchCurrentUser = async () => {
        try {
            const response = await isTokenValid();
            setUser(response);
            saveUserGameStats(response.mrivalsAccount);
        } catch (e) {
            setUser(null);
        }
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    return (
        <AuthContext.Provider value={{user, isAuthenticated, setUser}}>
            {children}
        </AuthContext.Provider>
    );
}