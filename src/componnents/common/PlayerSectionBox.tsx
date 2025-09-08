import Box from "@mui/material/Box";

const PlayerSectionBox = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "10px"
        }}
    >
        <h2 style={{ marginBottom: "5px" }}>{title}</h2>
        <Box
            sx={{
                border: "solid 2px #FDDE2B",
                transform: "skew(-21deg)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                width: "300px",
                height: "250px"
            }}
        >
            {children}
        </Box>
    </Box>
);

export default PlayerSectionBox;