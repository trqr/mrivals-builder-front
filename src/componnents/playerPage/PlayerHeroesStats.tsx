import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {iconBaseUrl} from "../../api/config/Axios.config.ts";
import MainButton from "../common/buttons/MainButton.tsx";
import {useState} from "react";

export const PlayerHeroesStats = ({playerStats}) => {
    const [showAllRanked, setShowAllRanked] = useState(false);
    const [showAllKDA, setShowAllKDA] = useState(false);

    return (
        <Box sx={{flex: "1 1 100%", mt: 3, marginLeft: "40px"}}>
            <Typography variant="h5" gutterBottom>
                Heroes Ranked
            </Typography>
            <Box sx={{display: "flex", flexWrap: "wrap", gap: 2,}}>
                {(showAllRanked ? playerStats.heroes_ranked : playerStats.heroes_ranked
                    .slice(0, 6))
                    .sort((a: any, b: any) => b.matches - a.matches)
                    .map((hero: any, index: number) => (
                        <Box
                            key={index}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                border: "solid 2px #FDDE2B",
                                transform: "skew(-21deg)",
                                p: 1.5,
                                width: "240px",
                                boxShadow: 2,
                            }}
                        >
                            <img
                                src={iconBaseUrl + hero.hero_thumbnail}
                                alt={hero.hero_name}
                                style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "50%",
                                    marginRight: "30px",
                                    transform: "skew(21deg)",
                                    margin: "2px"
                                }}
                            />
                            <Box onClick={() => setShowAllKDA(!showAllKDA)} sx={{cursor: "pointer",
                                transform: "skew(21deg)"}}>
                                {showAllKDA ? (
                                    <Box className="allKDA">
                                        <Typography fontWeight="bold">{hero.hero_name}</Typography>
                                        <Typography>Matches: {hero.matches}</Typography>
                                        <Typography>Wins: {hero.wins}</Typography>
                                        <Typography>MVP: {hero.mvp}</Typography>
                                        <Typography>SVP: {hero.svp}</Typography>
                                    </Box>
                                ) : (
                                    <Box className="KDA">
                                        <Typography fontWeight="bold">{hero.hero_name}</Typography>
                                        <Typography>
                                            KDA: {hero.kills} / {hero.deaths} / {hero.assists}
                                        </Typography>
                                    </Box>
                                )}
                            </Box>

                        </Box>
                    ))}
            </Box>
            {playerStats.heroes_ranked.length > 6 && (
                <Box sx={{mt: 2 , }}>
                    <MainButton onClick={() => setShowAllRanked(!showAllRanked)}>
                        <span>{showAllRanked ? "see less" : "See more"}</span>
                    </MainButton>
                </Box>
            )}
        </Box>
    )
}