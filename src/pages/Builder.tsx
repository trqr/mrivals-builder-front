import Box from "@mui/material/Box";
import {Button, Grid} from "@mui/material";
import {useLoaderData} from "react-router-dom";
import type {HeroType} from "../@types/HeroType";
import {useState, useTransition} from "react";
import HeroRoleFilter from "../componnents/HeroRoleFilter.tsx";
import Header from "../componnents/header/Header.tsx";
import {DndContext, DragOverlay} from "@dnd-kit/core";
import {DroppableSlot} from "../componnents/drag&drop/DroppableSlot.tsx";
import {DraggableHero} from "../componnents/drag&drop/DraggableHero.tsx";
import {imageBaseUrl} from "../api/axios.config.ts";

const Builder = () => {
    const fetchedHeroes = useLoaderData<HeroType[]>()
    const [heroes, setHeroes] = useState(fetchedHeroes)
    const [role, setRole] = useState("")
    const [slots, setSlots] = useState<(HeroType | null)[]>(Array(6).fill(null));
    const [activeHero, setActiveHero] = useState<HeroType | null>(null);
    const [isPending, startTransition] = useTransition()

    const handleDragStart = (event: any) => {
        const hero = heroes.find((h) => h.id.toString() === event.active.id);
        if (hero) {
            setActiveHero(hero);
        }
    };


    const handleDragEnd = (event: any) => {
        const { over, active } = event;
        if (over) {
            const slotIndex = parseInt(over.id.replace("slot-", ""));
            const hero = heroes.find((h) => h.id.toString() === active.id);
            if (hero) {
                const newSlots = [...slots];
                newSlots[slotIndex] = hero;
                setSlots(newSlots);
                const newHeroes = heroes.filter((h) => h.id !== hero.id);
                setHeroes(newHeroes);
                startTransition( async () => {
                    // mettre mon post pour create et add a la compo
                })
                console.log(slots)
            }
        }
        setActiveHero(null);
    };

    const handleDragCancel = () => {
        setActiveHero(null);
    };

    return (
        <>
            <Header></Header>
            <DndContext
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragCancel={handleDragCancel}
            >
            <Box sx={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                <Box sx={{display: "flex", flexDirection: "column", width: "25%", margin: "10px", alignItems: "center", justifyContent: "flex-end", height: "90vh"}}>
                    <Grid container gap={1} sx={{display: "flex", justifyContent: "center"}}>
                        {slots.map((slotHero, i) => (
                            <Grid key={i} size={{ md: 5.5, lg: 5.5, xl: 5.5 }}>
                                <DroppableSlot id={`slot-${i}`} hero={slotHero || undefined} />
                            </Grid>
                        ))}
                    </Grid>
                    <Button variant={"contained"} sx={{margin: "10px"}} disabled={(slots.filter(x => x !== null).length < 6)}>Validate</Button>
                </Box>
                <Box sx={{display: "flex", justifyContent: "space-between", flexDirection: "column", width:'75%'}}>
                    <Box >
                        <Box sx={{display: "flex", justifyContent: "center", margin: "30px 10px"}}>
                            <HeroRoleFilter role={role} setRole={setRole}></HeroRoleFilter>
                        </Box>
                        <Grid container>
                            {(role ? heroes.filter((hero: HeroType) => hero.role === role) : heroes).map((hero: HeroType, index: number) => (
                                <Grid key={index} size={{md: 1}} sx={{height: "175px", overflow: "hidden"}}>
                                    <DraggableHero hero={hero} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                    <Box sx={{display: "flex", justifyContent: "center", flexDirection: "row"}}></Box>
                </Box>
            </Box>
                <DragOverlay>
                    {activeHero ? (
                        <img
                            src={imageBaseUrl + activeHero.imageLink}
                            style={{
                                objectFit: "cover",
                                objectPosition: "center",
                                maxHeight: "200px",
                                maxWidth: "175px",
                                pointerEvents: "none",
                            }}
                            alt={activeHero.name}
                        />
                    ) : null}
                </DragOverlay>
            </DndContext>
        </>
    )
}

export default Builder;