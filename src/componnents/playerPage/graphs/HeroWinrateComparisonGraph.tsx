import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,} from "recharts";
import {Paper} from "@mui/material";
import {useData} from "../../../hooks/useData.tsx";
import {useUserData} from "../../../hooks/useUserData.tsx";
import Typography from "@mui/material/Typography";


export const HeroWinrateComparisonGraph = () => {
    // @ts-expect-error bien dans le context
    const {heroes} = useData();
    // @ts-expect-error bien dans le context
    const {userGameStats} = useUserData();

    const filteredData = userGameStats.heroes_ranked.filter((hero) => hero.matches !== 0)

    const data = filteredData.map((hero) => {

        const matchingHero = heroes.find(
            (h) => h.externalId === hero.hero_id
        );

        const playerWinrate =
            matchingHero && hero.matches > 0
                ? (hero.wins / hero.matches) * 100
                : 0;

        const avgWinrate = matchingHero.winRate * 100;

        return {
            name: matchingHero.name,
            player: playerWinrate.toFixed(2),
            average: avgWinrate.toFixed(2),
        };

    });


    return (
        <Paper style={{padding: 10}}>
            <Typography variant={"h5"} sx={{textAlign: "center", p: 1}}>Hero win rate comparison</Typography>
            <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis domain={[0, 100]} tickFormatter={(val) => `${val}%`}/>
                    <Tooltip formatter={(value) => `${value}%`}/>
                    <Legend/>

                    <Bar dataKey="player" fill="#8884d8" name="Your win rate"/>
                    <Bar dataKey="average" fill="#82ca9d" name="Average win rate"/>
                </BarChart>
            </ResponsiveContainer>
        </Paper>
    );
};
