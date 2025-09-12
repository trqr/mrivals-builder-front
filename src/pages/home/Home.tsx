import affiche from "../../images/HomeEsport.webp";
import affiche2 from "../../images/HomeIker.webp";
import affiche3 from "../../images/HomeSeason.webp";
import affiche4 from "../../images/HomeAzha.webp";
import Box from "@mui/material/Box";
import {useNavigate} from "react-router";
import TeambuildButton from "../../componnents/common/buttons/TeambuildButton.tsx";
import InfiniteScroll from "../../componnents/home/InfiniteScroll.tsx";
import type {HeroType} from "../../@types/HeroType";
import {useEffect, useState} from "react";
import {getAllHeroes} from "../../api/Hero.api.ts";
import {imageBaseUrl} from "../../api/config/Axios.config.ts";
import SplitText from "../../componnents/home/HomeText.tsx";
import Page from "../layout/Page.tsx";
import "./Home.css";
import {useData} from "../../hooks/useData.tsx";

const Home = () => {
    const navigate = useNavigate();
    const {heroes} = useData();

    const handleClickBuild = () => {
        navigate("/Builder");
    };

    const handleAnimationComplete = () => {
        console.log("All letters have animated!");
    };

    return (
        <Page title={"Homepage"} description={"Homepage"}>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 600px",
                    gap: 4,
                    padding: "20px",
                    alignItems: "start",
                }}
            >
                {/* Colonne gauche : images + texte + bouton */}
                <Box
                    className="actuality"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 3,
                    }}
                >
                    {/* Grille des 4 images */}
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 2,
                            justifyItems: "center",
                            border: "solid 2px #FDDE2B",
                            padding: "30px",
                            transform: "skew(-11deg)"
                        }}
                    >
                        <a href={"https://www.marvelrivals.com/match/"} target={"_blank"} rel={"noopener noreferrer"}>
                            <img src={affiche} alt="affiche 1" className="affiche-img"
                                 style={{
                                     width: "400px",
                                     height: "250px",
                                 }} />
                        </a>
                        <a href={"https://www.youtube.com/watch?v=8DE2jlXwLyc"} target={"_blank"} rel={"noopener noreferrer"}>
                            <img src={affiche2} alt="affiche 2" className="affiche-img"
                                 style={{
                                     width: "400px",
                                     height:"250px",
                                 }} />
                        </a>
                        <a href={"https://www.marvelrivals.com/index.html"} target={"_blank"} rel={"noopener noreferrer"}>
                            <img src={affiche3} alt="affiche 3" className="affiche-img"
                                 style={{
                                     width: "400px",
                                     height: "250px",
                                 }}
                            />
                        </a>
                        <a href={"https://www.youtube.com/watch?v=p2N2Cn-zQTw"} target="_blank" rel="noopener noreferrer">
                            <img src={affiche4} alt="affiche 4" className="affiche-img"
                                 style={{ width: "400px",
                                        height:"250px",
                                 }} />
                        </a>
                    </Box>
                    <Box
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0 60px",
                    }}>
                        <Box style={{marginLeft: "-130px", paddingRight: "30px"}}>
                            {/* Texte animé */}
                    <SplitText
                        text="Angela is comming up 12/09/2025 !"
                        className="text-3xl font-bold text-center"
                        delay={100}
                        duration={0.4}
                        ease="power3.out"
                        splitType="chars"
                        from={{ opacity: 0, y: 40 }}
                        to={{ opacity: 1, y: 0 }}
                        threshold={0.1}
                        rootMargin="-100px"
                        textAlign="center"
                        onLetterAnimationComplete={handleAnimationComplete}
                    />
                        </Box>

                    {/* Bouton centré */}
                    <Box sx={{ transform: "skew(-21deg)", mt: 2 }}>
                        <TeambuildButton onClick={handleClickBuild}>Build</TeambuildButton>
                    </Box>

                    </Box>
                </Box>

                {/* Colonne droite : carrousel */}
                <Box
                    className="caroussel"
                    sx={{
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "end",
                        width: "600px",
                        height: "90vh",
                        border: "solid 2px #FDDE2B",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    <InfiniteScroll
                        items={heroes.map((hero) => (
                            <img
                                key={hero.id}
                                src={`${imageBaseUrl}/${hero.imageLink}`}
                                alt={hero.name}
                                onClick={() => navigate(`/HeroDetails/${hero.id}`)}
                            />
                        ))}
                        autoplay
                        autoplaySpeed={0.3}
                        autoplayDirection="up"
                        isTilted
                        tiltDirection="left"
                    />
                </Box>
            </Box>
        </Page>
    );
};

export default Home;

