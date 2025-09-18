import {useRevalidator} from "react-router-dom";
import {useState} from "react";
import {DataGrid, type GridColDef} from "@mui/x-data-grid";
import {Box, Button, MenuItem, Paper, Typography} from "@mui/material";
import Select from "@mui/material/Select";
import ConfirmationDialog from "../../common/dialogs/ConfirmationDialog.tsx";
import {banUsers, changeUsersRoleToAdmin, changeUsersRoleToUser} from "../../../api/User.api.ts";
import SpotlightCard from "../../common/cards/spotlightCard/SpotlightCard.tsx";
import theme from "../../../theme/theme.ts";


type UsersManagementProps = {
    users: never[];
}

const UsersManagement = ({users}: UsersManagementProps) => {
    const {revalidate} = useRevalidator();
    const [selectedRows, setSelectedRows] = useState<number[]>([])
    const [selectedRole, setSelectedRole] = useState<string>("");
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState<boolean>(false);

    const handleSelectionChange = (newSelection: any) => {
        const ids: never[] = Array.from(newSelection.ids)
        setSelectedRows(ids);
    }

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 70},
        {
            field: 'username',
            headerName: 'Username',
            width: 100,
        },
        {
            field: 'email',
            headerName: 'User Email',
            width: 200
        },
        {
            field: 'mrivalsAccount',
            headerName: 'Marvel Rivals Account',
            width: 220,
        },
        {field: 'role', headerName: 'Role', width: 100},
        {field: 'banned', headerName: 'Banned', width: 1200}
    ];

    const paginationModel = {page: 0, pageSize: 10};

    const handleRoleChaning = async () => {
        if (!selectedRole) return;
        if (selectedRole === "ADMIN"){
            await changeUsersRoleToAdmin(selectedRows);
        }
        if (selectedRole === "USER"){
            await changeUsersRoleToUser(selectedRows);
        }
        setOpenConfirmationDialog(false);
        setSelectedRows([]);
        await revalidate();
    };

    const handleBan = async () => {
        await banUsers(selectedRows);
        setSelectedRows([]);
        await revalidate();
    }

    return (
        <>
            <Paper sx={{height: 400, width: '100%'}}>
                <DataGrid

                    rows={users}
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
                        },}}                />
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
                            <MenuItem value="USER">User</MenuItem>
                            <MenuItem value="ADMIN">Admin</MenuItem>
                        </Select>

                        <Button
                            variant="contained"
                            color="primary"
                            disabled={!selectedRole}
                            onClick={() => setOpenConfirmationDialog(true)}
                        >
                            CHANGE ROLE
                        </Button>
                        <Button
                            sx={{marginLeft: "30px"}}
                            variant="text"
                            color="warning"
                            onClick={handleBan}
                        >
                            BAN USER(S)
                        </Button>
                    </Box>
                </SpotlightCard>
            )}
            <ConfirmationDialog
                isOpen={openConfirmationDialog}
                handleClose={() => setOpenConfirmationDialog(false)}
                handleConfirmationClick={handleRoleChaning}
                dialogText={"Are you sure you want to change role to this user(s)?"}
            ></ConfirmationDialog>
        </>
    )
}

export default UsersManagement