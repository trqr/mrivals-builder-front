import { useEffect, useState } from "react";
import Page from "./layout/Page.tsx";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PlayerSectionBox from "../componnents/common/PlayerSectionBox.tsx";
import { getPlayerStats } from "../api/Player.service.ts";
import { iconBaseUrl, imageBaseUrl } from "../api/axios.config.ts";

const Player = () => {
    const [player, setPlayer] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const query = "White_kb";

        getPlayerStats(query)
            .then((data) => {
                setPlayer(data);
                setLoading(false);
            })
            .catch((err) => {
                setError("Impossible de charger les stats du joueur");
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading)
        return (
            <Page title="PlayerPage" description="Player Page">
                <Typography>Chargement...</Typography>
            </Page>
        );

    if (error)
        return (
            <Page title="PlayerPage" description="Player Page">
                <Typography color="error">{error}</Typography>
            </Page>
        );

    if (!player) return null;

    return (
        <Page title="PlayerPage" description="Player Page">
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 3,
                    p: 3,
                }}
            >
                {/* Player Info */}
                <PlayerSectionBox title="Player Info">
                    <Typography variant="h5" fontWeight="bold">
                        {player.player?.name}
                    </Typography>
                    <Typography>Level: {player.player?.level}</Typography>
                    <Typography>Rank: {player.player?.rank?.rank}</Typography>
                    <Box sx={{ mt: 1 }}>
                        <img
                            src={iconBaseUrl + player.player?.rank?.image}
                            alt="rank icon"
                            style={{ width: "60px", height: "60px" }}
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
                <Box sx={{ flex: "1 1 100%", mt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Team Mates
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                        {player.team_mates.map((mate: any, index: number) => (
                            <Box
                                key={index}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    border: "1px solid #ddd",
                                    borderRadius: 2,
                                    p: 1.5,
                                    width: "220px",
                                    boxShadow: 1,
                                }}
                            >
                                <img
                                    src={imageBaseUrl + mate.player_info.player_icon}
                                    alt={mate.player_info.nick_name}
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "50%",
                                        marginRight: "10px",
                                    }}
                                />
                                <Box>
                                    <Typography fontWeight="bold">{mate.player_info.nick_name}</Typography>
                                    <Typography variant="body2">Matches: {mate.matches}</Typography>
                                    <Typography variant="body2">Wins: {mate.wins}</Typography>
                                    <Typography variant="body2">Win Rate: {mate.win_rate}%</Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>

                {/* Hero Matchups */}
                <Box sx={{ flex: "1 1 100%", mt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Hero Matchups
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                        {player.hero_matchups.map((hero: any, index: number) => (
                            <Box
                                key={index}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    border: "1px solid #ddd",
                                    borderRadius: 2,
                                    p: 1.5,
                                    width: "200px",
                                    boxShadow: 1,
                                }}
                            >
                                <img
                                    src={iconBaseUrl + hero.hero_thumbnail}
                                    alt={hero.hero_name}
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        borderRadius: "50%",
                                        marginRight: "10px",
                                    }}
                                />
                                <Box>
                                    <Typography fontWeight="bold">{hero.hero_name}</Typography>
                                    <Typography variant="body2">Matches: {hero.matches}</Typography>
                                    <Typography variant="body2">Winrate: {hero.win_rate}%</Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>

                {/* Heroes Ranked */}
                <Box sx={{ flex: "1 1 100%", mt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Heroes Ranked
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                        {player.heroes_ranked
                            .slice()
                            .sort((a: any, b: any) => b.matches - a.matches)
                            .map((hero: any, index: number) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        border: "1px solid #ddd",
                                        borderRadius: 2,
                                        p: 1.5,
                                        width: "240px",
                                        boxShadow: 1,
                                    }}
                                >
                                    <img
                                        src={iconBaseUrl + hero.hero_thumbnail}
                                        alt={hero.hero_name}
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            borderRadius: "50%",
                                            marginRight: "10px",
                                        }}
                                    />
                                    <Box>
                                        <Typography fontWeight="bold">{hero.hero_name}</Typography>
                                        <Typography variant="body2">
                                            KDA: {hero.kills}/{hero.deaths}/{hero.assists}
                                        </Typography>
                                        <Typography variant="body2">Matches: {hero.matches}</Typography>
                                        <Typography variant="body2">Wins: {hero.wins}</Typography>
                                        <Typography variant="body2">MVP: {hero.mvp}</Typography>
                                        <Typography variant="body2">SVP: {hero.svp}</Typography>
                                    </Box>
                                </Box>
                            ))}
                    </Box>
                </Box>
            </Box>
        </Page>
    );
};

export default Player;
