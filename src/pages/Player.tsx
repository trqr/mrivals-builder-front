import {useEffect, useState, useTransition} from "react";
import Page from "./layout/Page.tsx";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PlayerSectionBox from "../componnents/common/PlayerSectionBox.tsx";
import { iconBaseUrl, imageBaseUrl } from "../api/axios.config.ts";
import MainButton from "../componnents/button/MainButton.tsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {useLoaderData} from "react-router-dom";

const Player = () => {
    const player = useLoaderData();
    const [error, setError] = useState<string | null>(null);
    const [showAllMatchups, setShowAllMatchups] = useState(false);
    const [showAllRanked, setShowAllRanked] = useState(false);
    const [showAllKDA, setShowAllKDA] = useState(false);
    const theme = createTheme({
        typography: {
            fontFamily: " 'Roboto', sans-serif",
            body1: {
                fontSize: "16px",
                color: "white",
                transform: "skew(21deg)"
            },
            h5: {
                fontWeight: "bold",
                color: "white",
            },
        },
    });

    if (error)
        return (
            <Page title="PlayerPage" description="Player Page">
                <Typography color="error">{error}</Typography>
            </Page>
        );

    if (!player) return null;

    return (
        <Page title="PlayerPage" description="Player Page">
            <ThemeProvider theme={theme}>
                    <Typography variant="h5" fontWeight="bold">
                        {player.player?.name}
                    </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 3,
                    p: 3,
                    marginLeft: "30px"
                }}
            >
                {/* Player Info */}
                <PlayerSectionBox title="Player Info">
                    <Typography>Level: {player.player?.level}</Typography>
                    <Typography>Rank: {player.player?.rank?.rank}</Typography>
                    <Box sx={{ mt: 1 }}>
                        <img
                            src={iconBaseUrl + player.player?.rank?.image}
                            alt="rank icon"
                            style={{ width: "100px", height: "100px", transform: "skew(21deg)" }}
                        />
                    </Box>
                </PlayerSectionBox>

                {/* Ranked Stats */}
                <PlayerSectionBox title="Ranked Stats">
                    <Typography>Total Played: {player.overall_stats?.ranked?.total_matches}</Typography>
                    <Typography>Total Win: {player.overall_stats?.ranked?.total_wins}</Typography>
                    <Typography>Total MVP: {player.overall_stats?.ranked?.total_mvp}</Typography>
                    <Typography>Total SVP: {player.overall_stats?.ranked?.total_svp}</Typography>
                </PlayerSectionBox>

                {/* Unranked Stats */}
                <PlayerSectionBox title="Unranked Stats">
                    <Typography>Total Played: {player.overall_stats?.unranked?.total_matches}</Typography>
                    <Typography>Total Win: {player.overall_stats?.unranked?.total_wins}</Typography>
                    <Typography>Total MVP: {player.overall_stats?.unranked?.total_mvp}</Typography>
                    <Typography>Total SVP: {player.overall_stats?.unranked?.total_svp}</Typography>
                </PlayerSectionBox>

                {/* Team Mates */}
                <Box sx={{ flex: "1 1 300px", mt: 3, marginLeft: "40px" }}>
                    <Typography variant="h6" gutterBottom>
                        Team Mates
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                        {player.team_mates.slice(0, 6).map((mate: any, index: number) => (
                            <Box
                                key={index}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    border: "solid 2px #FDDE2B",
                                    transform: "skew(-21deg)",
                                    p: 1.5,
                                    width: "220px",
                                    boxShadow: 2,
                                }}
                            >
                                <img
                                    src={imageBaseUrl + mate.player_info.player_icon}
                                    alt={mate.player_info.nick_name}
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "50%",
                                        transform: "skew(21deg)",
                                        margin: "2px",
                                        marginRight: "30px",
                                    }}
                                />
                                <Box>
                                    <Typography fontWeight="bold">{mate.player_info.nick_name}</Typography>
                                    <Typography>Matches: {mate.matches}</Typography>
                                    <Typography>Wins: {mate.wins}</Typography>
                                    <Typography>Win Rate: {mate.win_rate}%</Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
            <Box style={{
                display: "flex",
                flexDirection: "row",
            }}>
                {/* Hero Matchups */}
                <Box sx={{ flex: "1 1 100%", mt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Hero Matchups
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                        {(showAllMatchups ? player.hero_matchups : player.hero_matchups.slice(0, 8))
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
                                <Box>
                                    <Typography fontWeight="bold">{hero.hero_name}</Typography>
                                    <Typography>Matches: {hero.matches}</Typography>
                                    <Typography>Winrate: {hero.win_rate}%</Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                    {player.hero_matchups.length > 8 && (
                        <Box sx={{mt:2}}>
                            <MainButton onClick={() => setShowAllMatchups(!showAllMatchups)}>
                                {showAllMatchups ? "see less" : "See more"}
                            </MainButton>
                        </Box>
                    )}
                </Box>
                {/* Heroes Ranked */}
                <Box sx={{ flex: "1 1 100%", mt: 3, marginLeft: "40px" }}>
                    <Typography variant="h6" gutterBottom>
                        Heroes Ranked
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, }}>
                        {(showAllRanked ? player.heroes_ranked : player.heroes_ranked
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
                                    <Box onClick={() => setShowAllKDA(!showAllKDA)} sx={{ cursor: "pointer" }}>
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
                    {player.heroes_ranked.length > 6 && (
                        <Box sx={{mt:2}}>
                            <MainButton onClick={() => setShowAllRanked(!showAllRanked)}>
                                {showAllRanked ? "see less" : "See more"}
                            </MainButton>
                        </Box>
                    )}
                </Box>
            </Box>
            </Box>
            </ThemeProvider>
        </Page>
    );
};

export default Player;
