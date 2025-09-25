import Box from "@mui/material/Box";
import type {HeroType} from "../../@types/HeroType";
import {Card, CardMedia, Grid, Paper} from "@mui/material";
import {imageBaseUrl} from "../../api/config/Axios.config.ts";
import Typography from "@mui/material/Typography";

type HeroCardProps = {
    heroes: HeroType[];
};

const HeroCard = ({heroes}: HeroCardProps) => {
    return (
        <Box>
            <Grid
                container
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    borderBottom: "2px solid #FDDE2B",
                }}
            >
                {heroes.map((hero: HeroType) => (
                    <Grid size={{lg: 2}} key={hero.id}>
                        <Card
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "flex-start",
                                padding: "16px",
                                margin: "10px",
                                position: "relative",
                                overflow: "hidden",
                            }}
                        >
                            <CardMedia>
                                <img src={imageBaseUrl + hero.imageLink} alt={hero.name}></img>
                            </CardMedia>
                            <Typography variant={"caption"} style={{fontSize: "20px"}}>
                                Winrate : {(hero.winRate * 100).toFixed(1)}%
                            </Typography>

                            {/* Layer qui s'affiche seulement au hover */}
                            <Box
                                className="hover-layer"
                                sx={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    background: "rgba(0,0,0,0.7)",
                                    color: "white",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    opacity: 0,
                                    transition: "opacity 0.3s ease-in-out",
                                    gap: "10px",
                                    padding: "16px",
                                }}
                            >
                                <Box style={{margin: "5px"}}>
                                    {hero.synergies.map((synergie) => (
                                        <Paper
                                            elevation={6}
                                            key={synergie.id}
                                            sx={{
                                                padding: "2px",
                                                display: "flex",
                                                alignItems: "center",
                                                border: synergie.isTeamUp
                                                    ? "3px dashed gold"
                                                    : "2px solid green",
                                                background: "white",
                                            }}
                                        >
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
                                        <Paper
                                            elevation={6}
                                            key={matchUp.id}
                                            sx={{
                                                padding: "2px",
                                                display: "flex",
                                                alignItems: "center",
                                                border: "2px solid red",
                                                background: "white",
                                            }}
                                        >
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
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <style>
                {`
          .MuiCard-root:hover .hover-layer {
            opacity: 1;
          }
        `}
            </style>
        </Box>
    );
};

export default HeroCard;
