import {Grid, LinearProgress,} from "@mui/material";
import Page from "../layout/Page.tsx";
import Box from "@mui/material/Box";
import TeambuildButton from "../../componnents/common/buttons/TeambuildButton.tsx";
import {useNavigate} from "react-router";
import SynergiesTeam from "../../componnents/teamCompositionCheckout/SynergiesTeam.tsx";
import CountersTeam from "../../componnents/teamCompositionCheckout/CountersTeam.tsx";
import HeroCard from "../../componnents/teamCompositionCheckout/HeroCard.tsx";
import {useLoaderData,} from "react-router-dom";
import {useTransition} from "react";

const TeamCompositionCheckout = () => {
    const navigate = useNavigate();
    const compo = useLoaderData();
    const [isPending, startTransition] = useTransition();

    return (
        <Page title={"Team review"} description={"Team review"}>
            <LinearProgress sx={{height: "2px"}} variant={isPending ? "indeterminate" : "determinate"}/>
                <HeroCard heroes={compo.heroes}/>
            <Grid style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "flex-start",
            }}>
                <Box sx={{ margin: "20px", backgroundColor: "rgba(0, 0, 0, 0.2)", padding: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"}}>
                    <SynergiesTeam heroes={compo.heroes}/>
                </Box>
                <Box sx={{ margin: "20px", backgroundColor: "rgba(0, 0, 0, 0.2)", padding: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}>
                   <CountersTeam heroes={compo.heroes}/>
                </Box>
                <Box sx={{ transform: "skew(-21deg)", mt: 2, margin: "20px", alignItems: "center"}}>
                    <TeambuildButton
                        style={{marginTop: "20px"}}
                        onClick={() => navigate("../user/teams")}
                    >
                        Save
                    </TeambuildButton>
                </Box>
            </Grid>
        </Page>
    )
}

export default TeamCompositionCheckout;