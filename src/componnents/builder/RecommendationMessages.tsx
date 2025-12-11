import Box from "@mui/material/Box";
import {Paper, Typography} from "@mui/material";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

const RecommendationMessages = ({messages}) => {
    return (
        <Box>
            {Object.values(messages).some(msg => msg) && (
                <Paper elevation={1} square sx={{margin: "30px", padding: "5px"}}>
                    {messages.archetype && (
                        <Typography sx={{display: "flex", alignItems: "center", margin: "5px"}}
                                    variant="subtitle2">
                            <PriorityHighIcon color="error"/>
                            {messages.archetype}
                        </Typography>
                    )}
                    {messages.mainTank && (
                        <Typography sx={{display: "flex", alignItems: "center", margin: "5px"}}
                                    variant="subtitle2">
                            <PriorityHighIcon color="error"/>
                            {messages.mainTank}
                        </Typography>
                    )}
                    {messages.mainHeal && (
                        <Typography sx={{display: "flex", alignItems: "center", margin: "5px"}}
                                    variant="subtitle2">
                            <PriorityHighIcon color="error"/>
                            {messages.mainHeal}
                        </Typography>
                    )}
                    {messages.ban && (
                        <Typography sx={{display: "flex", alignItems: "center", margin: "5px"}}
                                    variant="subtitle2">
                            <PriorityHighIcon color="error"/>
                            {messages.ban}
                        </Typography>
                    )}
                </Paper>
            )}
        </Box>
    );
};

export default RecommendationMessages;
