import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import {iconBaseUrl} from "../../api/config/Axios.config.ts";
import PlayerSectionBox from "../common/PlayerSectionBox.tsx";
import {useUserData} from "../../hooks/useUserData.tsx";

export const MainPlayerInfo = () => {
    const {userGameStats} = useUserData();
    const { getAllTimeHighScore, getCurrentSeasonHighScore} = useUserData();

    return (
        <Box sx={{display: "flex", flexDirection: "row", minWidth: "50%", gap: "20px"}}>
            <PlayerSectionBox title="Player Info">
                <Typography>{userGameStats.player?.name}</Typography>
                <Typography>Level: {userGameStats.player?.level}</Typography>
                <Typography>Rank: {userGameStats.player?.rank?.rank}</Typography>
                <Box sx={{mt: 1}}>
                    <img
                        src={iconBaseUrl + userGameStats.player?.rank?.image}
                        alt="rank icon"
                        style={{width: "120px", height: "120px"}}
                    />
                </Box>
            </PlayerSectionBox>


            <PlayerSectionBox title="Ranked Stats">
                <Typography>Total Played: {userGameStats.overall_stats?.ranked?.total_matches}</Typography>
                <Typography>Total Win: {userGameStats.overall_stats?.ranked?.total_wins}</Typography>
                <Typography>
                    Win Rate: {(userGameStats.overall_stats?.ranked?.total_wins/ userGameStats.overall_stats?.ranked?.total_matches*100).toFixed(2)}%
                </Typography>
                <Typography>Best Score: {getAllTimeHighScore().toFixed(1)}</Typography>
                <Typography>Season best score: {getCurrentSeasonHighScore().toFixed(1)}</Typography>
                <Typography>Total MVP: {userGameStats.overall_stats?.ranked?.total_mvp}</Typography>
            </PlayerSectionBox>

            <PlayerSectionBox title="Unranked Stats">
                <Typography >Total Played: {userGameStats.overall_stats?.unranked?.total_matches}</Typography>
                <Typography >Total Win: {userGameStats.overall_stats?.unranked?.total_wins}</Typography>
                <Typography>
                    Win
                    Rate: {(userGameStats.overall_stats?.unranked?.total_wins / userGameStats.overall_stats?.unranked?.total_matches * 100).toFixed(2)}%
                </Typography>
                <Typography>Total Kills: {userGameStats.overall_stats?.unranked?.total_kills}</Typography>
                <Typography >Total MVP: {userGameStats.overall_stats?.unranked?.total_mvp}</Typography>
                <Typography >Total SVP: {userGameStats.overall_stats?.unranked?.total_svp}</Typography>
            </PlayerSectionBox>
        </Box>
    )
}