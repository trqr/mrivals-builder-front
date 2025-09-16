import Page from "../layout/Page.tsx";
import {useLoaderData} from "react-router-dom";
import Typography from "@mui/material/Typography";
import {
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Container,
    Grid,
    LinearProgress,
    Pagination,
    TextField
} from "@mui/material";
import {type ChangeEvent, useEffect, useState, useTransition} from "react";
import type {LeaderboardPlayerType, LeaderboardType} from "../../@types/LeaderboardType.ts";
import {iconBaseUrl} from "../../api/config/Axios.config.ts";
import {getHeroLeaderboard} from "../../api/Leaderboard.api.ts";
import Box from "@mui/material/Box";

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
            <LinearProgress sx={{height: "2px"}} variant={isPending ? "indeterminate" : "determinate"}/>
            <Container maxWidth="xl" sx={{display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center", gap: "20px"}}>
            <Typography variant={"h4"} sx={{marginTop: "20px"}}>Best {fetchedPlayers.hero?.name} players</Typography>
            <TextField
                sx={{width: "25%"}}
                label="Search"
                variant="filled"
                value={search}
                onChange={handleSearchChange}
            />
            <Grid container spacing={2}>
                {showedPlayers.map((player: LeaderboardPlayerType, index: number) => (
                    <Grid key={player.id} size={{md: 2.2, xl: 2.4}}>
                        <Card variant={"outlined"} >
                            <CardHeader
                                avatar={`#${index+1}`}
                                title={`${player.name}`}
                            />
                            <CardContent>
                                <Box sx={{display: "flex"}}>
                                    <CardMedia sx={{height: 140, width: 140}}
                                               image={iconBaseUrl+player.icon}
                                               title="player icon"
                                    />
                                    <Box sx={{marginLeft: "10px"}}>
                                        <Typography variant={"body2"}>Max rank: {player.maxRankScore}</Typography>
                                        <Typography variant={"body2"}>Actual rank: {player.rankScore}</Typography>
                                        <Typography variant={"body2"}>Season wins: {player.seasonWinCount}</Typography>

                                    </Box>
                                </Box>
                                <Box>
                                    <Typography variant={"h6"} sx={{marginTop: "10px"}}>{fetchedPlayers.hero?.name} stats:</Typography>
                                    <Typography variant={"body2"}>Win rate: {(player.heroWins/player.heroMatches*100).toFixed(1)}%</Typography>
                                    <Typography variant={"body2"}>Number of matches: {player.heroMatches}</Typography>
                                    <Typography variant={"body2"}>Number of wins: {player.heroWins}</Typography>
                                    <Typography variant={"body2"}>
                                        Kills/Deaths/Assists: {`${player.heroKills} / ${player.heroDeaths} / ${player.heroAssists}`}
                                    </Typography>
                                    <Typography variant={"body2"}>KDA: {((player.heroKills + player.heroAssists) / player.heroDeaths).toFixed(2)}</Typography>
                                    <Typography variant={"body2"}>MVPs: {player.heroMvps}</Typography>
                                    <Typography variant={"body2"}>SVPs: {player.heroSvps}</Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Pagination page={page} onChange={handlePageChange} count={10} color="primary"/>
            </Container>
        </Page>
    )
}

export default BestPlayersPage