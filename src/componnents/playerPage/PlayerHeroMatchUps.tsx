import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {iconBaseUrl} from "../../api/config/Axios.config.ts";
import MainButton from "../common/buttons/MainButton.tsx";
import {useState} from "react";
import {useUserData} from "../../hooks/useUserData.tsx";

export const PlayerHeroMatchUps= () => {
    const [showAllMatchups, setShowAllMatchups] = useState(false);
    const {userGameStats} = useUserData();

    return (
        <Box sx={{flex: "1 1 100%", mt: 3}}>
            <Typography variant="h5" gutterBottom>
                Hero Matchups
            </Typography>
            <Box sx={{display: "flex", flexWrap: "wrap", gap: 2}}>
                {(showAllMatchups ? userGameStats.hero_matchups : userGameStats.hero_matchups.slice(0, 8))
                    .map((hero: any, index: number) => (
                        <Box
                            key={index}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                border: "solid 2px #FDDE2B",
                                transform: "skew(-21deg)",
                                p: 1.5,
                                width: "200px",
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
                                    marginRight: "20px",
                                    transform: "skew(21deg)",
                                    margin: "2px"
                                }}
                            />
                            <Box sx={{transform: "skew(21deg)"}}>
                                <Typography fontWeight="bold">{hero.hero_name}</Typography>
                                <Typography>Matches: {hero.matches}</Typography>
                                <Typography>Winrate: {hero.win_rate}%</Typography>
                            </Box>
                        </Box>
                    ))}
            </Box>
            {userGameStats.hero_matchups.length > 8 && (
                <Box sx={{mt: 2}}>
                    <MainButton onClick={() => setShowAllMatchups(!showAllMatchups)}>
                        <span>{showAllMatchups ? "see less" : "See more"}</span>
                    </MainButton>
                </Box>
            )}
        </Box>
    )
}