import {Box, MenuItem} from "@mui/material";
import Typography from "@mui/material/Typography";
import {iconBaseUrl} from "../../api/config/Axios.config.ts";
import PlayerSectionBox from "../common/PlayerSectionBox.tsx";
import {useUserData} from "../../hooks/useUserData.tsx";
import Select from "@mui/material/Select";
import {useEffect, useState} from "react";

export const MainPlayerInfo = () => {
    const { getAllTimeHighScore, getCurrentSeasonHighScore, userGameStats, accounts} = useUserData();
    const [selectedOption, setSelectedOption] = useState("default");

    useEffect(() => {
    }, [userGameStats]);

    return (
        <Box sx={{display: "flex", flexDirection: "row", minWidth: "50%", gap: "20px"}}>
            <PlayerSectionBox title="Player Info">
                <Box sx={{ mt: 2 }}>
                    <Select
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                        fullWidth
                        size="small"
                    >
                        {accounts.map((account: never, index: number) => (
                            <MenuItem key={index} value={account.mrivalsAccount}></MenuItem>
                        ))}
                        <MenuItem value="default">Default</MenuItem>
                        <MenuItem value="profile">Profile</MenuItem>
                        <MenuItem value="stats">Stats</MenuItem>
                        <MenuItem value="achievements">Achievements</MenuItem>
                    </Select>
                </Box>
                <Typography>Level: {userGameStats.player?.level}</Typography>
                <Typography>Rank: {userGameStats.player?.rank?.rank}</Typography>

                <Box sx={{ mt: 1 }}>
                    <img
                        src={iconBaseUrl + userGameStats.player?.rank?.image}
                        alt="rank icon"
                        style={{ width: "120px", height: "120px" }}
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