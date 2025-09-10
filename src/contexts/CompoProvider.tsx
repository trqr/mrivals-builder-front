import {createContext, useState} from "react";
import type {HeroType} from "../@types/HeroType";

type CompoContextType = {
    compo: HeroType[];
    addToCompo: (hero: HeroType) => void;
    removeFromCompo: (hero: HeroType) => void;
    deleteCompo: () => void;
}

export const CompoContext = createContext<CompoContextType | undefined>(undefined);

export const CompoProvider = ({children}: { children: React.ReactNode }) => {
    const [compo, setCompo] = useState<HeroType[]>([])

    const addToCompo = (hero: HeroType) => {
        setCompo(prevState => [...prevState, hero]);
    }

    const removeFromCompo = (hero: HeroType) => {
        setCompo(compo.filter(h => h !== hero));
    }

    const deleteCompo = () => {
        setCompo([]);
    }

    return (
        <CompoContext.Provider value={{compo, addToCompo, removeFromCompo, deleteCompo}}>
            {children}
        </CompoContext.Provider>
    );
}