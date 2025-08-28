import Box from "@mui/material/Box";
import { Button, Card, CardContent, CardHeader, Grid} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import IconButton from "@mui/material/IconButton";
import {useLoaderData} from "react-router-dom";
import type {HeroType} from "../@types/HeroType";
import {imageBaseUrl} from "../api/axios.config.ts";
import {useState} from "react";
import HeroRoleFilter from "../componnents/HeroRoleFilter.tsx";
import Header from "../componnents/header/Header.tsx";

const Builder = () => {
    const heroes = useLoaderData();
    const [role, setRole] = useState("")


    return (
        <>
            <Header></Header>
            <Box sx={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                <Box sx={{display: "flex", flexDirection: "column", minWidth: "25%", margin: "10px", alignItems: "center", justifyContent: "center", height: "100vh"}}>
                    <Grid container gap={1} sx={{display: "flex", justifyContent: "center"}}>
                        {Array.from({ length: 6 }, (e, i) => (
                            <Grid size={{md: 5.5, lg: 5.5, xl: 5.5}}  >
                                <Card sx={{height: "220px"}}>
                                    <CardHeader
                                        title={`Hero${i}`}
                                        subheader={"role"}
                                    ></CardHeader>
                                    <CardContent>
                                        <IconButton>
                                            <AddIcon/>
                                        </IconButton>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Button variant={"contained"} sx={{margin: "10px"}}>Validate</Button>
                </Box>
                <Box sx={{display: "flex", justifyContent: "space-between", flexDirection: "column", width:'75%'}}>
                    <Box >
                        <Box sx={{display: "flex", justifyContent: "center"}}>
                            <HeroRoleFilter role={role} setRole={setRole}></HeroRoleFilter>
                        </Box>
                        <Grid container gap={1}>
                            {(role ? heroes.filter((hero: HeroType) => hero.role === role) : heroes).map((hero: HeroType, index: number) => (
                                <Grid key={index} size={{md: 1.2}} sx={{width: "300px", height: "200px", overflow: "hidden"}}>
                                    <img src={imageBaseUrl+hero.imageLink} style={{objectFit: "cover", objectPosition: "center", maxHeight: "100%", maxWidth: "100%"}} alt={hero.name}/>
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