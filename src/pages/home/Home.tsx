import Box from "@mui/material/Box";
import {useNavigate} from "react-router";
import TeambuildButton from "../../componnents/common/buttons/TeambuildButton.tsx";
import InfiniteScroll from "../../componnents/home/InfiniteScroll.tsx";
import {imageBaseUrl} from "../../api/config/Axios.config.ts";
import SplitText from "../../componnents/home/HomeText.tsx";
import Page from "../layout/Page.tsx";
import "./Home.css";
import {useData} from "../../hooks/useData.tsx";
import ImageHome from "../../componnents/home/ImageHome.tsx";

const Home = () => {
    const navigate = useNavigate();
    const {heroes} = useData();

    const handleClickBuild = () => {
        navigate("/builder");
    };

    const handleAnimationComplete = () => {

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
                <Box
                    className="actuality"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 3,
                    }}
                >
                    <ImageHome/>
                    <Box
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0 60px",
                    }}>
                        <Box style={{marginLeft: "-130px", paddingRight: "30px"}}>
                    <SplitText
                        text="Angela is Here !"
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

