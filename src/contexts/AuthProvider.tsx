import {createContext, type Dispatch, type SetStateAction, useState} from "react";
import type {UserType} from "../@types/UserType.ts";

type AuthContextType = {
    user: UserType | null;
    isAuthenticated: boolean;
    setUser : Dispatch<SetStateAction<null>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: {children: React.ReactNode}) => {
    const [user, setUser] = useState(null);
    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{user, isAuthenticated, setUser}}>
            {children}
        </AuthContext.Provider>
    );
}