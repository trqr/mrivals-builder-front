import {Card, CardContent, CardMedia, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import DeleteButton from "../common/buttons/DeleteButton.tsx";
import MainButton from "../common/buttons/MainButton.tsx";
import type {HeroType} from "../../@types/HeroType";
import {imageBaseUrl} from "../../api/config/Axios.config.ts";
import ConfirmationDialog from "../common/dialogs/ConfirmationDialog.tsx";
import {useState} from "react";
import Box from "@mui/material/Box";
import {useNavigate} from "react-router";
import SpotlightCard from "../common/cards/spotlightCard/SpotlightCard.tsx";


type TeamReviewProps = {
    team: {
        id: number;
        heroes: HeroType[];
    };
    onDelete: (id: number) => void;
};

const TeamReview = ({team, onDelete,}: TeamReviewProps) => {

    const navigate = useNavigate();
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState<boolean>(false);

    const avgTeamWinRate = () => {
        let heroesTotalRate = 0
        team.heroes.forEach((hero) => {
            heroesTotalRate += hero.winRate;
        })
        return (heroesTotalRate / 6 * 100).toFixed(2)
    }

    return (
        <>
                <SpotlightCard width={"auto"} className="settings-card" spotlightColor="rgba(0, 229, 255, 0.2)">
                <Box style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <Stack direction="row" spacing={2} sx={{ justifyContent: "center" , alignItems: "center", flexWrap: "wrap"}}>
                        {team.heroes.map((hero) => (
                            <Card sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                <CardMedia key={hero.id} sx={{
                                    padding: "10px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "100px",
                                    height: "160px",
                                    objectFit: "cover",
                                    margin: "5px",
                                }}
                                           image={imageBaseUrl + hero.imageLink}
                                >
                                </CardMedia>
                                <CardContent>
                                    <Box
                                        style={{
                                            border: "0.5px dashed #FDDE2B",
                                            transform: "skew(-21deg)"
                                        }}>
                                        <Typography sx={{ display: {xs: "none", md: "block"},padding: "5px", transform: "skew(21deg)"}}>
                                            Winrate: {(hero.winRate * 100).toFixed(1)}%
                                        </Typography>
                                        <Typography sx={{ display: {md: "none"},padding: "5px", transform: "skew(21deg)"}}>
                                            WR: {(hero.winRate * 100).toFixed(1)}%
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </Stack>
                    <Typography sx={{padding: "5px", fontSize: "20px"}}>Average win
                        rate: {avgTeamWinRate()} %</Typography>
                    <Stack direction={"row"} justifyContent={"space-between"} width={300}>
                        <MainButton onClick={() => navigate(`/team/${team.id}`)}>Details</MainButton>
                        <DeleteButton onClick={() => setOpenConfirmationDialog(true)}>Delete</DeleteButton>
                    </Stack>
                </Box>
                </SpotlightCard>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        padding: "10px",
                    }}
                >
                    <ConfirmationDialog
                        isOpen={openConfirmationDialog}
                        handleClose={() => setOpenConfirmationDialog(false)}
                        handleConfirmationClick={() => onDelete(team.id)}
                        dialogText={"Are you sure you want to delete this team ?"}
                    ></ConfirmationDialog>
                </div>
        </>
    );
};

export default TeamReview;
