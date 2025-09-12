import { Card, CardMedia } from "@mui/material";
import Typography from "@mui/material/Typography";
import DeleteButton from "../common/buttons/DeleteButton.tsx";
import MainButton from "../common/buttons/MainButton.tsx";
import type { HeroType } from "../../@types/HeroType";
import {imageBaseUrl} from "../../api/config/Axios.config.ts";
import ConfirmationDialog from "./dialogs/ConfirmationDialog.tsx";
import {startTransition, useState} from "react";
import Box from "@mui/material/Box";
import {useNavigate} from "react-router";
import {useCompo} from "../../hooks/useCompo.tsx";


type TeamReviewProps = {
    team: {
        id: number;
        heroes: HeroType[];
    };
    onDelete: (id: number) => void;
};

const TeamReview = ({ team, onDelete,}: TeamReviewProps) => {

    const { compo } = useCompo();
    const navigate = useNavigate();
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState<boolean>(false);

    const onNavigate = async () => {
        startTransition(async () => {
            const heroesIds = compo.map((hero: HeroType) => hero?.id);
            const compoDetail = await navigate("../../team/{team.id}", {state: {compo}});
        });
    }

    return (
        <Card>
            <div style={{ display: "flex", flexDirection: "row" }}>
                {team.heroes.map((hero) => (
                    <CardMedia key={hero.id} sx={{
                        padding: "10px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <img
                            src={imageBaseUrl + hero.imageLink}
                            alt={hero.name}
                            style={{
                                width: "100px",
                                height: "160px",
                                objectFit: "cover",
                                margin: "5px",
                            }}
                        />
                        <Box
                        style={{
                            border: "2px solid #FDDE2B",
                            transform: "skew(-21deg)"
                        }}>
                        <Typography sx={{ padding: "5px" }}>
                            Winrate: {(hero.winRate * 100).toFixed(1)}%
                        </Typography>
                        </Box>
                    </CardMedia>
                ))}
            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: "10px",
                }}
            >
                <DeleteButton onClick={() => setOpenConfirmationDialog(true)}>Delete</DeleteButton>
                <ConfirmationDialog
                    isOpen={openConfirmationDialog}
                    handleClose={() => setOpenConfirmationDialog(false)}
                    handleConfirmationClick={() => onDelete(team.id)}
                    dialogText={"Are you sure you want to delete this team ?"}
                ></ConfirmationDialog>
                <Typography sx={{ padding: "5px", fontSize: "20px" }}>{team.id}</Typography>
                <MainButton onClick={onNavigate}>Details</MainButton>
            </div>
        </Card>
    );
};

export default TeamReview;
