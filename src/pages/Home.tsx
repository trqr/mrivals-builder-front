import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Grid, ToggleButton,
    ToggleButtonGroup,
    Typography
} from "@mui/material";
import {useEffect, useState, useTransition} from "react";
import {baseUrl, imageBaseUrl, marvelsApi} from "../api/axios.config.ts";

const Home = () => {
    const [heroes, setHeroes] = useState([])
    const [role, setRole] = useState("")
    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        startTransition( async () => {
            const fetchedHeroes = await marvelsApi.get("heroes").then(res => {
                console.log(res);
                return res.data;
            });
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
                <ToggleButton value="Vanguard">Vanguard</ToggleButton>
                <ToggleButton value="Duelist">Duelist</ToggleButton>
                <ToggleButton value="Strategist">Strategist</ToggleButton>
            </ToggleButtonGroup>
            <Grid container>
                {(role ? heroes.filter(hero => hero.role === role) : heroes).map(hero => (
                    <Grid sx={{xs: 2, xl: 1}} key={hero.id}>
                        <Card>
                            <CardHeader>
                                <Typography variant={"h6"}>{hero.name}</Typography>
                            </CardHeader>
                            <CardContent>
                                <CardMedia>
                                    <img src={imageBaseUrl+hero.imageUrl}></img>
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

export default Home;