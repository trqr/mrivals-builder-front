import Box from "@mui/material/Box";
import {useCompo} from "../../hooks/useCompo.tsx";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import {Paper} from "@mui/material";
import Typography from "@mui/material/Typography";

const RecommendationMessages = ({messages}) => {
    const {compo} = useCompo();


    return (
        <Box>
            {compo.length > 0 &&
                <Paper elevation={1} square sx={{margin: "30px", padding: "5px"}}>
                    {messages.archetype &&
                        <Typography sx={{display: "flex", alignItems: "center"}}
                                    variant={"subtitle2"}>
                            <PriorityHighIcon color={"error"}/>
                            {messages.archetype}
                        </Typography>
                    }
                    {messages.mainTank &&
                        <Typography sx={{display: "flex", alignItems: "center"}}
                                    variant={"subtitle2"}>
                            <PriorityHighIcon color={"error"}/>
                            {messages.mainTank}
                        </Typography>
                    }
                    {messages.mainHeal &&
                        <Typography sx={{display: "flex", alignItems: "center"}}
                                    variant={"subtitle2"}>
                            <PriorityHighIcon color={"error"}/>
                            {messages.mainHeal}
                        </Typography>
                    }
                    {messages.ban &&
                        <Typography sx={{display: "flex", alignItems: "center"}}
                                    variant={"subtitle2"}>
                            <PriorityHighIcon color={"error"}/>
                            {messages.ban}
                        </Typography>
                    }
                </Paper>
            }
        </Box>
    )
}

export default RecommendationMessages