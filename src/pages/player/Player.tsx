import Page from "../layout/Page.tsx";
import Box from "@mui/material/Box";
import {MainPlayerInfo} from "../../componnents/playerPage/MainPlayerInfo.tsx";
import {TeamMatesInfo} from "../../componnents/playerPage/TeamMatesInfo.tsx";
import {PlayerHeroMatchUps} from "../../componnents/playerPage/PlayerHeroMatchUps.tsx";
import {PlayerHeroesStats} from "../../componnents/playerPage/PlayerHeroesStats.tsx";
import {GraphsBox} from "../../componnents/playerPage/GraphsBox.tsx";
import {Alert, Button} from "@mui/material";
import {updatePlayerStats} from "../../api/Player.api.ts";
import {useState} from "react";

const Player = () => {
    const [message, setMessage] = useState<string>("")
    const [alert, setAlert] = useState<"error" | "success">("success")

    const updateStats = async () => {
        const updated = await updatePlayerStats();
        if (updated.success) {
            setAlert("success")
        } else {
            setAlert("error")
        }
        setMessage(updated.message)
    }

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
                        <Box sx={{display: "flex"}}>
                            <Button sx={{margin: "10px"}} variant={"contained"} onClick={updateStats}>update</Button>
                            {message && <Alert sx={{margin: "10px"}} severity={alert}>{message}</Alert>}
                        </Box>
                    </Box>
                </Box>
                    <PlayerHeroMatchUps></PlayerHeroMatchUps>
            </Box>
        </Page>
    );
};

export default Player;