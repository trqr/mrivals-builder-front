import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import {ScoreEvoGraph} from "./graphs/ScoreEvoGraph.tsx";
import {HeroUsageGraph} from "./graphs/HeroUsageGraph.tsx";
import ShowChartIcon from '@mui/icons-material/ShowChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import {HeroWinrateComparison} from "./graphs/HeroWinrateComparison.tsx";


export const GraphsBox = () => {
    const [value, setValue] = React.useState(0);

    const renderGraph = () => {
        switch (value) {
            case 0:
                return <ScoreEvoGraph/>;
            case 1:
                return <HeroUsageGraph/>;
            case 2:
                return <HeroWinrateComparison/>;
            default:
                return null;
        }
    };

    return (
        <Box sx={{pb: 7, position: "relative"}}>

            <Box>{renderGraph()}</Box>

            <Paper
                sx={{position: "absolute", bottom: 0, left: 0, right: 0}}
                elevation={3}
            >
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction label="MMR Evolution" icon={<ShowChartIcon/>}/>
                    <BottomNavigationAction label="Hero Pick Rate" icon={<PieChartIcon/>}/>
                    <BottomNavigationAction label="Role Win Rate" icon={<BarChartIcon/>}/>
                </BottomNavigation>
            </Paper>
        </Box>
    );
};