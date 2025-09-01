import Header from "../componnents/header/Header.tsx";
import affiche from "../image/affiche.jpeg";
import affiche2 from "../image/acceuil2.jpeg";
import affiche3 from "../image/acceuil3.jpeg"
import affiche4 from "../image/acceuil4.jpg"
import Box from "@mui/material/Box";
import { useNavigate } from "react-router";
import TeambuildButton2 from "../componnents/button/TeambuildButton2.tsx";
import InfiniteScroll from "../componnents/InfiniteScroll.tsx";
import type { HeroType } from "../@types/HeroType";
import { useEffect, useState } from "react";
import { getAllHeroes } from "../api/Hero.service.ts";
import { imageBaseUrl } from "../api/axios.config.ts";
import SplitText from "../componnents/HomeText.tsx";

const Home = () => {
    const navigate = useNavigate();
    const [heroes, setHeroes] = useState<HeroType[]>([]);

    useEffect(() => {
        getAllHeroes()
            .then((data) => {
                if (Array.isArray(data)) {
                    setHeroes(data);
                } else if (data && Array.isArray(data.heroes)) {
                    setHeroes(data.heroes);
                } else {
                    console.error("Format inattendu :", data);
                    setHeroes([]);
                }
            })
            .catch((err) => {
                console.error("Erreur API:", err);
                setHeroes([]);
            });
    }, []);

    const handleClick = () => {
        navigate("/Builder");
    };

    const handleAnimationComplete = () => {
        console.log("All letters have animated!");
    };

    return (
        <>
            <Header />

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
                    {/* Deux images côte à côte */}
                    <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                        <img
                            src={affiche}
                            alt="affiche de la saison 3.5"
                            style={{ width: "450px", height: "auto"}}
                        />
                        <img
                            src={affiche2}
                            alt="affiche de la saison 3.5"
                            style={{ width: "450px", height: "auto"}}
                        />
                        <img
                            src={affiche3}
                            alt="affiche de la saison 3.5"
                            style={{ width: "450px", height: "auto"}}
                            />
                        <img
                        src={affiche4}
                        alt="affiche de la saison 3.5"
                        style={{ width: "450px", height: "auto"}}
                        />
                    </Box>

                    {/* Texte animé */}
                    <SplitText
                        text="Le prochain personnage sort le 12/09"
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

                    {/* Bouton centré */}
                    <Box sx={{ transform: "skew(-21deg)", mt: 2 }}>
                        <TeambuildButton2 onClick={handleClick}>Build</TeambuildButton2>
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
        </>
    );
};

export default Home;
