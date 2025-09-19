import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Grid} from "@mui/material";

const PlayerSectionBox = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <Grid size={{xs: 12, md: 12, xl: 3, lg: 3}}
        sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}
    >
        <Typography variant="h5" gutterBottom>
            {title}
        </Typography>
        <Box
            sx={{
                padding: "1rem",
                border: "solid 2px #FDDE2B",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                width: "250px",
                height: "250px",
                boxShadow: 4,
            }}
        >   {children}
        </Box>
    </Grid>
);

export default PlayerSectionBox;