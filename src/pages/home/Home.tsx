import {useNavigate} from "react-router";
import Page from "../layout/Page.tsx";
import "./Home.css";
import Carousel from "../../componnents/home/Carousel.tsx";
import SecondButton from "../../componnents/common/buttons/SecondButton.tsx";
import BestHeroesSection from "../../componnents/home/BestHeroesSection.tsx";
import {Container, Grid} from "@mui/material";
import ShinyText from "../../componnents/home/ShinyText.tsx";
import Typography from "@mui/material/Typography";
import HomeCard from "../../componnents/home/HomeCard.tsx";

const Home = () => {
    const navigate = useNavigate();

    const handleClickBuild = () => {
        navigate("/builder");
    };


    return (
        <Page title={"Homepage"} description={"Homepage"}>
            <div className="Homepage">
                <Container maxWidth="xl">
                    <Grid container spacing={2}
                          style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                          }}
                    >
                        <Grid size={{lg:2}}></Grid>
                        <Grid size={{
                            xs: 12,
                            sm: 12,
                            md: 12,
                            lg: 10
                        }}
                              sx={{
                                  height: "550px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                              }}>
                            <Typography variant={"h1"} sx={{marginTop: "30px"}}>Build the Perfect
                                Team<br/> on Marvel Rivals</Typography>
                        </Grid>
                        <Grid size={{lg: 12}} sx={{display: "flex", justifyContent: "center", height: "200px"}}>
                            <SecondButton onClick={handleClickBuild} style={{margin: "10px",}}>START BUILDING</SecondButton>
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
                              }}
                        >
                            <HomeCard
                                width="auto"
                                spotlightColor="rgba(0, 229, 255, 0.2)"
                                backgroundColor="rgba(42, 42, 64, 0.6)"
                                className={"homepage-card"}
                            >
                                <ShinyText
                                    text
                                    disabled={false}
                                    speed={3}
                                    className='custom-class'
                                />

                            </HomeCard>
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
                                  marginTop: "60px",

                              }}
                        >
                            <HomeCard
                                width="auto"
                                spotlightColor="rgba(0, 229, 255, 0.2)"
                                backgroundColor="rgba(42, 42, 64, 0.6)"
                                className={"homepage-card"}
                            >
                                <h2 style={{textAlign: "center"}}>Best Winrates</h2>
                                <BestHeroesSection/>
                            </HomeCard>
                        </Grid>
                        <Grid size={{
                            xs: 12,
                            sm: 6,
                            md: 6,
                            lg: 6,
                        }}
                              style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  marginTop: "60px",
                              }}>
                            <Carousel/>
                        </Grid>


                    </Grid>
                </Container>

            </div>
        </Page>
    );
};

export default Home;

