import {Container, Typography, Grid, Button, Card, CardContent} from "@mui/material";
import {updateHeroes} from "../../../api/Hero.api.ts";
import { updateMaps } from "../../../api/Map.api.ts";
import {updateLeaderboard} from "../../../api/Leaderboard.api.ts";
import SpotlightCard from "../../common/cards/spotlightCard/SpotlightCard.tsx";

export const DataManagement = () => {
    const handleUpdateHeroes = async () => {
        await updateHeroes()
    };

    const handleUpdateMaps = async () => {
        await updateMaps()
    };

    const handleUpdateLeaderboards = async () => {
        await updateLeaderboard()
    };

    const handleUpdateStats = () => {

    };

    return (
        <Container maxWidth="md" sx={{mt: 4}}>
            <Typography variant="h4" gutterBottom>
                Data Management
            </Typography>
            <Typography variant="body1" sx={{mb: 3}}>
                Use the buttons below to update game data from the server.
            </Typography>

            <Grid container spacing={3}>
                <Grid size={{xs: 12, sm: 6}}>
                    <SpotlightCard width={"auto"} className="settings-card" spotlightColor="rgba(0, 229, 255, 0.2)">
                            <Typography variant="h6" sx={{textAlign: "center"}}>Heroes</Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{mt: 2}}
                                onClick={handleUpdateHeroes}
                            >
                                Update Heroes
                            </Button>
                    </SpotlightCard>
                </Grid>

                <Grid size={{xs: 12, sm: 6}}>
                        <SpotlightCard width={"auto"} className="settings-card" spotlightColor="rgba(0, 229, 255, 0.2)">
                            <Typography variant="h6" sx={{textAlign: "center"}}>Maps</Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{mt: 2}}
                                onClick={handleUpdateMaps}
                            >
                                Update Maps
                            </Button>
                        </SpotlightCard>
                </Grid>

                <Grid size={{xs: 12, sm: 6}}>
                    <SpotlightCard width={"auto"} className="settings-card" spotlightColor="rgba(0, 229, 255, 0.2)">
                            <Typography variant="h6" sx={{textAlign: "center"}}>Leaderboards</Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{mt: 2}}
                                onClick={handleUpdateLeaderboards}
                            >
                                Update Leaderboards
                            </Button>
                    </SpotlightCard>
                </Grid>

                <Grid size={{xs: 12, sm: 6}}>
                    <SpotlightCard width={"auto"} className="settings-card" spotlightColor="rgba(0, 229, 255, 0.2)">
                            <Typography variant="h6" sx={{textAlign: "center"}}>Stats</Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{mt: 2}}
                                onClick={handleUpdateStats}
                                disabled
                            >
                                Update Stats
                            </Button>
                    </SpotlightCard>
                </Grid>
            </Grid>
        </Container>
    );
};