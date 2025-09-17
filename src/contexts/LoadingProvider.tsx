import {createContext, useTransition} from "react";

type LoadingProviderProps = {
    isPending: boolean;
    startTransition: (callback: () => void) => void;
}

export const LoadingContext = createContext<LoadingProviderProps | undefined>(undefined);

export const LoadingProvider = ({children}: { children: React.ReactNode }) => {
    const [isPending, startTransition] = useTransition()

    return (
        <LoadingContext.Provider value={{isPending, startTransition}}>
            {children}
        </LoadingContext.Provider>
    );
}