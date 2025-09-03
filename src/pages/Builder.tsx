import Box from "@mui/material/Box";
import {Button, Grid, Icon, LinearProgress} from "@mui/material";
import {useLoaderData} from "react-router-dom";
import type {HeroType} from "../@types/HeroType";
import {useEffect, useState, useTransition} from "react";
import HeroRoleFilter from "../componnents/HeroRoleFilter.tsx";
import {DndContext, DragOverlay} from "@dnd-kit/core";
import {DroppableSlot} from "../componnents/drag&drop/DroppableSlot.tsx";
import {DraggableHero} from "../componnents/drag&drop/DraggableHero.tsx";
import {imageBaseUrl} from "../api/axios.config.ts";
import {getBestWinRateByRole, saveCompo} from "../api/Compo.service.ts";
import {useCompo} from "../hooks/useCompo.tsx";
import {useNavigate} from "react-router";
import Page from "./layout/Page.tsx";
import {Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

const Builder = () => {
    const fetchedHeroes = useLoaderData<HeroType[]>();
    const [heroes, setHeroes] = useState(fetchedHeroes);
    const [bestHeroes, setBestHeroes] = useState([]);
    const [role, setRole] = useState("");
    const [activeHero, setActiveHero] = useState<HeroType | null>(null);
    const [isPending, startTransition] = useTransition();
    const [recommendationsMessages, setRecommendationsMessages] = useState({archetype: "", ban: ""})
    const navigate = useNavigate();

    const {compo, addToCompo, removeFromCompo} = useCompo();

    const handleDragStart = (event: any) => {
        const hero = heroes.find((h) => h.id.toString() === event.active.id);
        if (hero) {
            setActiveHero(hero);
        }
    };

    useEffect(() => {
        startTransition(async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const heroesIds = compo.map((hero) => hero?.id);
            const fetchedBestHeroes = await getBestWinRateByRole(heroesIds);
            setBestHeroes(fetchedBestHeroes);
        });
        recommend();
        localStorage.setItem("currentCompo", JSON.stringify(compo.map((hero) => hero?.id)));
        console.log(compo);
    }, [compo]);

    const recommend = () => {
        if (compo.length === 0) {
            setRecommendationsMessages({...recommendationsMessages, archetype: "Drag a hero to start composing your team !"});
        } else if (compo.filter(hero => hero.role === "Duelist").length > 2) {
            setRecommendationsMessages({...recommendationsMessages, archetype: "You have way too much Duelist ! Consider replacing one duelist by a Vanguard or a Strategist"});
        } else if (compo.filter(hero => hero.role === "Vanguard").length > 3) {
            setRecommendationsMessages({...recommendationsMessages, archetype: "You have way too much Vanguard ! Consider replacing one duelist by a Strategist or a Duelist"});
        } else if (compo.filter(hero => hero.role === "Strategist").length > 3) {
            setRecommendationsMessages({...recommendationsMessages, archetype: "You have way too much Strategist ! Consider replacing one duelist by a Vanguard or a Duelist"});
        } else {setRecommendationsMessages({...recommendationsMessages, archetype: ""})}
    }

    const handleDragEnd = (event: any) => {
        if (compo.length > 5) {
            handleDragCancel()
            return;
        }
        const {over, active} = event;
        if (over) {
            parseInt(over.id.replace("slot-", ""));
            const hero = heroes.find((h) => h.id.toString() === active.id);
            if (hero) {
                addToCompo(hero);
                setHeroes((prev) => prev.filter((h) => h.id !== hero.id));
            }
        }
        setActiveHero(null);
    };

    const handleDragCancel = () => {
        setActiveHero(null);
    };

    const handleRemoveHero = (hero: HeroType) => {
        removeFromCompo(hero);
        setHeroes((prev) => [...prev, hero]);
    };

    const handleSubmitCompo = async () => {
        startTransition(async () => {
            const heroesIds = compo.map((hero) => hero?.id);
            const savedCompo = await saveCompo(heroesIds).then(() => navigate("/team"))
        });
    };

    return (
        <Page title={"Builder"} description="Builder">
            {isPending && <LinearProgress variant={"indeterminate"}/>}
            <DndContext
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragCancel={handleDragCancel}
            >
                <Box
                    sx={{display: "flex", justifyContent: "space-between", width: "100%"}}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "25%",
                            margin: "10px",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            height: "90vh",
                        }}
                    >
                        <Grid
                            container
                            gap={1}
                            sx={{display: "flex", justifyContent: "center"}}
                        >
                            {Array.from({length: 6}).map((_, i) => (
                                <Grid key={i} size={{md: 5.5, lg: 5.5, xl: 5.5}}>
                                    <DroppableSlot
                                        id={`slot-${i}`}
                                        hero={compo[i] || undefined}
                                        handleClick={() => compo[i] && handleRemoveHero(compo[i])}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                        <Button
                            variant={"contained"}
                            sx={{margin: "10px"}}
                            disabled={compo.filter((x) => x !== null).length < 6}
                            onClick={handleSubmitCompo}
                        >
                            Validate
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexDirection: "column",
                            width: "75%",
                        }}
                    >
                        <Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: "30px 10px",
                                }}
                            >
                                <HeroRoleFilter role={role} setRole={setRole}/>
                            </Box>
                            <Grid container gap={1}>
                                {(role
                                        ? heroes.filter((hero: HeroType) => hero.role === role)
                                        : heroes
                                ).map((hero: HeroType, index: number) => (
                                    <Grid
                                        key={index}
                                        size={{md: 0.9}}
/*
                                        sx={{height: "175px", overflow: "hidden"}}
*/
                                    >
                                        <DraggableHero hero={hero} bestHeroes={bestHeroes}/>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                        <Box sx={{display: "flex", justifyContent: "space-around"}}>
                            <Paper elevation={1} square sx={{margin: "30px", padding: "5px"}}>
                                {recommendationsMessages.archetype &&
                                    <Typography sx={{display: "flex", alignItems: "center" }} variant={"subtitle2"}>
                                        <PriorityHighIcon color={"error"}/>
                                        {recommendationsMessages.archetype}
                                    </Typography>
                                }
                                {recommendationsMessages.ban &&
                                    <Typography sx={{display: "flex", alignItems: "center" }} variant={"subtitle2"}>
                                        <PriorityHighIcon color={"error"}/>
                                        {recommendationsMessages.ban}
                                    </Typography>
                                }
                            </Paper>
                        </Box>
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
        </Page>
    );
};

export default Builder;
