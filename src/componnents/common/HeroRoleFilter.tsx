import {ToggleButton, ToggleButtonGroup} from "@mui/material";

type FilterProps = {
    role: string;
    setRole: (newRole: string) => void;
}

const HeroRoleFilter = ({role, setRole}: FilterProps) => {

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setRole(newAlignment);
    };

    return (
        <ToggleButtonGroup
            color="primary"
            value={role}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
        >
            <ToggleButton className={"filterButton"} color={"primary"} value="Vanguard">Vanguard</ToggleButton>
            <ToggleButton className={"filterButton"} value="Duelist">Duelist</ToggleButton>
            <ToggleButton className={"filterButton"} value="Strategist">Strategist</ToggleButton>
        </ToggleButtonGroup>)
}
export default HeroRoleFilter