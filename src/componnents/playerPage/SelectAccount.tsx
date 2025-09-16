import {Alert, Box, Button, MenuItem} from "@mui/material";
import Select from "@mui/material/Select";
import {useEffect, useState} from "react";
import {useUserData} from "../../hooks/useUserData.tsx";
import type {AccountType} from "../../@types/UserType.ts";
import {updatePlayerStats} from "../../api/Player.api.ts";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth.tsx";

const SelectAccount = () => {
    const [message, setMessage] = useState<string>("")
    const [alert, setAlert] = useState<"error" | "success">("success")
    const { setActiveAccount} = useUserData();
    const { user } = useAuth();
    const [selectedOption, setSelectedOption] = useState(user?.accounts[0].id);
    const navigate = useNavigate();

    const updateStats = async () => {
        const updated = await updatePlayerStats();
        if (updated.success) {
            setAlert("success")
            setMessage(updated.message)
        } else {
            setAlert("error")
            setMessage(updated.message)
        }
    }

    useEffect(() => {
        const matchingAcc = user!.accounts.find(account => selectedOption === account.id);
        setActiveAccount(matchingAcc!)
        navigate(`/user/player/${selectedOption}`)
    }, [selectedOption]);

    return (
        <>
            <Box sx={{display: "flex", width: "100%", justifyContent: "space-around", alignItems: "center"}}>
                <Box sx={{ width: "100%"}}>
                    <Select
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                        fullWidth
                        size="small"
                    >
                        {user!.accounts.map((account: AccountType, index: number) => (
                            <MenuItem key={index} value={account.id}>{account.mrivalsAccount}</MenuItem>
                        ))}
                    </Select>
                </Box>
                <Button sx={{margin: "10px"}} variant={"contained"} onClick={updateStats}>update</Button>
                {message && <Alert sx={{margin: "10px"}} severity={alert}>{message}</Alert>}
            </Box>
        </>
    )
}

export default SelectAccount;