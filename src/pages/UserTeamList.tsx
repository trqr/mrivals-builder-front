import Page from "./layout/Page.tsx";
import {Button, Card, CardMedia, Grid} from "@mui/material";
import {startTransition, useEffect, useState} from "react";
import {imageBaseUrl} from "../api/axios.config.ts";
import {deleteAllTeams, deleteTeam, getUserTeamCompos} from "../api/Compo.service.ts";



const UserTeamList = () => {
    const [teams, setTeams] = useState<any[]>([]);

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
                                {team.heroes.map((hero: any) => (
                                    <CardMedia key={hero.id}>
                                        <img
                                            src={imageBaseUrl + hero.imageLink}
                                            alt={hero.name}
                                            style={{ width: "80px", height: "80px", objectFit: "cover" }}
                                        />
                                    </CardMedia>
                                ))}
                            </div>
                            <Button
                                variant={"contained"}
                                color={"error"}
                                onClick={() => handleDelete(team.id)}
                            >Delete</Button>
                        </Card>
                    </Grid>
                ))}
                <Button
                    variant={"contained"}
                    color={"error"}
                    onClick={hadleDeleteAll}
                    >Delete All</Button>
            </Grid>
        </Page>
    )
}

export default UserTeamList