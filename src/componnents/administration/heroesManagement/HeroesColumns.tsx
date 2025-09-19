import {Box, IconButton} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import type {SynergieType} from "../../../@types/SynergieType.ts";
import type {MatchUpType} from "../../../@types/MatchUpType.ts";
import type {AbilitiesType} from "../../../@types/AbilitiesType";
import {iconBaseUrl} from "../../../api/config/Axios.config.ts";
import SynergyEditBox from "./SynergyEditBox.tsx";
import MatchUpEditBox from "./MatchUpEditBox.tsx";

type ColumnsProps = {
    setSelectedHeroId: (id: number) => void;
    setEditingSynergy: (s: SynergieType | null) => void;
    setOpenSynergieDialog: (open: boolean) => void;
    setEditingMatchUp: (m: MatchUpType | null) => void;
    setOpenMatchUpDialog: (open: boolean) => void;
};

export const HeroesColumns = ({
                                     setSelectedHeroId,
                                     setEditingSynergy,
                                     setOpenSynergieDialog,
                                     setEditingMatchUp,
                                     setOpenMatchUpDialog,
                                 }: ColumnsProps) => [
    {field: "id", headerName: "ID", width: 50},
    {field: "name", headerName: "Name", width: 150},
    {field: "role", headerName: "Role", width: 150},
    {field: "isMainTank", headerName: "Main Tank", width: 100},
    {field: "isMainHeal", headerName: "Main Heal", width: 100},
    {field: "attackType", headerName: "Attack Type", width: 150},
    {
        field: "winRate",
        headerName: "Win (%)",
        width: 80,
        renderCell: (params) => (params.row.winRate * 100).toFixed(2),
    },
    {
        field: "abilities",
        headerName: "Abilities",
        width: 250,
        renderCell: (params) => (
            <Box sx={{display: "flex", flexWrap: "wrap", gap: 1}}>
                {params.row.abilities?.map((ability: AbilitiesType) => (
                    <img
                        key={ability.id}
                        src={iconBaseUrl + ability.icon}
                        alt={ability.name}
                        title={ability.name}
                        style={{width: 21, height: 21}}
                    />
                ))}
            </Box>
        ),
    },
    {
        field: "synergies",
        headerName: "Synergies",
        width: 370,
        type: "element",
        renderCell: (params) => (
            <Box sx={{display: "flex", flexDirection: "row", alignContent: "center", gap: 0.5}}>
                {params.row.synergies?.map((synergie: SynergieType) => (
                    <SynergyEditBox setEditingSynergy={setEditingSynergy} setOpenSynergieDialog={setOpenSynergieDialog}
                                    setSelectedHeroId={setSelectedHeroId} params={params} synergie={synergie}></SynergyEditBox>
                ))}
                <IconButton onClick={() => {
                    setSelectedHeroId(params.row.id);
                    setOpenSynergieDialog(true);
                }}>
                    <AddIcon fontSize={"small"} color={"primary"}/>
                </IconButton>
            </Box>
        ),
    },
    {
        field: "matchUps",
        headerName: "Counters",
        width: 500,
        renderCell: (params) => (
            <Box sx={{display: "flex", flexDirection: "row", gap: 0.5}}>
                {params.row.matchUps?.map((counter: MatchUpType) => (
                    <MatchUpEditBox setEditingMatchUp={setEditingMatchUp} setSelectedHeroId={setSelectedHeroId}
                                    setOpenMatchUpDialog={setOpenMatchUpDialog} params={params} matchUp={counter}></MatchUpEditBox>
                ))}
                <IconButton onClick={() => {
                    setSelectedHeroId(params.row.id);
                    setOpenMatchUpDialog(true);
                }}>
                    <AddIcon fontSize={"small"} color={"primary"}/>
                </IconButton>
            </Box>
        ),
    },
];
