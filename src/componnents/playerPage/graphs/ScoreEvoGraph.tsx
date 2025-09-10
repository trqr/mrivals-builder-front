import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,} from "recharts";
import {Paper} from "@mui/material";
import {useUserData} from "../../../hooks/useUserData.tsx";
import type {MatchHistoryItem} from "../../../@types/PlayerType/MatchHistoryType.ts";
import Typography from "@mui/material/Typography";

export const ScoreEvoGraph = () => {
    // @ts-expect-error bien dans le context
    const {getCurrentSeasonHighScore, userGameStats, getAllTimeHighScore} = useUserData();

    const sortedHistory = [...userGameStats.match_history].sort(
        (a, b) => a.match_time_stamp - b.match_time_stamp
    );

    const scoreData = sortedHistory.map((match: MatchHistoryItem, index: number) => ({
        x: index +1 ,
        y: match.player_performance.new_score.toFixed(0),
        record: getCurrentSeasonHighScore().toFixed(0),
        allTimeRecord: getAllTimeHighScore().toFixed(0),
        timestamp: match.match_time_stamp,
    }));

    const minScore = Math.min(...scoreData.map((d) => d.y));

    return (
        <Paper style={{padding: 10, paddingRight: 15}}>
            <Typography variant={"h5"} sx={{textAlign: "center", p: 1}}>Score Evolution</Typography>
            <ResponsiveContainer width="100%" height={350}>
                <LineChart data={scoreData}>
                    <CartesianGrid strokeDasharray="3 3"/>

                    <XAxis
                        dataKey="x"
                        type="number"
                        name="Game"
                        domain={[1, 20]}
                        tickFormatter={(val) => `${val}`}
                    />

                    <YAxis name="Score" domain={[minScore, "auto"]}/>

                    <Tooltip
                        labelFormatter={(label, payload) => {
                            const item = payload?.[0]?.payload;
                            return item ? new Date(item.timestamp * 1000).toLocaleString() : label;
                        }}
                        formatter={(value, name) => [
                            value,
                            name,
                        ]}
                    />

                    <Legend/>

                    <Line
                        type="monotone"
                        dataKey="y"
                        name="Score"
                        stroke="#8884d8"
                        strokeWidth={2}
                        dot={{r: 6}}
                        isAnimationActive={true}
                        animationDuration={1500}
                        animationEasing="ease-in-out"
                    />

                    <Line
                        type="monotone"
                        dataKey="record"
                        name="Season Best"
                        stroke="#FF0000"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={false}
                        isAnimationActive={true}
                        animationDuration={1500}
                        animationEasing="ease-in-out"
                    />
                    <Line
                        type="monotone"
                        dataKey="allTimeRecord"
                        name="All Time Best"
                        stroke="#FDDE2B"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={false}
                        isAnimationActive={true}
                        animationDuration={1500}
                        animationEasing="ease-in-out"
                    />
                </LineChart>
            </ResponsiveContainer>
        </Paper>
    );
};
