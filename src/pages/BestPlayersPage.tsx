import Page from "./layout/Page.tsx";
import {useLoaderData} from "react-router-dom";
import Typography from "@mui/material/Typography";
import {Card, CardContent, CardMedia, Grid, Pagination, TextField} from "@mui/material";
import {type ChangeEvent, useEffect, useState, useTransition} from "react";
import type {LeaderboardPlayerType, LeaderboardType} from "../@types/LeaderboardType.ts";
import {iconBaseUrl} from "../api/axios.config.ts";
import {getHeroLeaderboard} from "../api/Leaderboard.api.ts";

const BestPlayersPage = () => {
    const fetchedPlayers: LeaderboardType = useLoaderData();
    const [showedPlayers, setShowedPlayers] = useState<LeaderboardPlayerType[]>(fetchedPlayers.players)
    const [page, setPage] = useState<number>(1)
    const [search, setSearch] = useState<string>("")
    const [isPending, startTransition] = useTransition()

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setPage(0);
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    useEffect(() => {
        startTransition(async () => {
            const paginedData = await getHeroLeaderboard(fetchedPlayers.hero!.id.toString(), page-1, 25)
            setShowedPlayers(paginedData.players);
        })
    }, [page, search, fetchedPlayers]);


    return (
        <Page title={"Best Players"} description={`Best Players with ${fetchedPlayers.hero?.name}`}>
            <Typography variant={"h4"}>Best players with HeroName</Typography>
            <TextField
                label="Search"
                variant="standard"
                fullWidth
                value={search}
                onChange={handleSearchChange}
            />
            <Grid container gap={2}>
                {showedPlayers.map((player: LeaderboardPlayerType) => (
                    <Grid key={player.id} size={{md: 2, xl: 2}}>
                        <Card variant={"outlined"}>
                            <CardMedia sx={{height: 140, width: 140}}
                                       image={iconBaseUrl+player.icon}
                                       title="player icon"
                            />
                            <CardContent>
                                <Typography variant={"h6"}>{player.name}</Typography>
                                <Typography variant={"body2"}>Max rank score: {player.maxRankScore}</Typography>
                                <Typography variant={"body2"}>Actual rank score: {player.rankScore}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Pagination page={page} onChange={handlePageChange} count={10} color="primary"/>
        </Page>
    )
}

export default BestPlayersPage