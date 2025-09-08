import Page from "./layout/Page.tsx";
import Box from "@mui/material/Box";
import PlayerSectionBox from "../componnents/common/PlayerSectionBox.tsx";
import { getPlayerStats } from "../api/Player.service.ts";
import {useEffect, useState} from "react";

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

    if (loading) return <Page title="PlayerPage" description="Player Page"><p>Chargement...</p></Page>;
    if (error) return <Page title="PlayerPage" description="Player Page"><p>{error}</p></Page>;
    if (!player) return null;

    return (
        <Page title={"PlayerPage"} description={"Player Page"}>
            <Box
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginLeft: "30px",
            }}>
                <PlayerSectionBox title={"Player info"}>
                    <h1>{player.name}</h1>
                    <p>Level: {player.level}</p>
                    <p>Rank: {player.rank.rank}</p>
                </PlayerSectionBox>
                <PlayerSectionBox title={"Ranked Stats"}>
                    <p>Total Played : {player.overallStats.ranked.total_matches}</p>
                    <p>Total Win : {player.overallStats.ranked.total_wins}</p>
                    <p>Total MVP : {player.overallStats.ranked.total_mvp}</p>
                    <p>Total SVP : {player.overallStats.ranked.total_svp}</p>
                </PlayerSectionBox>
                <PlayerSectionBox title={"Unranked Stats"}>
                    <p>Total Played : {player.overallStats.unranked.total_matches}</p>
                    <p>Total Win : {player.overallStats.unranked.total_wins}</p>
                    <p>Total MVP : {player.overallStats.unranked.total_mvp}</p>
                    <p>Total SVP : {player.overallStats.unranked.total_svp}</p>
                </PlayerSectionBox>
            </Box>
        </Page>
    );
}

export default Player;