import type {SynergieType} from "../../../@types/SynergieType.ts";
import Box from "@mui/material/Box";
import {imageBaseUrl} from "../../../api/config/Axios.config.ts";
import {IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

type ColumnsProps = {
    setSelectedHeroId: (id: number) => void;
    setEditingSynergy: (s: SynergieType | null) => void;
    setOpenSynergieDialog: (open: boolean) => void;
    synergie: SynergieType;
    params: any;
};

const SynergyEditBox = ({
                            setSelectedHeroId,
                            setEditingSynergy,
                            setOpenSynergieDialog,
                            synergie,
                            params
                        }: ColumnsProps) => {
    return(
        <Box
            key={synergie.id}
            sx={{
                display: "flex",
                alignItems: "center",
            }}
        >
            <img
                src={imageBaseUrl + synergie.ally.imageLink}
                alt={synergie.ally.name}
                title={synergie.ally.name}
                style={{
                    width: 38,
                    height: 38,
                    objectFit: "cover",
                    border: synergie.isTeamUp ? "1px dashed gold" : "1px solid limegreen",
                    objectPosition: "center 15%",
                }}
            />
            <IconButton size="small" onClick={() => {
                setSelectedHeroId(params.row.id);
                setEditingSynergy(synergie);
                setOpenSynergieDialog(true);
            }}>
                <EditIcon fontSize="inherit"/>
            </IconButton>
        </Box>
    )
}

export default SynergyEditBox