import {useNavigate} from "react-router";
import Page from "../layout/Page.tsx";
import "./Home.css";
import Carousel from "../../componnents/home/Carousel.tsx";
import SecondButton from "../../componnents/common/buttons/SecondButton.tsx";
import BestHeroesSection from "../../componnents/home/BestHeroesSection.tsx";
import {Container, Grid} from "@mui/material";
import ShinyText from "../../componnents/home/ShinyText.tsx";
import SpotlightCard from "../../componnents/common/cards/spotlightCard/SpotlightCard.tsx";

const Home = () => {
    const navigate = useNavigate();

    const handleClickBuild = () => {
        navigate("/builder");
    };


    return (
        <Page title={"Homepage"} description={"Homepage"}>
            <Container maxWidth="xl">
            <Grid container spacing={2}
                  style={{margin: "10px"}}
            >
                    <Grid size={{
                        xs: 12,
                        sm: 12,
                        md: 6,
                        lg: 6,
                    }}
                          style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                          }}>
                        <SpotlightCard width={"auto"} className="settings-card" spotlightColor="rgba(0, 229, 255, 0.2)">
                            <ShinyText
                                text
                                disabled={false}
                                speed={3}
                                className='custom-class'
                            />
                        </SpotlightCard>
                    <SecondButton onClick={handleClickBuild} style={{margin: "10px"}}/>
                    </Grid>

                        <Grid size={{
                            xs: 12,
                            sm: 12,
                            md: 6,
                            lg: 6,
                        }}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: "10px",
                        }}>
                           <Carousel/>
                        </Grid>
                    <Grid size={{
                        xs: 12,
                        sm: 12,
                        md: 12,
                        lg: 12,
                    }}
                          style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              marginTop: "10px",

                          }}>
                        <SpotlightCard width={"auto"} className="settings-card" spotlightColor="rgba(0, 229, 255, 0.2)">
                        <h2 style={{ textAlign: "center" }}>Best Winrate :</h2>
                        <BestHeroesSection />
                            </SpotlightCard>
                    </Grid>
            </Grid>
            </Container>
        </Page>
    );
};

export default Home;

