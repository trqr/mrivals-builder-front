import {useLoaderData, useRevalidator} from "react-router-dom";
import {useState} from "react";
import {DataGrid, type GridColDef} from "@mui/x-data-grid";
import {Box, Button, MenuItem, Paper, Typography, useTheme} from "@mui/material";
import Select from "@mui/material/Select";
import ConfirmationDialog from "../common/dialogs/ConfirmationDialog.tsx";
import {iconBaseUrl, imageBaseUrl} from "../../api/axios.config.ts";
import {updateHeroesMainRole} from "../../api/Hero.service.ts";
import type {SynergieType} from "../../@types/SynergieType.ts";
import type {MatchUpType} from "../../@types/MatchUpType.ts";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from "@mui/icons-material/Add";
import SynergyUpdateDialog from "../common/dialogs/SynergyUpdateDialog.tsx";
import { addSynergy, updateSynergy} from "../../api/Synergie.api.ts";
import {MatchUpUpdateDialog} from "../common/dialogs/MatchUpUpdateDialog.tsx";
import type {AbilitiesType} from "../../@types/AbilitiesType";
import {addMatchUp, updateMatchUp} from "../../api/MatchUp.api.ts";


const HeroesManagement = () => {
    const heroes = useLoaderData();
    const {revalidate} = useRevalidator();
    const [selectedRows, setSelectedRows] = useState<number[]>([])
    const [selectedRole, setSelectedRole] = useState<string>("");
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState<boolean>(false);
    const [openSynergieDialog, setOpenSynergieDialog] = useState(false);
    const [openMatchUpDialog, setOpenMatchUpDialog] = useState(false);
    const [selectedHeroId, setSelectedHeroId] = useState<number | null>(null);
    const [editingSynergy, setEditingSynergy] = useState<SynergieType | null>(null);
    const [editingMatchUp, setEditingMatchUp] = useState<MatchUpType | null>(null);
    const theme = useTheme();

    const handleAddSynergy = async (allyId: number, value: number, isTeamUp: boolean, synergyId?: number) => {
        if (!selectedHeroId) return;

        if (synergyId) {
            await updateSynergy(synergyId, selectedHeroId, allyId, value, isTeamUp);
        } else {
            await addSynergy(selectedHeroId, allyId, value, isTeamUp);
        }
        await revalidate();
    };

    const handleAddMatchUp = async (counterPickId: number, value: number, matchUpId?: number) => {
        if (!selectedHeroId) return;

        if (matchUpId) {
            await updateMatchUp(matchUpId, selectedHeroId, counterPickId, value);
        } else {
            await addMatchUp(selectedHeroId, counterPickId, value);
        }
        await revalidate();
    };

    const handleSelectionChange = (newSelection: any) => {
        const ids: never[] = Array.from(newSelection.ids)
        setSelectedRows(ids);
    }

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 50},
        {field: 'name', headerName: 'Name', width: 150},
        {field: 'role', headerName: 'Role', width: 150},
        {field: 'isMainTank', headerName: 'Main Tank', width: 100},
        {field: 'isMainHeal', headerName: 'Main Heal', width: 100},
        {field: 'attackType', headerName: 'Attack Type', width: 150},
        {field: 'winRate', headerName: 'Win (%)', width: 80, renderCell: (params) =>
                (params.row.winRate*100).toFixed(2)},

        {
            field: 'abilities',
            headerName: 'Abilities',
            width: 250,
            renderCell: (params) => (
                <Box sx={{display: "flex", flexWrap: "wrap", gap: 1}}>
                    {params.row.abilities?.map((ability: AbilitiesType) => (
                        <img
                            key={ability.id}
                            src={iconBaseUrl+ability.icon}
                            alt={ability.name}
                            title={ability.name}
                            style={{width: 21, height: 21}}
                        />
                    ))}
                </Box>
            )
        },

        {
            field: 'synergies',
            headerName: 'Synergies',
            width: 370,
            renderCell: (params) => (
                <Box sx={{display: "flex", flexDirection: "row", gap: 0.5, alignContent: "center", justifyContent: "flex-start", alignItems: "center"}}>
                    {params.row.synergies?.map((synergie: SynergieType) => (
                        <Box key={synergie.id} sx={{display: "flex",
                            alignContent: "center",
                            justifyContent: "center",
                            alignItems: "center"}}>
                                <img
                                    src={imageBaseUrl + synergie.ally.imageLink}
                                    alt={synergie.ally.name}
                                    title={synergie.ally.name}
                                    style={{width: 38, height: 38, objectFit: "cover", border: "1px solid limegreen",
                                        objectPosition: "center 15%"}}
                                />
                            <Box>
                                <IconButton size="small">
                                    <EditIcon fontSize="inherit" onClick={() => {
                                        setSelectedHeroId(params.row.id);
                                        setEditingSynergy(synergie);
                                        setOpenSynergieDialog(true);
                                    }}/>
                                </IconButton>
                            </Box>
                        </Box>
                    ))}
                    <IconButton>
                        <AddIcon fontSize={"small"} color={"primary"} onClick={() => {
                            setSelectedHeroId(params.row.id);
                            setOpenSynergieDialog(true);
                        }}></AddIcon>
                    </IconButton>
                </Box>
            )
        },

        {
            field: 'matchUps',
            headerName: 'Counters',
            width: 360,
            renderCell: (params) => (
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 0.5,
                    alignContent: "center",
                    justifyContent: "flex-start",
                    alignItems: "center"
                }}>
                    {params.row.matchUps?.map((counter: MatchUpType) => (
                        <Box key={counter.id} sx={{
                            display: "flex",
                            alignContent: "center",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <img
                                src={imageBaseUrl + counter.counterPick.imageLink}
                                alt={counter.counterPick.name}
                                title={counter.counterPick.name}
                                style={{width: 38, height: 38, objectFit: "cover", border: "1px solid red",
                                    objectPosition: "center 15%"}}
                            />
                            <Box>
                                <IconButton size="small">
                                    <EditIcon fontSize="inherit" onClick={() => {
                                        setSelectedHeroId(params.row.id);
                                        setEditingMatchUp(counter);
                                        setOpenMatchUpDialog(true);
                                    }}/>
                                </IconButton>
                            </Box>
                        </Box>
                    ))}
                    <IconButton>
                        <AddIcon fontSize={"small"} color={"primary"} onClick={() => {
                            setSelectedHeroId(params.row.id);
                            setOpenMatchUpDialog(true);
                        }}></AddIcon>
                    </IconButton>
                </Box>
            )
        }
    ];
    const paginationModel = {page: 0, pageSize: 10};

    const handleRoleChaning = async () => {
        await updateHeroesMainRole(selectedRows, selectedRole);
        setOpenConfirmationDialog(false);
        setSelectedRows([]);
        await revalidate();
    };

    return (
        <>


            <Paper sx={{height: 500, width: '100%'}}>
                <DataGrid

                    rows={heroes}
                    columns={columns}
                    initialState={{pagination: {paginationModel}}}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    onRowSelectionModelChange={handleSelectionChange}
                    sx={{border: 0, scrollbarWidth: "thin",
                        scrollbarColor: `${theme.palette.secondary.main} transparent`,}}
                />
            </Paper>


            {selectedRows.length > 0 && (
                <Paper sx={{p: 2, mt: 2}}>
                    <Typography variant="body1">
                        {selectedRows.length} order(s) selected: {selectedRows.join(', ')}
                    </Typography>
                    <Box sx={{mt: 3, display: "flex", alignItems: "center", gap: 2}}>
                        <Select
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            displayEmpty
                            size="small"
                            sx={{minWidth: 200}}
                        >
                            <MenuItem value="">Choose a role</MenuItem>
                            <MenuItem value="none">None</MenuItem>
                            <MenuItem value="mainTank">Main Tank</MenuItem>
                            <MenuItem value="mainHealer">Main Heal</MenuItem>
                        </Select>

                        <Button
                            variant="contained"
                            color="primary"
                            disabled={!selectedRole}
                            onClick={() => setOpenConfirmationDialog(true)}
                        >
                            CHANGE MAIN ROLE
                        </Button>

                    </Box>
                </Paper>
            )}
            <ConfirmationDialog
                isOpen={openConfirmationDialog}
                handleClose={() => setOpenConfirmationDialog(false)}
                handleConfirmationClick={handleRoleChaning}
                dialogText={"Are you sure you want to change main role to this hero(es)?"}
            ></ConfirmationDialog>
            <SynergyUpdateDialog
                open={openSynergieDialog}
                handleClose={() => {
                    setOpenSynergieDialog(false);
                    setEditingSynergy(null);
                }}
                handleSave={handleAddSynergy}
                heroes={heroes}
                editingSynergy={editingSynergy}
            />
            <MatchUpUpdateDialog
                open={openMatchUpDialog}
                handleClose={() => {
                    setOpenMatchUpDialog(false);
                    setEditingMatchUp(null);
                }}
                handleSave={handleAddMatchUp}
                heroes={heroes}
                editingMatchUp={editingMatchUp}
            />
        </>
    )
}

export default HeroesManagement