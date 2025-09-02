import {useCompo} from "../hooks/useCompo.tsx";
import Typography from "@mui/material/Typography";
import type {HeroType} from "../@types/HeroType";
import {Card, CardMedia, Grid} from "@mui/material";
import {imageBaseUrl} from "../api/axios.config.ts";
import {useEffect} from "react";
import Page from "./layout/Page.tsx";

const TeamCompositionCheckout = () => {
    const { compo } = useCompo();

    useEffect(() => {
        console.log(compo);
    }, []);


    return (
        <Page title={"Team review"} description={"Team review"}>
            <Grid container>
                {compo.map((hero: HeroType) => (
                    <Grid size={{lg: 1.5}}>
                        <Card>
                            <Typography variant={"h4"}>{hero.difficulty}</Typography>
                            <CardMedia>
                                <img src={imageBaseUrl+hero.imageLink} alt={hero.name}></img>
                            </CardMedia>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Page>
    )
}

export default TeamCompositionCheckout;