import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
import {ScoreEvoGraph} from "./graphs/ScoreEvoGraph.tsx";


export const GraphsBox = () => {
    const [value, setValue] = React.useState(0);

    const renderGraph = () => {
        switch (value) {
            case 0:
                return <ScoreEvoGraph/>;
            case 1:
                return <ScoreEvoGraph/>;
            case 2:
                return <ScoreEvoGraph/>;
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
                    <BottomNavigationAction label="Recents" icon={<RestoreIcon/>}/>
                    <BottomNavigationAction label="Favorites" icon={<FavoriteIcon/>}/>
                    <BottomNavigationAction label="Archive" icon={<ArchiveIcon/>}/>
                </BottomNavigation>
            </Paper>
        </Box>
    );
};