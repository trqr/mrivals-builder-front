import Box from "@mui/material/Box";
import {imageBaseUrl} from "../../../api/config/Axios.config.ts";
import {IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import type {MatchUpType} from "../../../@types/MatchUpType.ts";

type MatchUpEditBoxProps = {
    setSelectedHeroId: (id: number) => void;
    setEditingMatchUp: (s: MatchUpType | null) => void;
    setOpenMatchUpDialog: (open: boolean) => void;
    matchUp: MatchUpType;
    params: any;
};

const MatchUpEditBox = ({
                            setSelectedHeroId,
                            setEditingMatchUp,
                            setOpenMatchUpDialog,
                            matchUp,
                            params
                        }: MatchUpEditBoxProps) => {
    return (
        <Box
            key={matchUp.id}
            sx={{
                display: "flex",
                alignItems: "center",
            }}
        >
            <img
                src={imageBaseUrl + matchUp.ally.imageLink}
                alt={matchUp.ally.name}
                title={matchUp.ally.name}
                style={{
                    width: 38,
                    height: 38,
                    objectFit: "cover",
                    border: "1px solid limegreen",
                    objectPosition: "center 15%",
                }}
            />
            <IconButton size="small" onClick={() => {
                setSelectedHeroId(params.row.id);
                setEditingMatchUp(matchUp);
                setOpenMatchUpDialog(true);
            }}>
                <EditIcon fontSize="inherit"/>
            </IconButton>
        </Box>
    )
}

export default MatchUpEditBox