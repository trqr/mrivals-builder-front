import {Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import InfoIcon from "@mui/icons-material/Info";

const StartMessage = () => {
    return (
        <Paper elevation={1} square sx={{
            margin: "30px", padding: "5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Typography sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "5px"
            }}
                        variant="subtitle1">
                <InfoIcon color="primary" sx={{marginRight: "5px"}}/>
                Start building by dragging a hero !
            </Typography>
        </Paper>
    )
}

export default StartMessage;