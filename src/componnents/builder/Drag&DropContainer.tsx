import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { DroppableSlot } from "./drag&drop/DroppableSlot.tsx";
import type { HeroType } from "../../@types/HeroType";
import { useCompo } from "../../hooks/useCompo.tsx";

interface DragDropContainerProps {
    compo: HeroType[];
    availableHeroes: HeroType[];
    setAvailableHeroes: React.Dispatch<React.SetStateAction<HeroType[]>>;
    activeHero: HeroType | null;
    setActiveHero: React.Dispatch<React.SetStateAction<HeroType | null>>;
}

const DragDropContainer = ({
                               compo,
                               availableHeroes,
                               setAvailableHeroes,
                               activeHero,
                               setActiveHero,
                           }: DragDropContainerProps) => {
    const { addToCompo, removeFromCompo } = useCompo();

    const handleRemoveHero = (hero: HeroType) => {
        removeFromCompo(hero);
        setAvailableHeroes((prev) => [...prev, hero]);
    };

    const handleDropHero = (activeId: string, overId: string | null) => {
        if (!overId) return;
        if (compo.length > 5) return;

        const hero = availableHeroes.find((h) => h.id.toString() === activeId);
        if (hero) {
            addToCompo(hero);
            setAvailableHeroes((prev) => prev.filter((h) => h.id !== hero.id));
        }
        setActiveHero(null);
    };

    return (
        <Box>
            <Grid
                container
                gap={1}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "10px",
                    position: {xs: "fixed", md: "static" },
                    bottom: 0,
                }}
            >
                {Array.from({ length: 6 }).map((_, i) => (
                    <Grid
                        key={i}
                        size={{ xs: 1.7, md: 5.5, lg: 5.5, xl: 5.5 }}
                        sx={{
                            textAlign: "center",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <DroppableSlot
                            id={`slot-${i}`}
                            hero={compo[i] || undefined}
                            handleClick={() => compo[i] && handleRemoveHero(compo[i])}
                            onDrop={(activeId: string) => handleDropHero(activeId, `slot-${i}`)}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default DragDropContainer;
