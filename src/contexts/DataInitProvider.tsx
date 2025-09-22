import {createContext, useEffect, useState, useTransition} from "react";
import type {HeroType} from "../@types/HeroType";
import {getAllHeroes} from "../api/Hero.api.ts";
import type {MapType} from "../@types/MapType.ts";
import {getAllMap} from "../api/Map.api.ts";
import {getBestWinRateByRole} from "../api/Compo.api.ts";

type DataContextType = {
    heroes: HeroType[];
    maps: MapType[];
    refreshHeroes: () => Promise<void>;
    bestHeroes: HeroType[];
}

export const DataInitContext = createContext<DataContextType | undefined>(undefined);

export const DataInitProvider = ({children}: { children: React.ReactNode }) => {
    const [heroes, setHeroes] = useState<HeroType[]>([])
    const [maps, setMaps] = useState<MapType[]>([])
    const [isPending, startTransition] = useTransition()
    const [bestHeroes, setBestHeroes] = useState<HeroType[]>([])

    useEffect(() => {
        startTransition(async () => {
            setMaps(await getAllMap())
            await refreshHeroes()
            await getHomeBestWinrate()
        })
    }, []);

    const getHomeBestWinrate = async () => {
        const data = await getBestWinRateByRole([]);
        const flattenedData = data.flatMap((group) => group.heroes);
        setBestHeroes(flattenedData);
    }

    const refreshHeroes = async () => {
        const data = await getAllHeroes();
        setHeroes(data);
    };


    return (
        <DataInitContext.Provider value={{heroes, maps, refreshHeroes, bestHeroes}}>
            {children}
        </DataInitContext.Provider>
    );
}