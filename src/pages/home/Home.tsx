import Box from "@mui/material/Box";
import {useNavigate} from "react-router";
import TeambuildButton from "../../componnents/common/buttons/TeambuildButton.tsx";
import InfiniteScroll from "../../componnents/home/InfiniteScroll.tsx";
import {imageBaseUrl} from "../../api/config/Axios.config.ts";
import SplitText from "../../componnents/home/HomeText.tsx";
import Page from "../layout/Page.tsx";
import "./Home.css";
import {useData} from "../../hooks/useData.tsx";
import {LinearProgress} from "@mui/material";
import {useTransition} from "react";
import Carousel from "../../componnents/home/Carousel.tsx";
import SecondButton from "../../componnents/common/buttons/SecondButton.tsx";
import FuzzyText from "../../componnents/home/FuzzyText.tsx";


const Home = () => {
    const navigate = useNavigate();
    const {heroes} = useData();
    const [isPending, startTransition] = useTransition()


    const handleClickBuild = () => {
        navigate("/builder");
    };

    return (
        <Page title={"Homepage"} description={"Homepage"}>
            <LinearProgress sx={{height: "2px"}} variant={isPending ? "indeterminate" : "determinate"}/>
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
                    <Carousel/>
                    <Box
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0 60px",
                    }}>
                        <Box style={{marginLeft: "-130px", paddingRight: "30px"}}>
                            <FuzzyText
                                baseIntensity={0.2}
                            >
                                Angela is here !
                            </FuzzyText>
                        </Box>

                    {/* Bouton centré */}
                    <Box sx={{ transform: "skew(-21deg)", mt: 2 }}>
                        <SecondButton onClick={handleClickBuild}/>
                    </Box>

                    </Box>
                </Box>
                {/*<Box
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
                </Box>*/}
            </Box>
        </Page>
    );
};

export default Home;

