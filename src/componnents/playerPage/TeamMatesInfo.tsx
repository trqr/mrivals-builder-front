import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {imageBaseUrl} from "../../api/axios.config.ts";
import {useUserData} from "../../hooks/useUserData.tsx";
import {Grid} from "@mui/material";

export const TeamMatesInfo = () => {
    // @ts-expect-error bien dans le context
    const {userGameStats} = useUserData();

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Team Mates
            </Typography>
            <Grid container spacing={1} sx={{display: "flex", flexWrap: "wrap"}}>
                {userGameStats.team_mates.slice(0, 6).map((mate: any, index: number) => (
                    <Grid
                        key={index}
                        size={{ xl: 6}}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            border: "solid 2px #FDDE2B",
                            transform: "skew(-21deg)",
                            p: 1.5,
                            width: "220px",
                            boxShadow: 2,
                        }}
                    >
                        <img
                            src={imageBaseUrl + mate.player_info.player_icon}
                            alt={mate.player_info.nick_name}
                            style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                transform: "skew(21deg)",
                                margin: "2px",
                                marginRight: "30px",
                            }}
                        />
                        <Box sx={{
                            transform: "skew(21deg)",
                        }}>
                            <Typography fontWeight="bold">{mate.player_info.nick_name}</Typography>
                            <Typography>Matches: {mate.matches}</Typography>
                            <Typography>Wins: {mate.wins}</Typography>
                            <Typography>Win Rate: {mate.win_rate}%</Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}