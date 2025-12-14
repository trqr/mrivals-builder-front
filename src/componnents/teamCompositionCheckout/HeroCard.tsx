import Box from "@mui/material/Box";
import type { HeroType } from "../../@types/HeroType";
import { Card, CardContent, CardMedia, Grid, Paper } from "@mui/material";
import { imageBaseUrl } from "../../api/config/Axios.config.ts";
import Typography from "@mui/material/Typography";

type HeroCardProps = {
    heroes: HeroType[];
};

const HeroCard = ({ heroes }: HeroCardProps) => {
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
                    <Grid size={{ xs: 4, lg: 2 }} key={hero.id}>
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
                            <CardMedia
                                sx={{
                                    width: "100%",
                                    margin: "0 auto",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <img
                                    src={imageBaseUrl + hero.imageLink}
                                    alt={hero.name}
                                    style={{
                                        maxWidth: "100%",
                                        maxHeight: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                            </CardMedia>
                            <CardContent>
                                <Typography variant="body2" sx={{fontSize: {xs: 12, sm: 14, md: 16, lg: 20}}}>
                                    <Typography component="span" sx={{display: {xs: "inline", md: "none"}}}>
                                        WR{" "}
                                    </Typography>
                                    <Typography component="span" sx={{display: {xs: "none", md: "inline"}}}>
                                        Winrate{" "}
                                    </Typography>
                                    {(hero.winRate * 100).toFixed(1)}%
                                </Typography>
                            </CardContent>

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
                                    gap: "5px",
                                    padding: "16px",
                                }}
                            >
                                <Box style={{ margin: "5px" }}>
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
                                                flexWrap: "wrap"
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
                                <Box style={{ margin: "5px" }}>
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
                                                flexWrap: "wrap"
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
