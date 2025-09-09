import {createContext, type Dispatch, type SetStateAction, useState} from "react";
import type {PlayerType} from "../@types/PlayerType/PlayerType.ts";
import {getPlayerStats} from "../api/Player.service.ts";

type UserDataInitContextType = {
    userGameStats: PlayerType[];
    saveUserGameStats: (userAccount: string) => void;
}

export const UserDataInitContext = createContext<UserDataInitContextType | undefined>(undefined);

export const UserDataInitProvider = ({children}: { children: React.ReactNode }) => {
    const [userGameStats, setUserGameStats] = useState<PlayerType[]>([])

    const saveUserGameStats = async (userAccount: string) => {
        setUserGameStats(await getPlayerStats(userAccount))
    }

    return (
        <UserDataInitContext.Provider value={{userGameStats, saveUserGameStats}}>
            {children}
        </UserDataInitContext.Provider>
    );
}