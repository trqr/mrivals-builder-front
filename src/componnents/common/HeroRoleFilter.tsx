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
            <ToggleButton
                value="Vanguard"
                sx={{
                    fontSize: {xs: "0.7rem", sm: "0.85rem"},
                    px: {xs: 1, sm: 2},
                    py: {xs: 0.5, sm: 1},
                    minWidth: {xs: 50, sm: 80}
                }}
            >
                Vanguard
            </ToggleButton>

            <ToggleButton
                value="Duelist"
                sx={{
                    fontSize: {xs: "0.7rem", sm: "0.85rem"},
                    px: {xs: 1, sm: 2},
                    py: {xs: 0.5, sm: 1},
                    minWidth: {xs: 50, sm: 80}
                }}
            >
                Duelist
            </ToggleButton>

            <ToggleButton
                value="Strategist"
                sx={{
                    fontSize: {xs: "0.7rem", sm: "0.85rem"},
                    px: {xs: 1, sm: 2},
                    py: {xs: 0.5, sm: 1},
                    minWidth: {xs: 50, sm: 80}
                }}
            >
                Strategist
            </ToggleButton>
        </ToggleButtonGroup>
    )
}
export default HeroRoleFilter