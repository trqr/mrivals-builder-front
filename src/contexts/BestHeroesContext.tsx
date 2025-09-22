import { createContext, useContext, useState } from "react";
import type { HeroType } from "../@types/HeroType";

type BestHeroesContextType = {
    bestHeroes: HeroType[];
    setBestHeroes: React.Dispatch<React.SetStateAction<HeroType[]>>;
};

const BestHeroesContext = createContext<BestHeroesContextType | undefined>(undefined);

export const BestHeroesProvider = ({ children }: { children: React.ReactNode }) => {
    const [bestHeroes, setBestHeroes] = useState<HeroType[]>([]);
    return (
        <BestHeroesContext.Provider value={{ bestHeroes, setBestHeroes }}>
            {children}
        </BestHeroesContext.Provider>
    );
};

export const useBestHeroes = () => {
    const context = useContext(BestHeroesContext);
    if (!context) throw new Error("useBestHeroes must be used within BestHeroesProvider");
    return context;
};
