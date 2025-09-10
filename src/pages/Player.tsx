import Page from "./layout/Page.tsx";
import Box from "@mui/material/Box";
import {MainPlayerInfo} from "../componnents/playerPage/MainPlayerInfo.tsx";
import {TeamMatesInfo} from "../componnents/playerPage/TeamMatesInfo.tsx";
import {PlayerHeroMatchUps} from "../componnents/playerPage/PlayerHeroMatchUps.tsx";
import {PlayerHeroesStats} from "../componnents/playerPage/PlayerHeroesStats.tsx";
import {GraphsBox} from "../componnents/playerPage/GraphsBox.tsx";

const Player = () => {

    return (
        <Page title="PlayerPage" description="Player Page">
            <Box sx={{display: "flex", flexDirection: "column", flexWrap: "wrap", margin: "20px 40px"}}>
                <Box sx={{display: "flex", flexDirection: "row", margin: "20px", gap: "60px"}}>
                    <Box sx={{display: "flex", flexDirection: "column", minWidth: "45%", gap: "40px"}}>
                        <MainPlayerInfo></MainPlayerInfo>
                        <GraphsBox></GraphsBox>
                    </Box>
                    <Box>
                        <TeamMatesInfo></TeamMatesInfo>
                        <PlayerHeroesStats></PlayerHeroesStats>
                    </Box>
                </Box>
                    <PlayerHeroMatchUps></PlayerHeroMatchUps>
            </Box>
        </Page>
    );
};

export default Player;