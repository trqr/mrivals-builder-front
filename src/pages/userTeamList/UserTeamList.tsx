import Page from "../layout/Page.tsx";
import {Grid} from "@mui/material";
import {startTransition, useEffect, useState} from "react";
import {deleteAllTeams, deleteTeam, getUserTeamCompos} from "../../api/Compo.api.ts";
import type {HeroType} from "../../@types/HeroType";
import DeleteButton from "../../componnents/common/buttons/DeleteButton.tsx";
import Box from "@mui/material/Box";
import {useNavigate} from "react-router";
import {useCompo} from "../../hooks/useCompo.tsx";
import ConfirmationDialog from "../../componnents/common/dialogs/ConfirmationDialog.tsx";
import TeamReview from "../../componnents/common/TeamReview.tsx";
import Typography from "@mui/material/Typography";


const UserTeamList = () => {
    const [teams, setTeams] = useState<any[]>([]);
    const { compo } = useCompo();
    const navigate = useNavigate();
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState<boolean>(false);

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
            <Typography variant={"h2"} sx={{textAlign: "center", margin: "20px"}}>Your teams</Typography>
            {teams.length > 0 ?
                <>
                    <Box
                        style={{
                            boxShadow: "inherit !important",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                        <Grid container spacing={2}>
                            {teams.map((team) =>
                                <Grid size={{xs:12}} key={team.id}>
                                    <TeamReview
                                        team={team}
                                        onDelete={handleDelete}
                                    />
                                </Grid>
                            )}
                        </Grid>
                    </Box>
                <Box sx={{
                    padding: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
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
                </>
                :
                <Typography variant={"h4"} sx={{textAlign: "center", margin: "20px"}}>You dont have any teams yet!</Typography>
            }
        </Page>
    );
};

export default UserTeamList;
