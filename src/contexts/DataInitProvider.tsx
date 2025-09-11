import {createContext, useEffect, useState, useTransition} from "react";
import type {HeroType} from "../@types/HeroType";
import {getAllHeroes} from "../api/Hero.api.ts";
import type {MapType} from "../@types/MapType.ts";
import {getAllMap} from "../api/Map.api.ts";

type DataContextType = {
    heroes: HeroType[];
    maps: MapType[];
}

export const DataInitContext = createContext<DataContextType | undefined>(undefined);

export const DataInitProvider = ({children}: { children: React.ReactNode }) => {
    const [heroes, setHeroes] = useState<HeroType[]>([])
    const [maps, setMaps] = useState<MapType[]>([])
    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        startTransition(async () => {
            setMaps(await getAllMap())
            setHeroes(await getAllHeroes());
        })
    }, []);

    return (
        <DataInitContext.Provider value={{heroes, maps}}>
            {children}
        </DataInitContext.Provider>
    );
}