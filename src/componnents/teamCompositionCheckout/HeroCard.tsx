import Box from "@mui/material/Box";
import type {HeroType} from "../../@types/HeroType";
import {Card, CardMedia, Grid, Paper} from "@mui/material";
import {imageBaseUrl} from "../../api/config/Axios.config.ts";
import Typography from "@mui/material/Typography";
import {useCompo} from "../../hooks/useCompo.tsx";

const HeroCard = () => {
    const { compo } = useCompo();

    return (
        <Box>
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
        </Box>
    )
}

export default HeroCard;