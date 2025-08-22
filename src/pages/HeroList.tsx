import {useEffect, useState, useTransition} from "react";
import {imageBaseUrl} from "../api/axios.config.ts";
import {
    Card, CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Grid,
    ToggleButton,
    ToggleButtonGroup,
    Typography
} from "@mui/material";
import type {heroType} from"../@types/heroType";
import {getAllHeroes} from "../api/HeroesService.ts";
import "./HeroList.css";



const HeroList = () => {
    const [heroes, setHeroes] = useState([])
    const [role, setRole] = useState("")
    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        startTransition( async () => {
            const fetchedHeroes = await getAllHeroes();
            setHeroes(fetchedHeroes);
        })
    }, []);

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setRole(newAlignment);
    };

    return (
        <>
            <ToggleButtonGroup
                color="primary"
                value={role}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
            >
                <ToggleButton className={"filterButton"} value="Vanguard">Vanguard</ToggleButton>
                <ToggleButton className={"filterButton"} value="Duelist">Duelist</ToggleButton>
                <ToggleButton className={"filterButton"} value="Strategist">Strategist</ToggleButton>
            </ToggleButtonGroup>
            <Grid container className={"container"}>
                {(role ? heroes.filter((hero: heroType) => hero.role === role) : heroes).map((hero: heroType) => (
                    <Grid sx={{xs: 2, xl: 1}} key={hero.id}>
                        <Card className={"card"}>
                            <CardContent>
                                <CardMedia>
                                    <img src={imageBaseUrl+hero.imageLink}></img>
                                </CardMedia>
                            </CardContent>
                            <CardActions></CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default HeroList;