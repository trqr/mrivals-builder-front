import Page from "./layout/Page.tsx";
import Box from "@mui/material/Box";
import { fakePlayer } from "./FakePlayer.tsx";
import PlayerSectionBox from "../componnents/common/PlayerSectionBox.tsx";

const Player = () => {
    const player = fakePlayer;

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