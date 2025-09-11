import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const PlayerSectionBox = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <Box
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
    </Box>
);

export default PlayerSectionBox;