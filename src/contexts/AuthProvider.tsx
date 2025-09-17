import {createContext, type Dispatch, type SetStateAction, useEffect, useState} from "react";
import type {UserType} from "../@types/UserType.ts";
import {isTokenValid} from "../api/Auth.api.ts";

type AuthContextType = {
    user: UserType | null;
    isAuthenticated: boolean;
    setUser : Dispatch<SetStateAction<null>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: {children: React.ReactNode}) => {
    const [user, setUser] = useState<UserType | null>(null);
    const isAuthenticated = !!user;

    const fetchCurrentUser = async () => {
        try {
            const response = await isTokenValid();
            setUser(response);
        } catch (e) {
            setUser(null);
            localStorage.removeItem("MBtoken");
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