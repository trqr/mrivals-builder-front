import {useCompo} from "../hooks/useCompo.tsx";
import Typography from "@mui/material/Typography";
import type {HeroType} from "../@types/HeroType";
import {Card, CardMedia, Grid, Paper} from "@mui/material";
import {imageBaseUrl} from "../api/axios.config.ts";
import {useEffect} from "react";
import Page from "./layout/Page.tsx";
import Box from "@mui/material/Box";

const TeamCompositionCheckout = () => {
    const { compo } = useCompo();

    useEffect(() => {
        console.log(compo);
    }, []);


    return (
        <Page title={"Team review"} description={"Team review"}>
            <Grid container style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
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
                            <Typography variant={"h4"} style={{fontSize: "20px"}}>Pickrate :</Typography>
                            <Typography variant={"h4"} style={{fontSize: "20px"}}>Winrate : {(hero.winRate * 100).toFixed(1)}%</Typography>
                            <Typography variant={"h4"} style={{fontSize: "20px"}}>Type : {hero.attackType}</Typography>
                            <Box>
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
                            <Box>
                                {hero.matchUps.map((matchUp) => (
                                    <Paper elevation={6} key={matchUp.id} sx={{ padding: "2px", display: "flex", alignItems: "center", border: "2px solid red"}}
                                        <img
                                            src={imageBaseUrl + matchup.imageLink}
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
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Page>
    )
}

export default TeamCompositionCheckout;