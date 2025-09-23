import Page from "../layout/Page.tsx";
import Box from "@mui/material/Box";
import {MainPlayerInfo} from "../../componnents/playerPage/MainPlayerInfo.tsx";
import {TeamMatesInfo} from "../../componnents/playerPage/TeamMatesInfo.tsx";
import {PlayerHeroMatchUps} from "../../componnents/playerPage/PlayerHeroMatchUps.tsx";
import {PlayerHeroesStats} from "../../componnents/playerPage/PlayerHeroesStats.tsx";
import {GraphsBox} from "../../componnents/playerPage/GraphsBox.tsx";
import SelectAccount from "../../componnents/playerPage/SelectAccount.tsx";
import {useLoaderData} from "react-router-dom";
import {Grid} from "@mui/material";

const Player = () => {
    const playerStats = useLoaderData();

    return (
        <Page title="PlayerPage" description="Player Page">
            <SelectAccount></SelectAccount>
            <Box sx={{display: "flex", flexDirection: "column", flexWrap: "wrap", justifyContent: "center", alignItems: "center"}}>
                <Grid container spacing={5}>
                    <Grid size={{xs: 12, md: 12, xl: 6}}>
                        <MainPlayerInfo playerStats={playerStats}></MainPlayerInfo>
                        <GraphsBox playerStats={playerStats}></GraphsBox>
                    </Grid>
                    <Grid size={{xs: 12, md: 12, xl: 6}}>
                            <TeamMatesInfo playerStats={playerStats}></TeamMatesInfo>
                            <PlayerHeroesStats playerStats={playerStats}></PlayerHeroesStats>
                    </Grid>
                </Grid>
                <PlayerHeroMatchUps playerStats={playerStats}></PlayerHeroMatchUps>
            </Box>
        </Page>
    );
};

export default Player;