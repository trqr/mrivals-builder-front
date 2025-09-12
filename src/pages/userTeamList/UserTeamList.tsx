import Page from "../layout/Page.tsx";
import {Button, Card, CardMedia, Grid} from "@mui/material";
import {startTransition, useEffect, useState} from "react";
import {imageBaseUrl} from "../../api/config/Axios.config.ts";
import {deleteAllTeams, deleteTeam, getUserTeamCompos} from "../../api/Compo.api.ts";
import Typography from "@mui/material/Typography";
import type {HeroType} from "../../@types/HeroType";
import MainButton from "../../componnents/common/buttons/MainButton.tsx";
import DeleteButton from "../../componnents/common/buttons/DeleteButton.tsx";
import Box from "@mui/material/Box";
import {useNavigate} from "react-router";
import {useCompo} from "../../hooks/useCompo.tsx";



const UserTeamList = () => {
    const [teams, setTeams] = useState<any[]>([]);
    const { compo } = useCompo();
    const navigate = useNavigate();
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState<boolean>(false);

    const handleNavigateToTeam = () => {
        startTransition(() => {
            const heroesIds = compo.map((hero: HeroType) => hero?.id);
            navigate("../../team/{team.id}");
        });
    };

    const fetchTeams = async () => {
        const fetchedTeams = await getUserTeamCompos();
        setTeams(fetchedTeams);
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    const handleDelete = async (teamId: number) => {
        await deleteTeam(teamId);
        fetchTeams();
    };

    const handleDeleteAll = async () => {
        await deleteAllTeams();
        fetchTeams();
    };

    return (
        <Page title={"Team list"} description={"Team list page"}>
                <Box
                style={{
                    boxShadow: "inherit !important",
                }}>
            <Grid container spacing={2}>
                {teams.map((team) => (
                    <Grid item xs={12} key={team.id}>
                        <TeamReview
                            team={team}
                            onDelete={handleDelete}
                            onNavigate={handleNavigateToTeam}
                        />
                    </Grid>
                ))}
            </Grid>
                </Box>
                <Box sx={{ padding: "10px",
                display: "flex",
                alignItems: "center",}}>
                    <DeleteButton onClick={() => setOpenConfirmationDialog(true)}>
                        Delete All
                    </DeleteButton>
                    <ConfirmationDialog
                        isOpen={openConfirmationDialog}
                        handleClose={() => setOpenConfirmationDialog(false)}
                        handleConfirmationClick={() => handleDeleteAll()}
                        dialogText={"Are you sure you want to delete all teams?"}
                    ></ConfirmationDialog>
                </Box>
        </Page>
    );
};

export default UserTeamList;
