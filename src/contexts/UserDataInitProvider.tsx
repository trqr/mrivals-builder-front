import {createContext, useEffect, useState, useTransition} from "react";
import {getPlayerStats, savePlayerStats} from "../api/Player.api.ts";
import type {RankGameSeasonType} from "../@types/PlayerType/RankGameSeasonType.ts";

type UserDataInitContextType = {
    userGameStats: never;
    saveUserGameStats: () => void;
    getCurrentSeasonHighScore: () => number;
    getAllTimeHighScore: () => number;
}

export const UserDataInitContext = createContext<UserDataInitContextType | undefined>(undefined);

export const UserDataInitProvider = ({children}: { children: React.ReactNode }) => {
    const [userGameStats, setUserGameStats] = useState<never>()
    const [isPending, startTransition] = useTransition()


    useEffect(() => {
        startTransition(async () => {
            setUserGameStats(await getPlayerStats())
        })
    }, []);

    const saveUserGameStats = async () => {
        setUserGameStats(await savePlayerStats())
    }

    function getCurrentSeasonHighScore(): number {

        const seasonsObj = userGameStats!.player.info.rank_game_season;
        if (!seasonsObj) return 0;

        const seasons = Object.values(seasonsObj) as never[];
        if (seasons.length === 0) return 0;

        const currentSeason: RankGameSeasonType = seasons[seasons.length - 1];

        return currentSeason.max_rank_score ?? 0;
    }

    function getAllTimeHighScore(): number {
        const seasonsObj = userGameStats!.player.info.rank_game_season;
        if (!seasonsObj) return 0;

        const seasons = Object.values(seasonsObj) as never[];
        if (seasons.length === 0) return 0;

        return Math.max(
            ...seasons.map((s: any) => s.max_rank_score ?? 0)
        );
    }

    return (
        <UserDataInitContext.Provider value={{userGameStats, saveUserGameStats, getCurrentSeasonHighScore,
            getAllTimeHighScore}}>
            {children}
        </UserDataInitContext.Provider>
    );
}