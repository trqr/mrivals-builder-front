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
import {getBestWinRateByRole, getTeamSynergie, saveCompo} from "../api/Compo.api.ts";
import {useCompo} from "../hooks/useCompo.tsx";
import {useNavigate} from "react-router";
import Page from "./layout/Page.tsx";
import {Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import {useTheme} from "@mui/material/styles";
import { getTeamCounter } from "../api/Compo.api.ts";
import DeleteButton from "../componnents/button/DeleteButton.tsx";
import MainButton from "../componnents/button/MainButton.tsx";

const Builder = () => {
    const fetchedHeroes = useLoaderData<HeroType[]>();
    const [heroes, setHeroes] = useState(fetchedHeroes);
    const [bestHeroes, setBestHeroes] = useState([]);
    const [role, setRole] = useState("");
    const [activeHero, setActiveHero] = useState<HeroType | null>(null);
    const [isPending, startTransition] = useTransition();
    const [recommendationsMessages, setRecommendationsMessages] = useState({archetype: "", mainTank: "", mainHeal: "", ban: ""})
    const navigate = useNavigate();
    const theme = useTheme();
    const {compo, addToCompo, removeFromCompo, clearCompo} = useCompo();

    const handleDragStart = (event: any) => {
        const hero = heroes.find((h) => h.id.toString() === event.active.id);
        if (hero) {
            setActiveHero(hero);
        }
    };

    const [teamCounters, setTeamCounters] = useState<any[]>([]);
    const [teamSynergies, setTeamSynergies] = useState<any[]>([]);

    useEffect(() => {
        startTransition(async () => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            const heroesIds = compo.map((hero) => hero?.id);
            const fetchedBestHeroes = await getBestWinRateByRole(heroesIds);
            setBestHeroes(fetchedBestHeroes);
            if (compo.length > 0) {
                const fetchedTeamCounters = await getTeamCounter(heroesIds);
                const fetchedTeamSynergies = await getTeamSynergie(heroesIds);
                setTeamCounters(fetchedTeamCounters);
                setTeamSynergies(fetchedTeamSynergies);
            }
        });

        recommend();
        localStorage.setItem("currentCompo", JSON.stringify(compo.map((hero) => hero?.id)));
        console.log("Compo actuelle:", compo);
    }, [compo]);

    const recommend = () => {
        let newMessages = {...recommendationsMessages};

        if (compo.length === 0) {
            setRecommendationsMessages({...recommendationsMessages, archetype: ""});
        } else if (compo.filter(hero => hero.role === "Duelist").length > 2) {
            newMessages.archetype = "You have way too much Duelist ! Consider replacing one duelist by a Vanguard or a Strategist"
        } else if (compo.filter(hero => hero.role === "Vanguard").length > 3) {
            newMessages.archetype = "You have way too much Vanguard ! Consider replacing one Vanguard by a Strategist or a Duelist"
        } else if (compo.filter(hero => hero.role === "Strategist").length > 3) {
            newMessages.archetype = "You have way too much Strategist ! Consider replacing one Strategist by a Vanguard or a Duelist"
        } else newMessages.archetype = ""
        if (compo.length > 0 && compo.filter(hero => hero.isMainTank).length === 0) {
            newMessages.mainTank = "You're team lack tanking. Consider picking one main Tank."
        } else newMessages.mainTank = ""
        if (compo.length > 0 && compo.filter(hero => hero.isMainHeal).length === 0) {
            newMessages.mainHeal = "You're team lack healing. Consider picking one main Heal."
        } else newMessages.mainHeal = ""

        setRecommendationsMessages(newMessages);
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
            const savedCompo = await navigate("/team");
        });
    };

    return (
        <Page title={"Builder"} description="Builder">
            <LinearProgress variant={isPending ? "indeterminate" : "determinate"}/>
            <DndContext
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragCancel={handleDragCancel}
            >
                <Box
                    sx={{display: "flex", justifyContent: "space-between", width: "100%", }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "22%",
                            margin: "25px",
                            alignItems: "center",
                            alignContent: "center",
                            justifyContent: "center",
                            height: "85vh",
                        }}
                    >
                        <Grid
                            container
                            gap={2}
                            sx={{display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "10px"}}
                        >
                            {Array.from({length: 6}).map((_, i) => (
                                <Grid key={i} size={{md: 5.5, lg: 5.5, xl: 5.5}} sx={{textAlign: "center", display: "flex", justifyContent: "center"}}>
                                    <DroppableSlot
                                        id={`slot-${i}`}
                                        hero={compo[i] || undefined}
                                        handleClick={() => compo[i] && handleRemoveHero(compo[i])}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                        <Box sx={{margin: "10px"}}>
                        <MainButton style={{margin: "5px"}}
                            disabled={compo.filter((x) => x !== null).length < 6}
                            onClick={handleSubmitCompo}
                        >
                            Submit
                        </MainButton>
                            <DeleteButton style={{margin: "5px"}}
                            onClick={clearCompo}>
                                Clear
                            </DeleteButton>
                        </Box>

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
                                sx={{display: "flex", justifyContent: "center", margin: "30px 10px"}}>
                                <HeroRoleFilter role={role} setRole={setRole}/>
                            </Box>
                            <Grid container gap={1} sx={{
                                height: "550px",
                                overflowY: "auto",
                                padding: "10px",
                                scrollbarWidth: "thin",
                                scrollbarColor: `${theme.palette.primary.main} transparent`,
                            }}>
                                {(role ? heroes.filter((hero: HeroType) => hero.role === role) : heroes)
                                    .map((hero: HeroType, index: number) => (
                                    <Grid
                                        key={index}
                                        size={{md: 1}}
                                    >
                                        <DraggableHero hero={hero} bestHeroes={bestHeroes}/>
                                    </Grid>
                                ))}
                            </Grid>
                            <Box sx={{display: "flex", justifyContent: "space-around"}}>
                                {compo.length > 0 &&
                                    <Box sx={{
                                        marginTop: "20px",
                                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                                        padding: "10px",
                                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
                                    }}>
                                        <Typography variant="h6" gutterBottom>
                                            Worst Counters
                                        </Typography>
                                        <ul style={{
                                            listStyle: "none",
                                            padding: 0,
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                            {teamCounters.slice(0, 2).map((counter) => (
                                                <li
                                                    key={counter.enemyHeroId}
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        marginBottom: "10px",
                                                    }}
                                                >
                                                    <img
                                                        src={imageBaseUrl + counter.imageLink}
                                                        alt={counter.name}
                                                        style={{
                                                            objectFit: "cover",
                                                            objectPosition: "top",
                                                            height: "80px",
                                                            width: "80px",
                                                            borderRadius: "5px",
                                                            border: "3px solid violet",
                                                            marginRight: "10px",
                                                        }}
                                                    />
                                                </li>
                                            ))}
                                        </ul>
                                    </Box>
                                }
                                {compo.length > 0 &&
                                    <Paper elevation={1} square sx={{margin: "30px", padding: "5px"}}>
                                        {recommendationsMessages.archetype &&
                                            <Typography sx={{display: "flex", alignItems: "center"}}
                                                        variant={"subtitle2"}>
                                                <PriorityHighIcon color={"error"}/>
                                                {recommendationsMessages.archetype}
                                            </Typography>
                                        }
                                        {recommendationsMessages.mainTank &&
                                            <Typography sx={{display: "flex", alignItems: "center"}}
                                                        variant={"subtitle2"}>
                                                <PriorityHighIcon color={"error"}/>
                                                {recommendationsMessages.mainTank}
                                            </Typography>
                                        }
                                        {recommendationsMessages.mainHeal &&
                                            <Typography sx={{display: "flex", alignItems: "center"}}
                                                        variant={"subtitle2"}>
                                                <PriorityHighIcon color={"error"}/>
                                                {recommendationsMessages.mainHeal}
                                            </Typography>
                                        }
                                        {recommendationsMessages.ban &&
                                            <Typography sx={{display: "flex", alignItems: "center"}}
                                                        variant={"subtitle2"}>
                                                <PriorityHighIcon color={"error"}/>
                                                {recommendationsMessages.ban}
                                            </Typography>
                                        }
                                    </Paper>
                                }

                                {compo.length > 0 &&
                                    <Box sx={{
                                        marginTop: "20px",
                                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                                        padding: "10px",
                                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
                                    }}>
                                        <Typography variant="h6" gutterBottom>
                                            Best Synergies
                                        </Typography>
                                        <ul style={{
                                            listStyle: "none",
                                            padding: 0,
                                            display: "flex",
                                            flexDirection: "row"
                                        }}>
                                            {Array.isArray(teamSynergies) &&
                                                teamSynergies.slice(0, 2).map((synergy) => (
                                                    <li
                                                        key={synergy.teamHeroId}
                                                        style={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            marginBottom: "10px",
                                                        }}
                                                    >
                                                        <img
                                                            src={imageBaseUrl + synergy.imageLink}
                                                            alt={synergy.name}
                                                            style={{
                                                                objectFit: "cover",
                                                                objectPosition: "top",
                                                                height: "80px",
                                                                width: "80px",
                                                                borderRadius: "5px",
                                                                border: "3px solid blue",
                                                                marginRight: "10px",
                                                            }}
                                                        />
                                                    </li>
                                                ))}
                                        </ul>
                                    </Box>
                                }


                            </Box>
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
