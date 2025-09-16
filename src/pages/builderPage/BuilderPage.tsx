import Box from "@mui/material/Box";
import { Grid, LinearProgress} from "@mui/material";
import type {HeroType} from "../../@types/HeroType";
import {useEffect, useState, useTransition, type SetStateAction} from "react";
import HeroRoleFilter from "../../componnents/common/HeroRoleFilter.tsx";
import {DndContext, DragOverlay} from "@dnd-kit/core";
import {DraggableHero} from "../../componnents/builder/drag&drop/DraggableHero.tsx";
import {imageBaseUrl} from "../../api/config/Axios.config.ts";
import {getBestWinRateByRole} from "../../api/Compo.api.ts";
import {useCompo} from "../../hooks/useCompo.tsx";
import {useNavigate} from "react-router";
import Page from "../layout/Page.tsx";
import {useTheme} from "@mui/material/styles";
import DeleteButton from "../../componnents/common/buttons/DeleteButton.tsx";
import MainButton from "../../componnents/common/buttons/MainButton.tsx";
import {useData} from "../../hooks/useData.tsx";
import RecommendationMessages from "../../componnents/builder/RecommendationMessages.tsx";
import TeamSynergy from "../../componnents/builder/TeamSynergy.tsx";
import TeamCounter from "../../componnents/builder/TeamCounter.tsx";
import DragDropContainer from "../../componnents/builder/Drag&DropContainer.tsx";

const BuilderPage = () => {
    const {heroes} = useData();
    const [availableHeroes, setAvailableHeroes] = useState(heroes);
    const [bestHeroes, setBestHeroes] = useState([]);
    const [role, setRole] = useState("");
    const [activeHero, setActiveHero] = useState<HeroType | null>(null);
    const [isPending, startTransition] = useTransition();
    const [recommendationsMessages, setRecommendationsMessages] = useState({
        archetype: "",
        mainTank: "",
        mainHeal: "",
        ban: ""
    })
    const navigate = useNavigate();
    const theme = useTheme();
    const {compo, addToCompo, removeFromCompo, clearCompo} = useCompo();

    const handleDragStart = (event: any) => {
        const hero = availableHeroes.find((h) => h.id.toString() === event.active.id);
        if (hero) {
            setActiveHero(hero);
        }
    };


    useEffect(() => {
        startTransition(async () => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            const heroesIds = compo.map((hero) => hero?.id);
            const fetchedBestHeroes = await getBestWinRateByRole(heroesIds);
            setBestHeroes(fetchedBestHeroes);

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
            const hero = availableHeroes.find((h) => h.id.toString() === active.id);
            if (hero) {
                addToCompo(hero);
                setAvailableHeroes((prev) => prev.filter((h) => h.id !== hero.id));
            }
        }
        setActiveHero(null);
    };

    const handleDragCancel = () => {
        setActiveHero(null);
    };

    const handleSubmitCompo = async () => {
        startTransition(async () => {
            const heroesIds = compo.map((hero) => hero?.id);
            const savedCompo = await navigate("/team/{team.id}");
        });
    };

    const handleRemoveAllHeroes = () => {
        clearCompo();
        setAvailableHeroes(heroes);
    }

    return (
        <Page title={"Builder"} description="Builder">
            <LinearProgress sx={{height: "2px"}} variant={isPending ? "indeterminate" : "determinate"}/>
            <DndContext
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragCancel={handleDragCancel}
            >
                <Box
                    sx={{display: "flex", justifyContent: "space-between", width: "100%",}}
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
                        <DragDropContainer
                            compo={compo}
                            availableHeroes={availableHeroes}
                            setAvailableHeroes={setAvailableHeroes}
                            activeHero={activeHero}
                            setActiveHero={setActiveHero}
                        />
                        <Box sx={{margin: "10px"}}>
                        <MainButton style={{margin: "5px"}}
                            disabled={compo.filter((x) => x !== null).length < 6}
                            onClick={handleSubmitCompo}
                        >
                            Submit
                        </MainButton>
                            <DeleteButton style={{margin: "5px"}}
                            onClick={handleRemoveAllHeroes}>
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
                                {(role ? availableHeroes.filter((hero: HeroType) => hero.role === role) : availableHeroes)
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
                                        <TeamCounter/>
                                    </Box>
                                }
                                <RecommendationMessages messages={recommendationsMessages}/>
                                {compo.length > 0 &&
                                    <Box sx={{
                                        marginTop: "20px",
                                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                                        padding: "10px",
                                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
                                    }}>
                                        <TeamSynergy/>
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
                            alt={activeHero.name}
                            style={{
                                objectFit: "cover",
                                objectPosition: "center",
                                maxHeight: "200px",
                                maxWidth: "175px",
                                pointerEvents: "none",
                            }}
                        />
                    ) : null}
                </DragOverlay>
            </DndContext>
        </Page>
    );
};

 export default BuilderPage;