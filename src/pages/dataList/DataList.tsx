import {useState} from "react";
import {imageBaseUrl} from "../../api/config/Axios.config.ts";
import {CardContent, CardMedia, Container, Grid} from "@mui/material";
import type {HeroType} from "../../@types/HeroType";
import type {MapType} from "../../@types/MapType.ts";
import "./DataList.css";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router";
import Page from "../layout/Page.tsx";
import {useData} from "../../hooks/useData.tsx";
import TiltedCard from "../../componnents/home/TiltedCard.tsx";

const DataList = () => {
    const [show, setShow] = useState<"heroes" | "maps">("heroes");
    const {heroes, maps} = useData();
    const navigate = useNavigate();

    const handleMouseMove = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = ((x - centerX) / centerX) * 22;
        const rotateX = ((y - centerY) / centerY) * 11;

        card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        const card = e.currentTarget;
        card.style.transform = "rotateX(0deg) rotateY(0deg)";
    };

    return (
        <Page description={"Heroes and maps listing"} title={"Heroes and maps listing"}>
            <Container maxWidth="xl">
                <div className={'filterButton'} style={{marginTop: "80px", textAlign: "center"}}>
                    <button className={show === "heroes" ? "btn active" : "btn inactive"}
                            onClick={() => setShow("heroes")}>Heroes
                    </button>
                    <button className={show === "maps" ? "btn active" : "btn inactive"}
                            onClick={() => setShow("maps")}>Maps
                    </button>
                </div>

                {show === "heroes" && (
                    <Grid container className={"containerHeroes"}>
                        {heroes.map((hero: HeroType) => (
                            <Grid size={{xs: 12, sm: 6, md: 3, lg: 2, xl: 2}} key={hero.id} sx={{ display: "flex", justifyContent: "center", alignItems: "center"}}
                                  onClick={() => navigate(`/heroDetails/${hero.id}`)} >
                                <TiltedCard
                                    imageSrc={imageBaseUrl + hero.imageLink}
                                    altText={hero.name}
                                    captionText={hero.name}
                                    containerHeight="225px"
                                    containerWidth="125px"
                                    imageHeight="225px"
                                    imageWidth="125px"
                                    rotateAmplitude={20}
                                    scaleOnHover={1.2}
                                    showMobileWarning={false}
                                    showTooltip={true}
                                    displayOverlayContent={true}
                                    overlayContent={
                                        <p className="tilted-card-demo-text">
                                            Winrate : {(hero.winRate * 100).toFixed(1)}%
                                        </p>
                                    }
                                />
                                </Grid>
                        ))}
                    </Grid>
                )}

                {show === "maps" && (
                    <Grid container className={"containerMaps"}>
                        {maps.map((map: MapType) => (
                            <CardContent key={map.id} sx={{cursor: "pointer"}}>
                                <CardMedia>
                                    <Typography variant={"h5"} sx={{textAlign: "center", margin: "5px"}}>{map.name}</Typography>
                                    <img
                                        src={`${imageBaseUrl}${map.mapImages[1].imageLink}`}
                                        alt={map.name}
                                        className="cardMap"
                                        onClick={() => navigate(`/maps/${map.id}`)}
                                        onMouseMove={handleMouseMove}
                                        onMouseLeave={handleMouseLeave}
                                    />
                                </CardMedia>
                            </CardContent>
                        ))}
                    </Grid>
                )}
            </Container>
        </Page>
    );
}

export default DataList;
