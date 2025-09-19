import Box from "@mui/material/Box";
import {Grid} from "@mui/material";
import type {HeroType} from "../../@types/HeroType";
import {useEffect, useState} from "react";
import HeroRoleFilter from "../../componnents/common/HeroRoleFilter.tsx";
import {DndContext, DragOverlay} from "@dnd-kit/core";
import {DraggableHero} from "../../componnents/builder/drag&drop/DraggableHero.tsx";
import {imageBaseUrl} from "../../api/config/Axios.config.ts";
import {getBestWinRateByRole, saveCompo} from "../../api/Compo.api.ts";
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
import {useLoading} from "../../hooks/useLoading.tsx";
import Typography from "@mui/material/Typography";
import iconTank from "../../images/mainTank.webp";
import iconHeal from "../../images/mainHeal.webp";

const BuilderPage = () => {
    const {heroes} = useData();
    const [availableHeroes, setAvailableHeroes] = useState(heroes);
    const [bestHeroes, setBestHeroes] = useState([]);
    const [role, setRole] = useState("");
    const [activeHero, setActiveHero] = useState<HeroType | null>(null);
    const {startTransition} = useLoading();
    const [recommendationsMessages, setRecommendationsMessages] = useState({
        archetype: "",
        mainTank: "",
        mainHeal: "",
        ban: ""
    })
    const navigate = useNavigate();
    const theme = useTheme();
    const {compo, addToCompo, clearCompo} = useCompo();

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
        const newMessages = {...recommendationsMessages};

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
            const savedCompo = await saveCompo(heroesIds);
            console.log(savedCompo);
            navigate(`/team/${savedCompo?.id}`);
        });
    };

    const handleRemoveAllHeroes = () => {
        clearCompo();
        setAvailableHeroes(heroes);
    }

    return (
        <Page title={"Builder"} description="Builder">
            <DndContext
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragCancel={handleDragCancel}
            >

                <Box
                    sx={{display: {xs: "none", md: "flex"}, justifyContent: "space-between", width: "100%",}}
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
                            Save
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
                                sx={{display: "flex", justifyContent: "space-between", margin: "30px 20px", mr: "100px", alignItems: "center"}}>
                                <HeroRoleFilter role={role} setRole={setRole}/>
                                <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", gap: 3, height: "60px"}}>
                                    <Box sx={{display: "flex", flexDirection: "column" ,justifyContent: "center", alignItems: "center"}}>
                                        <img src={iconTank} alt="Main Tank" style={{width: "22px", height: "30px",}}/>
                                        <Typography variant={"caption"}>Main Tank</Typography>
                                    </Box>
                                    <Box sx={{display: "flex", flexDirection: "column" ,justifyContent: "center", alignItems: "center"}}>
                                        <img src={iconHeal} alt="Main Heal" style={{width: "22px", height: "30px",}}/>
                                        <Typography variant={"caption"}>Main Heal</Typography>
                                    </Box>
                                    <Box>
                                        <Box sx={{border: "1px solid green"}}></Box><Typography variant={"caption"}>Best win rates</Typography>
                                    </Box>
                                    <Box>
                                        <Box sx={{border: "1px dashed gold"}}></Box><Typography variant={"caption"}>Team Ups</Typography>
                                    </Box>
                                </Box>
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


            {/* Mobile version  */}
            <Grid container sx={{ display: {xs: "flex", md: "none"} }}>
                <DragDropContainer
                    compo={compo}
                    availableHeroes={availableHeroes}
                    setAvailableHeroes={setAvailableHeroes}
                    activeHero={activeHero}
                    setActiveHero={setActiveHero}
                />
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                        gap: 1,
                        pb: "5px"
                    }}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                        gap: 2,
                        height: "40px"
                    }}>
                        <Box>
                            <Box sx={{border: "1px solid green"}}/>
                            <Typography
                                variant={"caption"} fontSize={10}>Best win rates</Typography>
                        </Box>
                        <Box>
                            <Box sx={{border: "1px dashed gold"}}/>
                            <Typography variant={"caption"} fontSize={10}>Team Ups</Typography>
                        </Box>
                    </Box>
                    <HeroRoleFilter role={role} setRole={setRole}/>

                </Box>
                <Grid size={12}>
                    <Grid container spacing={1} sx={{
                        height: "auto",
                        overflowY: "auto",
                        padding: "10px",
                        scrollbarWidth: "thin",
                        scrollbarColor: `${theme.palette.primary.main} transparent`,
                    }}>
                        {(role ? availableHeroes.filter((hero: HeroType) => hero.role === role) : availableHeroes)
                            .map((hero: HeroType, index: number) => (
                                <Grid
                                    key={index}
                                    size={{xs: 3}}
                                >
                                    <DraggableHero hero={hero} bestHeroes={bestHeroes}/>
                                </Grid>
                            ))}
                    </Grid>
                </Grid>
            </Grid>
        </Page>
    );
};

 export default BuilderPage;