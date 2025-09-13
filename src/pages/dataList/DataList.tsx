import {useState} from "react";
import {imageBaseUrl} from "../../api/config/Axios.config.ts";
import {CardContent, CardMedia, Container, Grid,} from "@mui/material";
import type {HeroType} from "../../@types/HeroType";
import type {MapType} from "../../@types/MapType.ts";
import "./DataList.css";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router";
import Page from "../layout/Page.tsx";
import {useData} from "../../hooks/useData.tsx";

const DataList = () => {
    const [role, setRole] = useState("")
    const [show, setShow] = useState<"heroes" | "maps">("heroes")
    const {heroes, maps} = useData();
    const navigate = useNavigate();


    return (
        <Page description={"Heroes and maps listing"} title={"Heroes and maps listing"}>
            <Container maxWidth="xl">
                <div className={'filterButton'} style={{ marginTop: "80px", textAlign: "center" }}>
                    <button className={show === "heroes" ? "btn active" : "btn inactive"}
                            onClick={() => setShow("heroes")}>Heroes</button>
                    <button className={show === "maps" ? "btn active" : "btn inactive"}
                            onClick={() => setShow("maps")}>Maps</button>
                </div>

                {show === "heroes" && (
                    <Grid container className={"containerHeroes"}>
                        {(role ? heroes.filter((hero: HeroType) => hero.role === role) : heroes).map((hero: HeroType) => (
                            <Grid size={{xs: 2, xl: 2}} key={hero.id}>
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
            </Container>
        </Page>
    )
}

export default DataList;