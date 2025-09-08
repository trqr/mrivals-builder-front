import Page from "./layout/Page.tsx";
import Box from "@mui/material/Box";
import { fakePlayer } from "./FakePlayer.tsx";

const Player = () => {
    const player = fakePlayer;

    return (
        <Page title={"PlayerPage"} description={"PlayerPage"}>
            <Box>
                <h1>{player.name}</h1>
                <p>Level: {player.level}</p>
                <p>Rank: {player.rank.rank}</p>
            </Box>
            <Box>
                <p>{player.info.rank_game_season["1001002"].diff_score}</p>
                <p>{player.info.rank_game_season["1001003"].diff_score}</p>
                <p>{player.info.rank_game_season["1001004"].diff_score}</p>
            </Box>
        </Page>
    );
}

export default Player;