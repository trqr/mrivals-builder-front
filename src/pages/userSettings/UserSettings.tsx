import {useState} from "react";
import {Box, Button, MenuItem, Select, Stack, TextField, Typography,} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {useAuth} from "../../hooks/useAuth.tsx";
import type {UserType} from "../../@types/UserType.ts";
import {changeUsername} from "../../api/User.api.ts";
import {Delete} from "@mui/icons-material";
import Page from "../layout/Page.tsx";
import {useUserData} from "../../hooks/useUserData.tsx";
import PasswordChangeBox from "../../componnents/settings/PasswordChangeBox.tsx";
import {deleteAccount} from "../../api/Player.api.ts";
import {toast} from "react-toastify";
import SpotlightCard from "../../componnents/common/cards/spotlightCard/SpotlightCard.tsx";
import {useLoading} from "../../hooks/useLoading.tsx";

const UserSettings = () => {
    const { user, setUser } = useAuth();
    const [currentUser, setCurrentUser] = useState<UserType>(user!);
    const {addAccountName} = useUserData();
    const [newAccountName, setNewAccountName] = useState<string>("")
    const [selectedAccountId, setSelectedAccountId] = useState<number | null>(
        user.accounts.length > 0 ? user.accounts[0].id : null
    );
    const {isPending, startTransition} = useLoading();

    const handleUsernameChange = async () => {
        if (!user?.username.trim()) return;

        await changeUsername(user.username);

        setUser((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                username: user.username,
            };
        });
    };

    const handleAddAccount = async () => {
        if (!newAccountName.trim()) return;
        startTransition(async () => {
            const createdAccount = await addAccountName(newAccountName);

            setUser((prev) => {
                if (!prev) return prev;
                return {
                    ...prev,
                    accounts: [...prev.accounts, createdAccount],
                };
            });
            toast.success("Account added successfully!");
            setNewAccountName("");
            setSelectedAccountId(createdAccount.id);
        })

    };

    const handleDeleteAccount = async (accountId: number) => {
        await deleteAccount(accountId);
        toast.success("Account deleted successfully.");

        setUser((prev) => {
            if (!prev) return prev;
            const updatedAccounts = prev.accounts.filter((acc) => acc.id !== accountId);
            return {
                ...prev,
                accounts: updatedAccounts,
            };
        });

        setSelectedAccountId((prevId) => {
            if (prevId === accountId) {
                return user && user.accounts.length > 1
                    ? user.accounts.find((acc) => acc.id !== accountId)?.id ?? null
                    : null;
            }
            return prevId;
        });
    };

    return (
        <Page title={"Settings"} description={"User Settings"}>
            <Typography variant={"h4"} sx={{textAlign: "center", margin: "30px"}}>Settings</Typography>
            <Box sx={{mx: "auto", mt: 4, display: "flex",flexWrap: "wrap", justifyContent: "center", gap: "20px"}}>
                <SpotlightCard width={"400px"} className="settings-card" spotlightColor="rgba(0, 229, 255, 0.2)">
                    <Typography variant="h5" sx={{mb: 3}} gutterBottom>
                        User Information
                    </Typography>
                    <Stack spacing={3}>
                            <TextField
                                label="Username"
                                value={user!.username}
                                onChange={(e) =>
                                    setUser((prev) => {
                                        if (!prev) return prev;
                                        return { ...prev, username: e.target.value };
                                    })
                                }                                fullWidth
                                error={!user!.username}
                                helperText={!user!.username ? "Please enter your username" : ""}
                                InputProps={{
                                    endAdornment: (
                                        <Button variant={"contained"} size={"small"}
                                                onClick={handleUsernameChange}
                                                disabled={!user!.username}
                                        >
                                            save
                                        </Button>
                                    ),
                                }}
                            />

                        <Box>
                            <Typography variant="subtitle1"  gutterBottom>
                                Marvel Rivals Accounts
                            </Typography>

                            {user!.accounts.length > 0 ? (
                                <Select
                                    fullWidth
                                    size="small"
                                    value={selectedAccountId ?? ""}
                                    onChange={(e) => setSelectedAccountId(Number(e.target.value))}
                                >
                                    {user!.accounts.map((acc) => (
                                        <MenuItem key={acc.id} value={acc.id}>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "space-between",
                                                    width: "100%",
                                                }}
                                            >
                                                {acc.mrivalsAccount}
                                                <IconButton
                                                    size="small"
                                                    onClick={(ev) => {
                                                        ev.stopPropagation();
                                                        handleDeleteAccount(acc.id);
                                                    }}
                                                >
                                                    <Delete fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        </MenuItem>
                                    ))}
                                </Select>
                            ) : (
                                <Typography variant="body2" color="text.secondary">
                                    No accounts yet.
                                </Typography>
                            )}

                            <Box sx={{ display: "flex", mt: 2, gap: 1 }}>
                                <TextField
                                    size="small"
                                    label="Add account"
                                    value={newAccountName}
                                    onChange={(e) => setNewAccountName(e.target.value)}
                                    fullWidth
                                />
                                <Button
                                    variant="contained"
                                    sx={{width: isPending ? "140px" : "auto"}}
                                    size="small"
                                    onClick={handleAddAccount}
                                    disabled={isPending}
                                >
                                    {isPending ? "pending..." : "Add"}
                                </Button>
                            </Box>
                        </Box>

                        <TextField
                            label="Email"
                            value={currentUser.email}
                            disabled
                            fullWidth
                        />

                        <TextField
                            label="Role"
                            value={currentUser.role}
                            disabled
                            fullWidth
                        />
                    </Stack>
                </SpotlightCard>
                <PasswordChangeBox></PasswordChangeBox>
            </Box>
        </Page>

    );
};

export default UserSettings;
