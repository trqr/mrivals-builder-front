import {createContext, useEffect, useState, useTransition} from "react";
import type {HeroType} from "../@types/HeroType";
import {getAllHeroes} from "../api/Hero.api.ts";

type DataContextType = {
    heroes: HeroType[];
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({children}: { children: React.ReactNode }) => {
    const [heroes, setHeroes] = useState<HeroType[]>([])
    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        startTransition(async () => {
            setHeroes(await getAllHeroes());
        })
    }, []);

    return (
        <DataContext.Provider value={{heroes}}>
            {children}
        </DataContext.Provider>
    );
}