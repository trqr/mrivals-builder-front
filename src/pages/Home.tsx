import Header from "../componnents/header/Header.tsx";
import affiche from "../image/affiche.jpeg"
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useNavigate} from "react-router";
import TeambuildButton2 from "../componnents/button/TeambuildButton2.tsx";
import InfiniteScroll from "../componnents/InfiniteScroll.tsx";
import type {HeroType} from "../@types/HeroType";
import {useEffect, useState} from "react";
import {getAllHeroes} from "../api/Hero.service.ts";
import {imageBaseUrl} from "../api/axios.config.ts";
import SplitText from "../componnents/HomeText.tsx";

const Home = () => {
    const navigate = useNavigate();
    const [heroes, setHeroes] = useState<HeroType[]>([]);

    useEffect(() => {
        getAllHeroes()
            .then((data) => {
                if (Array.isArray(data)) {
                    // cas où l'API retourne directement un tableau
                    setHeroes(data);
                } else if (data && Array.isArray(data.heroes)) {
                    // cas où l'API retourne { heroes: [...] }
                    setHeroes(data.heroes);
                } else {
                    console.error("Format inattendu :", data);
                    setHeroes([]); // évite de planter
                }
            })
            .catch((err) => {
                console.error("Erreur API:", err);
                setHeroes([]); // évite undefined → map crash
            });
    }, []);

    const handleClick = () => {
        navigate("/Builder");
    }
    const handleAnimationComplete = () => {
        console.log('All letters have animated!');
    };

    return (
        <>
            <Header></Header>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 4,
                    padding: "20px",
                }}
            >
            <Box
                className="actuality"
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    justifyContent: "space-between",
                    gap: 2,
                    padding: "20px",
                    maxWidth: "50%"
                }}
            >
                {/* Image à gauche */}
                <img
                    className="image"
                    src={affiche}
                    alt="affiche de la saison 3.5"
                    style={{
                        width: "500px",
                        height: "auto",

                    }}
                />

                {/* Texte à droite */}
                <Typography sx={{ flex: 1, textAlign: "justify"}}></Typography>
                    <SplitText
                        text="Le prochain personnage sort le 12/09"
                        className="text-2xl font-semibold text-center"
                        style={{}}
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
                <div style={{ display: "flex", justifyContent: "center", margin: "40px", transform: 'skew(-21deg)', }}>
                    <TeambuildButton2 onClick={handleClick}>
                        Build</TeambuildButton2>
                </div>
            </Box>
            <Box className="caroussel" style={{display: 'flex',
                justifyContent: 'end',
                alignItems: 'end',
                width: "600px",
                height: "90vh",
                border: "solid 2px #FDDE2B",
                position: "relative",
            }}>
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
    )
}

export default Home;