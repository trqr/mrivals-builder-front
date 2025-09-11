import {useEffect, useState, useTransition} from "react";
import {imageBaseUrl} from "../api/axios.config.ts";
import {
    CardContent,
    CardMedia,
    Grid,
} from "@mui/material";
import type {HeroType} from "../@types/HeroType";
import type {MapType} from "../@types/MapType";
import {getAllHeroes} from "../api/Hero.api.ts";
import {getAllMap} from "../api/Map.api.ts";
import "./DataList.css";
import Header from "../componnents/header/Header.tsx";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router";
import Page from "./layout/Page.tsx";

const DataList = () => {
    const [heroes, setHeroes] = useState([])
    const [maps, setMap] = useState([])
    const [role, setRole] = useState("")
    const [isPending, startTransition] = useTransition()
    const [show, setShow] = useState<"heroes" | "maps">("heroes")

    useEffect(() => {
        startTransition( async () => {
            const fetchedHeroes = await getAllHeroes();
            setHeroes(fetchedHeroes);
        })
    }, []);

    useEffect(() => {
        startTransition( async () => {
            const fetchedMap = await getAllMap();
            setMap(fetchedMap);
        })
    }, []);


    const navigate = useNavigate();


    return (
        <Page description={"Heroes and maps listing"} title={"Heroes and maps listing"}>
            <div className={'filterButton'} style={{ marginTop: "80px", textAlign: "center" }}>
                <button className={show === "heroes" ? "btn active" : "btn inactive"}
                        onClick={() => setShow("heroes")}>Heroes</button>
                <button className={show === "maps" ? "btn active" : "btn inactive"}
                        onClick={() => setShow("maps")}>Maps</button>
            </div>

            {show === "heroes" && (
                <Grid container className={"containerHeroes"}>
                    {(role ? heroes.filter((hero: HeroType) => hero.role === role) : heroes).map((hero: HeroType) => (
                        <Grid sx={{xs: 2, xl: 1}} key={hero.id}>
                            <img
                                src={imageBaseUrl + hero.imageLink}
                                alt={hero.name}
                                className="card"
                                onClick={() => navigate(`/HeroDetails/${hero.id}`)}
                            />

                        </Grid>
                    ))}
                </Grid>
            )}

            {show === "maps" && (
                <Grid container className={"containerMaps"}>
                    {maps.map((map: MapType) => (
                        <CardContent key={map.id}>
                            <CardMedia>
                                <Typography>{map.name}</Typography>
                                <img src={`${imageBaseUrl}${map.mapImages[1].imageLink}`} alt={map.name} className="cardMap"
                                     onClick={() => navigate(`/maps/${map.id}`)}/>
                            </CardMedia>
                        </CardContent>
                    ))}
                </Grid>
            )}
        </Page>
    )
}

export default DataList;