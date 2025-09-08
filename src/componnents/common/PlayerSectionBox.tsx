import Box from "@mui/material/Box";

const PlayerSectionBox = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <>
        <h2 style={{ textAlign: "center", marginBottom: "5px" }}>{title}</h2>
        <Box style={{
            border: "solid 2px #FDDE2B",
            transform: "skew(-21deg)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: "300px",
            maxHeight: "300px",
            margin: "10px"
        }}>
            {children}
        </Box>
    </>
);

export default PlayerSectionBox;
