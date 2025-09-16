import {Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";
import {Paper} from "@mui/material";
import type {HeroRanked} from "../../../@types/PlayerType/HeroesRankedType.ts";
import Typography from "@mui/material/Typography";

const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7f50",
    "#00c49f",
    "#0088fe",
    "#a28bfe",
    "#ffb6c1",
    "#ff4500",
    "#32cd32",
    "#20b2aa",
    "#ffd700",
];
export const HeroUsageGraph = ({playerStats}) => {

    const filteredStats = playerStats.heroes_ranked.filter((h) => h.matches > 0 );

    const data = filteredStats.map((hero: HeroRanked) => ({
        name: hero.hero_name,
        value: hero.matches,
        percent: ((hero.matches / playerStats.overall_stats.ranked.total_matches) * 100).toFixed(1),
    }));

    return (
        <Paper style={{padding: 10}}>
            <Typography variant={"h5"} sx={{textAlign: "center", p: 1}}>Hero picking rate</Typography>
            <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        label={(entry) => `${entry.name} (${entry.value})`}
                    >
                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]}/>
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value: number, name: string, entry: any) =>
                            [`${entry.payload.percent}% (${value} games)`, name]
                        }
                    />
                    <Legend/>
                </PieChart>
            </ResponsiveContainer>
        </Paper>
    );
};
