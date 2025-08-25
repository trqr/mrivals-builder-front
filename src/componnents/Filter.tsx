import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import {useState} from "react";

const Filter = () => {
    const [role, setRole] = useState("")

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setRole(newAlignment);
    };

    return (<ToggleButtonGroup
        color="primary"
        value={role}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        sx={{marginTop: "80px"}}
    >
        <ToggleButton className={"filterButton"} value="Vanguard">Vanguard</ToggleButton>
        <ToggleButton className={"filterButton"} value="Duelist">Duelist</ToggleButton>
        <ToggleButton className={"filterButton"} value="Strategist">Strategist</ToggleButton>
    </ToggleButtonGroup>)
}
export default Filter