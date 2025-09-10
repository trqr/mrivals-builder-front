import Page from "./layout/Page.tsx";
import {Button, Card, CardMedia, Grid} from "@mui/material";
import {startTransition, useEffect, useState} from "react";
import {imageBaseUrl} from "../api/axios.config.ts";
import {deleteAllTeams, deleteTeam, getUserTeamCompos} from "../api/Compo.service.ts";
import Typography from "@mui/material/Typography";
import type {HeroType} from "../@types/HeroType";
import MainButton from "../componnents/button/MainButton.tsx";
import DeleteButton from "../componnents/button/DeleteButton.tsx";
import Box from "@mui/material/Box";
import {useNavigate} from "react-router";
import {useCompo} from "../hooks/useCompo.tsx";



const UserTeamList = () => {
    const [teams, setTeams] = useState<any[]>([]);
    const { compo } = useCompo();

    const navigate =useNavigate();

    const handleNavigateToTeam = async () => {
        startTransition(async () => {
            const heroesIds = compo.map((hero: HeroType) => hero?.id);
            const showDetails = await navigate("../../team");
        })
    }

    const fetchTeams = async () => {
        const fetchedTeams = await getUserTeamCompos();
        setTeams(fetchedTeams);
    }

    useEffect(() => {
        fetchTeams();
    }, []);

    const handleDelete = async (teamId: number) => {
        await deleteTeam(teamId);
        fetchTeams();
    };

    const hadleDeleteAll = async () => {
        await deleteAllTeams();
        fetchTeams();
    };

    return (
        <Page title={"Team list"} description={"Team list page"}>
            <Grid container spacing={2}>
                {teams.map((team) => (
                    <Grid item xs={12} key={team.id}>
                        <Card>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                {team.heroes.map((hero: HeroType) => (
                                    <CardMedia key={hero.id} sx={{padding: "10px"}}>
                                        <img
                                            src={imageBaseUrl + hero.imageLink}
                                            alt={hero.name}
                                            style={{ width: "80px", height: "100px", objectFit: "cover" }}
                                        />
                                        <Typography sx={{padding: "5px"}}>{hero.name}</Typography>
                                    <Typography sx={{padding: "5px"}}>Winrate: {(hero.winRate * 100).toFixed(1)}%</Typography>
                                    </CardMedia>

                            ))}
                            </div>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                padding: "10px"
                            }}>
                            <DeleteButton
                                onClick={() => handleDelete(team.id)}
                            >Delete</DeleteButton>
                            <Typography sx={{padding: "5px", fontSize: "20px"}}>{team.id}</Typography>
                                <MainButton
                                onClick={handleNavigateToTeam}>
                                    Details
                                </MainButton>
                            </div>
                        </Card>
                    </Grid>
                ))}
                <Box sx={{padding: "10px"}}>
                <DeleteButton
                    onClick={hadleDeleteAll}
                    >Delete All</DeleteButton>
                </Box>
            </Grid>
        </Page>
    )
}

export default UserTeamList