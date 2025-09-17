import {useState} from "react";
import {DataGrid, type GridColDef} from "@mui/x-data-grid";
import {Box, Button, MenuItem, Paper, Typography, useTheme} from "@mui/material";
import Select from "@mui/material/Select";
import ConfirmationDialog from "../../common/dialogs/ConfirmationDialog.tsx";
import {updateHeroesMainRole} from "../../../api/Hero.api.ts";
import type {SynergieType} from "../../../@types/SynergieType.ts";
import type {MatchUpType} from "../../../@types/MatchUpType.ts";
import SynergyUpdateDialog from "../../common/dialogs/SynergyUpdateDialog.tsx";
import {addSynergy, updateSynergy} from "../../../api/Synergie.api.ts";
import {MatchUpUpdateDialog} from "../../common/dialogs/MatchUpUpdateDialog.tsx";
import {addMatchUp, updateMatchUp} from "../../../api/MatchUp.api.ts";
import {useData} from "../../../hooks/useData.tsx";
import {HeroesColumns} from "./HeroesColumns.tsx";
import SpotlightCard from "../../common/cards/spotlightCard/SpotlightCard.tsx";


const HeroesManagement = () => {
    const {heroes, refreshHeroes} = useData();
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
        await refreshHeroes();
    };

    const handleAddMatchUp = async (counterPickId: number, value: number, matchUpId?: number) => {
        if (!selectedHeroId) return;

        if (matchUpId) {
            await updateMatchUp(matchUpId, selectedHeroId, counterPickId, value);
        } else {
            await addMatchUp(selectedHeroId, counterPickId, value);
        }
        await refreshHeroes();
    };

    const handleSelectionChange = (newSelection: any) => {
        const ids: never[] = Array.from(newSelection.ids)
        setSelectedRows(ids);
    }

    const columns: GridColDef[] = HeroesColumns({
        setSelectedHeroId,
        setEditingSynergy,
        setOpenSynergieDialog,
        setEditingMatchUp,
        setOpenMatchUpDialog,
    });

    const paginationModel = {page: 0, pageSize: 5};

    const handleRoleChaning = async () => {
        await updateHeroesMainRole(selectedRows, selectedRole);
        setOpenConfirmationDialog(false);
        setSelectedRows([]);
        await refreshHeroes();
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
                    sx={{border: "0", scrollbarWidth: "thin",
                        scrollbarColor: `${theme.palette.secondary.main} transparent`,
                        "& .MuiDataGrid-cell": {
                            display: "flex",
                            alignItems: "center",
                        },

                        "& .MuiDataGrid-row:nth-of-type(even)": {
                            backgroundColor: "rgba(255, 255, 0, 0.05)",
                        },
                        "& .MuiDataGrid-row:nth-of-type(odd)": {
                            backgroundColor: "transparent",
                        },

                        "& .MuiDataGrid-row:hover": {
                            backgroundColor: "rgba(255, 255, 0, 0.15) !important",
                        },
                        "& .MuiDataGrid-columnHeaders, & .MuiDataGrid-columnHeader": {
                            backgroundColor: `${theme.palette.background.paper} !important`,
                        },
                        "& .MuiDataGrid-columnHeaderTitle": {
                            color: `${theme.palette.common.white} !important`,
                            textAlign: "center",
                            fontWeight: "600",
                        },}}
                    rowHeight={70}


                />
            </Paper>

            {selectedRows.length > 0 && (
                <SpotlightCard width={"auto"} className="settings-card" spotlightColor="rgba(0, 229, 255, 0.2)">
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
                </SpotlightCard>
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