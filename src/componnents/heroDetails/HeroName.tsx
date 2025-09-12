import {Button} from "@mui/material";
import Box from "@mui/material/Box";
import type {HeroType} from "../../@types/HeroType";
import {useNavigate} from "react-router-dom";

interface AbilitiesProps {
    hero: HeroType;
}

const HeroName = ({hero}: AbilitiesProps) => {
    const navigate = useNavigate();

    return (
        <Box>
            <h1>{hero.name}</h1>
            <h2>{hero.role}</h2>
            <Button variant={"outlined"} onClick={() => navigate(`/best-players-by-hero/${hero.id}`)}>
                <span>Best {hero.name} players</span>
            </Button>
        </Box>
    )
}

export default HeroName;