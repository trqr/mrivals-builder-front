import {Box, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {iconBaseUrl} from "../../api/config/Axios.config.ts";
import PlayerSectionBox from "../common/PlayerSectionBox.tsx";
import {useUserData} from "../../hooks/useUserData.tsx";

type MainPlayerInfoProps = {
    playerStats: any;
}

export const MainPlayerInfo = ({playerStats}: MainPlayerInfoProps ) => {
    const { getAllTimeHighScore, getCurrentSeasonHighScore} = useUserData();

    return (
        <Grid container sx={{display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "20px", justifyContent: "space-around"}}>
            <PlayerSectionBox title="Player Info">
                <Typography>Name: {playerStats.player?.name}</Typography>
                <Typography>Level: {playerStats.player?.level}</Typography>
                <Typography>Rank: {playerStats.player?.rank?.rank}</Typography>

                <Box sx={{ mt: 1 }}>
                    <img
                        src={iconBaseUrl + playerStats.player?.rank?.image}
                        alt="rank icon"
                        style={{ width: "120px", height: "120px" }}
                    />
                </Box>
            </PlayerSectionBox>


            <PlayerSectionBox title="Ranked Stats">
                <Typography>Total Played: {playerStats.overall_stats?.ranked?.total_matches}</Typography>
                <Typography>Total Win: {playerStats.overall_stats?.ranked?.total_wins}</Typography>
                <Typography>
                    Win Rate: {(playerStats.overall_stats?.ranked?.total_wins/ playerStats.overall_stats?.ranked?.total_matches*100).toFixed(2)}%
                </Typography>
                <Typography>Best Score: {getAllTimeHighScore().toFixed(1)}</Typography>
                <Typography>Season best score: {getCurrentSeasonHighScore().toFixed(1)}</Typography>
                <Typography>Total MVP: {playerStats.overall_stats?.ranked?.total_mvp}</Typography>
            </PlayerSectionBox>

            <PlayerSectionBox title="Unranked Stats">
                <Typography >Total Played: {playerStats.overall_stats?.unranked?.total_matches}</Typography>
                <Typography >Total Win: {playerStats.overall_stats?.unranked?.total_wins}</Typography>
                <Typography>
                    Win
                    Rate: {(playerStats.overall_stats?.unranked?.total_wins / playerStats.overall_stats?.unranked?.total_matches * 100).toFixed(2)}%
                </Typography>
                <Typography>Total Kills: {playerStats.overall_stats?.unranked?.total_kills}</Typography>
                <Typography >Total MVP: {playerStats.overall_stats?.unranked?.total_mvp}</Typography>
                <Typography >Total SVP: {playerStats.overall_stats?.unranked?.total_svp}</Typography>
            </PlayerSectionBox>
        </Grid>
    )
}