import {useNavigate} from "react-router";
import Page from "../layout/Page.tsx";
import "./Home.css";
import Carousel from "../../componnents/home/Carousel.tsx";
import SecondButton from "../../componnents/common/buttons/SecondButton.tsx";
import GlitchText from "../../componnents/home/GlitchText.tsx";
import BestHeroesSection from "../../componnents/home/BestHeroesSection.tsx";
import {Grid} from "@mui/material";

const Home = () => {
    const navigate = useNavigate();

    const handleClickBuild = () => {
        navigate("/builder");
    };

    return (
        <Page title={"Homepage"} description={"Homepage"}>
            <Grid container spacing={2}
            >
                    <Grid size={{
                        xs: 12,
                        sm: 12,
                        md: 8,
                        lg: 8,
                    }}
                          style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                          }}>
                    <Carousel/>
                    </Grid>

                <Grid size={{
                    xs: 12,
                    sm: 12,
                    md: 4,
                    lg: 4,
                }}>
                    <h2 style={{ textAlign: "center" }}>Best Winrate :</h2>
                    <BestHeroesSection />
                </Grid>
                        <Grid size={{
                            xs: 12,
                            sm: 12,
                            md: 8,
                            lg: 8,
                        }}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            <GlitchText
                                speed={1}
                                enableShadows={true}
                                enableOnHover={true}
                                className='custom-class'
                            >
                                Angela is here !
                            </GlitchText>
                        </Grid>
                    <Grid size={{
                        xs: 4,
                        sm: 4,
                        md: 4,
                        lg: 4,
                    }}
                          style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                          }}>
                        <SecondButton onClick={handleClickBuild}/>
                    </Grid>
            </Grid>
        </Page>
    );
};

export default Home;

