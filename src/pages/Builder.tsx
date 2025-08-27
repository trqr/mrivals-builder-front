import NavBar from "../componnents/header/NavBar.tsx";
import Box from "@mui/material/Box";
import {Button, Card, CardContent, CardHeader, Grid} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import IconButton from "@mui/material/IconButton";
import {useLoaderData} from "react-router-dom";
import type {HeroType} from "../@types/HeroType";
import {baseUrl, imageBaseUrl} from "../api/axios.config.ts";

const Builder = () => {
    const heroes = useLoaderData();

    return (
        <>
            <Box sx={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                <Box sx={{display: "flex", flexDirection: "column", minWidth: "25%", margin: "10px"}}>
                    <Grid container gap={1} sx={{display: "flex", justifyContent: "center"}}>
                        <Grid size={{md: 5.5, lg: 5.5, xl: 5.5}}  >
                            <Card>
                                <CardHeader
                                    title="Hero"
                                    subheader={"role"}
                                ></CardHeader>
                                <CardContent>
                                    <IconButton>
                                        <AddIcon/>
                                    </IconButton>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={{md: 5.5, lg: 5.5, xl: 5.5}}>
                            <Card>
                                <CardHeader
                                    title="Hero"
                                    subheader={"role"}
                                ></CardHeader>
                                <CardContent>
                                    <IconButton>
                                        <AddIcon/>
                                    </IconButton>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={{md: 5.5, lg: 5.5, xl: 5.5}}>
                            <Card>
                                <CardHeader
                                    title="Hero"
                                    subheader={"role"}
                                ></CardHeader>
                                <CardContent>
                                    <IconButton>
                                        <AddIcon/>
                                    </IconButton>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={{md: 5.5, lg: 5.5, xl: 5.5}}>
                            <Card>
                                <CardHeader
                                    title="Hero"
                                    subheader={"role"}
                                ></CardHeader>
                                <CardContent>
                                    <IconButton>
                                        <AddIcon/>
                                    </IconButton>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={{md: 5.5, lg: 5.5, xl: 5.5}}>
                            <Card>
                                <CardHeader
                                    title="Hero"
                                    subheader={"role"}
                                ></CardHeader>
                                <CardContent>
                                    <IconButton>
                                        <AddIcon/>
                                    </IconButton>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={{md: 5.5, lg: 5.5, xl: 5.5}}>
                            <Card>
                                <CardHeader
                                    title="Hero"
                                    subheader={"role"}
                                ></CardHeader>
                                <CardContent>
                                    <IconButton>
                                        <AddIcon/>
                                    </IconButton>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    <Button variant={"contained"} sx={{margin: "10px"}}>Validate</Button>
                </Box>
                <Box sx={{display: "flex", justifyContent: "space-between", flexDirection: "column"}}>
                    <Box sx={{width:'75%'}}>
                        <Box></Box>
                        <Grid container gap={1}>
                            {heroes.map((hero: HeroType, index: number) => (
                                <Grid key={index} size={{md: 1.5}}>
                                    <img src={imageBaseUrl+hero.imageLink}/>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                    <Box sx={{display: "flex", justifyContent: "center", flexDirection: "row"}}></Box>
                </Box>
            </Box>
        </>
    )
}

export default Builder;