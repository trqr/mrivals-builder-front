import {createContext, useState} from "react";
import type {HeroType} from "../@types/HeroType";

type CompoContextType = {
    compo : HeroType[];
    addCompo: (hero : HeroType) => void;
    removeCompo: (hero : HeroType) => void;
}

export const CompoContext = createContext<CompoContextType | undefined>(undefined);

export const CompoProvider = ({ children }: {children: React.ReactNode}) => {
    const [compo, setCompo] = useState<HeroType[]>([])

    const addCompo = (hero : HeroType) => {
        setCompo({...compo, hero});
    }

    return (
        <CompoContext.Provider value={{compo}}>
            {children}
        </CompoContext.Provider>
    );
}