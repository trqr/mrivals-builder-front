import {createContext, useEffect, useState, useTransition} from "react";
import {getAllPlayersStats, savePlayerStats} from "../api/Player.api.ts";
import type {RankGameSeasonType} from "../@types/PlayerType/RankGameSeasonType.ts";
import {type AccountType} from "../@types/UserType.ts";

type UserDataInitContextType = {
    activeAccount: AccountType;
    addAccountName: (account: string) => Promise<AccountType>;
    accounts: AccountType[];
    setActiveAccount: (account: AccountType) => void;
    getCurrentSeasonHighScore: () => number;
    getAllTimeHighScore: () => number;
    activeStats: never;
}

export const UserDataInitContext = createContext<UserDataInitContextType | undefined>(undefined);

export const UserDataInitProvider = ({children}: { children: React.ReactNode }) => {
    const [accounts, setAccounts] = useState<AccountType[]>([])
    const [activeAccount, setActiveAccount] = useState<AccountType>(accounts[0])
    const [activeStats, setActiveStats] = useState<never>()
    const [isPending, startTransition] = useTransition()

    const addAccountName = async (accountName: string) => {
        const savedAccount = await savePlayerStats(accountName)
        setActiveAccount(savedAccount)
        return savedAccount;
    }

    const getAllAccountsAndSetFirstAccount = async () => {
        const fetchedAccounts = await getAllPlayersStats()
        setAccounts(fetchedAccounts);
        if (accounts.length === 0) return;
        setActiveAccount(fetchedAccounts[0])
    }

    useEffect(() => {
        startTransition(async () => {
            await getAllAccountsAndSetFirstAccount()
            if (activeAccount)
            setActiveStats(JSON.parse(activeAccount.statsRawJson))
        })
    }, []);

    function getCurrentSeasonHighScore(): number {
        if (!activeAccount)
            return 0;
        const stats= JSON.parse(activeAccount.statsRawJson);

        const seasonsObj = stats.player.info.rank_game_season;
        if (!seasonsObj) return 0;

        const seasons = Object.values(seasonsObj) as never[];

        if (seasons.length === 0) return 0;

        const currentSeason: RankGameSeasonType = seasons[seasons.length - 1];

        return currentSeason.max_rank_score ?? 0;
    }

    function getAllTimeHighScore(): number {
        if (!activeAccount)
            return 0;

            const stats= JSON.parse(activeAccount.statsRawJson);

        const seasonsObj = stats.player.info.rank_game_season;
        if (!seasonsObj) return 0;

        const seasons = Object.values(seasonsObj) as never[];
        if (seasons.length === 0) return 0;

        return Math.max(
            ...seasons.map((s: any) => s.max_rank_score ?? 0)
        );
    }

    return (
        <UserDataInitContext.Provider value={{
            activeAccount, addAccountName, getCurrentSeasonHighScore, activeStats,
            getAllTimeHighScore, accounts, setActiveAccount}}>
            {children}
        </UserDataInitContext.Provider>
    );
}