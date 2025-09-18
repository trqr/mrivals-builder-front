import Page from "../layout/Page.tsx";
import {Container, Grid} from "@mui/material";
import {useEffect, useState} from "react";
import {deleteAllTeams, deleteTeam, getUserTeamCompos} from "../../api/Compo.api.ts";
import DeleteButton from "../../componnents/common/buttons/DeleteButton.tsx";
import Box from "@mui/material/Box";
import ConfirmationDialog from "../../componnents/common/dialogs/ConfirmationDialog.tsx";
import TeamReview from "../../componnents/userTeamList/TeamReview.tsx";
import Typography from "@mui/material/Typography";

const UserTeamList = () => {
    const [teams, setTeams] = useState<any[]>([]);
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
        <Page title={"Team history"} description={"Team history page"}>
            <Container maxWidth="xl">
            <Typography variant={"h2"} sx={{textAlign: "center", margin: "20px"}}>Your team history</Typography>
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
            </Container>
        </Page>
    );
};

export default UserTeamList;
