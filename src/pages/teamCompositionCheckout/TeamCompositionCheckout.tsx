import {Container, Grid, Stack,} from "@mui/material";
import Page from "../layout/Page.tsx";
import TeambuildButton from "../../componnents/common/buttons/TeambuildButton.tsx";
import {useNavigate} from "react-router";
import SynergiesTeam from "../../componnents/teamCompositionCheckout/SynergiesTeam.tsx";
import CountersTeam from "../../componnents/teamCompositionCheckout/CountersTeam.tsx";
import HeroCard from "../../componnents/teamCompositionCheckout/HeroCard.tsx";
import {useLoaderData,} from "react-router-dom";
import StreamingAiResponse from "../../componnents/teamCompositionCheckout/StreamingAiResponse.tsx";
import SpotlightCard from "../../componnents/common/cards/spotlightCard/SpotlightCard.tsx";
import Typography from "@mui/material/Typography";

const TeamCompositionCheckout = () => {
    const navigate = useNavigate();
    const compo = useLoaderData();

    const setPromptWithHeroesNames = () => {
        const heroesNames = compo.heroes.map(hero => hero.name).join(", ");
        return `What do you think about this composition? ${heroesNames}`;
    }


    return (
        <Page title={"Team review"} description={"Team review"}>
            <Container maxWidth={"xl"}>
                <Typography variant={"h4"} sx={{textAlign: "center", margin: "30px"}}>Team composition summary</Typography>
                <HeroCard heroes={compo.heroes}/>
                <Grid container spacing={3} style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "20px"
                }}>
                    <Grid size={3.5}>
                        <SpotlightCard width={"auto"} className="settings-card" spotlightColor="rgba(0, 229, 255, 0.2)">
                            <SynergiesTeam heroes={compo.heroes}/>
                        </SpotlightCard>
                        <SpotlightCard width={"auto"} className="settings-card" spotlightColor="rgba(0, 229, 255, 0.2)">
                            <CountersTeam heroes={compo.heroes}/>
                        </SpotlightCard>
                    </Grid>
                    <Grid size={6}>
                        <StreamingAiResponse prompt={setPromptWithHeroesNames()}></StreamingAiResponse>
                    </Grid>
                    <Grid size={2}>
                        <Stack sx={{transform: "skew(-21deg)", mt: 2, margin: "20px", alignItems: "center", justifyContent: "center"}}>
                            <TeambuildButton
                                style={{marginTop: "20px"}}
                                onClick={() => navigate("../user/teams")}
                            >
                                Save
                            </TeambuildButton>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Page>
    )
}

export default TeamCompositionCheckout;