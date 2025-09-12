import {useCompo} from "../../hooks/useCompo.tsx";
import Typography from "@mui/material/Typography";
import type {HeroType} from "../../@types/HeroType";
import {Card, CardMedia, Grid, Paper} from "@mui/material";
import {imageBaseUrl} from "../../api/config/Axios.config.ts";
import {startTransition, useEffect, useState} from "react";
import Page from "../layout/Page.tsx";
import Box from "@mui/material/Box";
import {getTeamCounter, getTeamSynergie, saveCompo} from "../../api/Compo.api.ts";
import TeambuildButton from "../../componnents/common/buttons/TeambuildButton.tsx";
import {useNavigate} from "react-router";
import {toast} from "react-toastify";

const TeamCompositionCheckout = () => {
    const { compo } = useCompo();
    const [teamCounters, setTeamCounters] = useState<any[]>([]);
    const [teamSynergies, setTeamSynergies] = useState<any[]>([]);
    const [teamSaved, setTeamSaved] = useState<any | null>(null);
    const navigate = useNavigate();



    useEffect(() => {
        startTransition(async () => {
            if (compo.length > 0) {
                const heroesIds = compo.map((hero) => hero?.id);
                const fetchedTeamCounters = await getTeamCounter(heroesIds);
                const fetchedTeamSynergies = await getTeamSynergie(heroesIds);

                setTeamCounters(fetchedTeamCounters);
                setTeamSynergies(fetchedTeamSynergies);
            }
        })
    }, []);


    return (
        <Page title={"Team review"} description={"Team review"}>
            <Grid container style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                borderBottom: "2 px solid #FDDE2B"

            }}>
                {compo.map((hero: HeroType) => (
                    <Grid size={{lg: 1.5}}>
                        <Card style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            padding: "16px",
                            margin: "10px",
                        }} >
                            <CardMedia>
                                <img src={imageBaseUrl+hero.imageLink} alt={hero.name}></img>
                            </CardMedia>
                            <Typography variant={"h4"} style={{fontSize: "20px"}}>Winrate : {(hero.winRate * 100).toFixed(1)}%</Typography>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "flex-start",
                                padding: "16px",
                                margin: "10px",
                            }}>
                            <Box style={{margin: "5px"}}>
                                {hero.synergies.map((synergie) => (
                                    <Paper elevation={6} key={synergie.id} sx={{ padding: "2px" , display: "flex" , alignItems: "center", border: synergie.isTeamUp ? "3px dashed gold" : "2px solid green"}}>
                                        <img
                                            src={imageBaseUrl + synergie.ally.imageLink}
                                            style={{
                                                width: "50px",
                                                height: "50px",
                                                objectFit: "cover",
                                                objectPosition: "center 15%",
                                            }}
                                            />
                                    </Paper>
                                ))}
                            </Box>
                            <Box style={{margin: "5px"}}>
                                {hero.matchUps.map((matchUp) => (
                                    <Paper elevation={6} key={matchUp.id} sx={{ padding: "2px", display: "flex", alignItems: "center", border: "2px solid red"}}>
                                        <img
                                            src={imageBaseUrl + matchUp.counterPick.imageLink}
                                            style={{
                                            width: "50px",
                                            height: "50px",
                                            objectFit: "cover",
                                            objectPosition: "center 15%",
                                            }}
                                    />
                                    </Paper>
                                ))}
                            </Box>
                            </div>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Grid style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "flex-start",
            }}>
                <Box sx={{ margin: "20px", backgroundColor: "rgba(0, 0, 0, 0.2)", padding: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"}}>
                    <Typography variant="h6" gutterBottom>
                        Best Synergies
                    </Typography>
                    <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "row" }}>
                        {Array.isArray(teamSynergies) &&
                            teamSynergies.map((synergy) => (
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
                <Box sx={{ margin: "20px", backgroundColor: "rgba(0, 0, 0, 0.2)", padding: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}>
                    <Typography variant="h6" gutterBottom>
                        Worst Counters
                    </Typography>
                    <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "row" }}>
                        {teamCounters.map((counter) => (
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
                <Box sx={{ transform: "skew(-21deg)", mt: 2, margin: "20px", alignItems: "center"}}>
                    <TeambuildButton
                        style={{marginTop: "20px"}}
                        onClick={async () => {
                            try {
                                const heroesIds = compo.map((hero) => hero.id);
                                const savedTeam = await saveCompo(heroesIds);
                                const navToTeams = await navigate("../user/teams");
                                setTeamSaved(savedTeam);
                                toast.success("Composition sauvegardée avec succès !");
                            } catch (error) {
                                console.error(error);
                                toast.error("Erreur lors de la sauvegarde de la composition.");
                            }
                        }}
                    >
                        Save
                    </TeambuildButton>
                </Box>
            </Grid>
        </Page>
    )
}

export default TeamCompositionCheckout;