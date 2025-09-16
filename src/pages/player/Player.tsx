import Page from "../layout/Page.tsx";
import Box from "@mui/material/Box";
import {MainPlayerInfo} from "../../componnents/playerPage/MainPlayerInfo.tsx";
import {TeamMatesInfo} from "../../componnents/playerPage/TeamMatesInfo.tsx";
import {PlayerHeroMatchUps} from "../../componnents/playerPage/PlayerHeroMatchUps.tsx";
import {PlayerHeroesStats} from "../../componnents/playerPage/PlayerHeroesStats.tsx";
import {GraphsBox} from "../../componnents/playerPage/GraphsBox.tsx";
import SelectAccount from "../../componnents/playerPage/SelectAccount.tsx";
import {useLoaderData} from "react-router-dom";
import {LinearProgress} from "@mui/material";
import {useTransition} from "react";

const Player = () => {
    const playerStats = useLoaderData();
    const [isPending, startTransition] = useTransition()

    return (
        <Page title="PlayerPage" description="Player Page">
            <LinearProgress sx={{height: "2px"}} variant={isPending ? "indeterminate" : "determinate"}/>
            <Box sx={{display: "flex", flexDirection: "column", flexWrap: "wrap", margin: "20px 40px"}}>
                <Box sx={{display: "flex", flexDirection: "row", margin: "20px", gap: "60px"}}>
                    <Box sx={{display: "flex", flexDirection: "column", minWidth: "45%", gap: "40px"}}>
                        <SelectAccount startTransition={startTransition} isPending={isPending}></SelectAccount>
                        <MainPlayerInfo playerStats={playerStats}></MainPlayerInfo>
                        <GraphsBox playerStats={playerStats}></GraphsBox>
                    </Box>
                    <Box>
                        <TeamMatesInfo playerStats={playerStats}></TeamMatesInfo>
                        <PlayerHeroesStats playerStats={playerStats}></PlayerHeroesStats>
                    </Box>
                </Box>
                    <PlayerHeroMatchUps playerStats={playerStats}></PlayerHeroMatchUps>

            </Box>
        </Page>
    );
};

export default Player;