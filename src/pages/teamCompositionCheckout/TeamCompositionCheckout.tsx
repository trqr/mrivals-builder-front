import {useCompo} from "../../hooks/useCompo.tsx";
import {Grid,} from "@mui/material";
import {useState} from "react";
import Page from "../layout/Page.tsx";
import Box from "@mui/material/Box";
import {saveCompo} from "../../api/Compo.api.ts";
import TeambuildButton from "../../componnents/common/buttons/TeambuildButton.tsx";
import {useNavigate} from "react-router";
import {toast} from "react-toastify";
import SynergiesTeam from "../../componnents/teamCompositionCheckout/SynergiesTeam.tsx";
import CountersTeam from "../../componnents/teamCompositionCheckout/CountersTeam.tsx";
import HeroCard from "../../componnents/teamCompositionCheckout/HeroCard.tsx";

const TeamCompositionCheckout = () => {
    const { compo } = useCompo();
    const [teamSaved, setTeamSaved] = useState<any | null>(null);
    const navigate = useNavigate();


    return (
        <Page title={"Team review"} description={"Team review"}>
                <HeroCard/>
            <Grid style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "flex-start",
            }}>
                <Box sx={{ margin: "20px", backgroundColor: "rgba(0, 0, 0, 0.2)", padding: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"}}>
                    <SynergiesTeam/>
                </Box>
                <Box sx={{ margin: "20px", backgroundColor: "rgba(0, 0, 0, 0.2)", padding: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}>
                   <CountersTeam/>
                </Box>
                <Box sx={{ transform: "skew(-21deg)", mt: 2, margin: "20px", alignItems: "center"}}>
                    <TeambuildButton
                        style={{marginTop: "20px"}}
                        onClick={async () => {
                            try {
                                const heroesIds = compo.map((hero) => hero.id);
                                const savedTeam = await saveCompo(heroesIds);
                                const navToTeams = await navigate("../user/teams");
                                setTeamSaved(savedTeam);
                                toast.success("Composition sauvegardée avec succès !");
                            } catch (error) {
                                console.error(error);
                                toast.error("Erreur lors de la sauvegarde de la composition.");
                            }
                        }}
                    >
                        Save
                    </TeambuildButton>
                </Box>
            </Grid>
        </Page>
    )
}

export default TeamCompositionCheckout;