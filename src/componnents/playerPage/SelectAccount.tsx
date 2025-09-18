import {Alert, Box, Button, FormControl, FormHelperText, InputLabel, MenuItem} from "@mui/material";
import Select from "@mui/material/Select";
import {useEffect, useState} from "react";
import {useUserData} from "../../hooks/useUserData.tsx";
import type {AccountType} from "../../@types/UserType.ts";
import {updatePlayerStats} from "../../api/Player.api.ts";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth.tsx";
import {useLoading} from "../../hooks/useLoading.tsx";

const SelectAccount = () => {
    const [message, setMessage] = useState<string>("")
    const [alert, setAlert] = useState<"error" | "success">("success")
    const { setActiveAccount} = useUserData();
    const { user } = useAuth();
    const {isPending, startTransition} = useLoading()
    const [selectedOption, setSelectedOption] = useState(user?.accounts[0].id);
    const navigate = useNavigate();

    const updateStats = async () => {
        startTransition( async () => {
            const updated = await updatePlayerStats();
            if (updated.success) {
                setAlert("success")
                setMessage(updated.message)
            } else {
                setAlert("error")
                setMessage(updated.message)
            }
        })
    }

    useEffect(() => {
        const matchingAcc = user!.accounts.find(account => selectedOption === account.id);
        setActiveAccount(matchingAcc!)
        navigate(`/user/player/${selectedOption}`)
    }, [selectedOption]);

    return (
        <>
            <Box sx={{display: "flex", width: "100%", justifyContent: "center", alignItems: "center", margin: "20px"}}>
                <Box sx={{ width: "300px"}}>
                    <FormControl fullWidth size="medium">
                        <Select
                            labelId="account-select-label"
                            value={selectedOption}
                            onChange={(e) => setSelectedOption(e.target.value)}
                        >
                            {user!.accounts.map((account: AccountType, index: number) => (
                                <MenuItem key={index} value={account.id}>
                                    {account.mrivalsAccount}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>Choose your MR account</FormHelperText>
                    </FormControl>
                </Box>
                <Button sx={{margin: "10px"}}
                        size={"large"}
                        variant={"contained"}
                        onClick={updateStats}
                        disabled={isPending}
                >{isPending ? "updating..." : "update"}
                </Button>
                {message && <Alert sx={{margin: "10px"}} severity={alert}>{message}</Alert>}
            </Box>
        </>
    )
}

export default SelectAccount;