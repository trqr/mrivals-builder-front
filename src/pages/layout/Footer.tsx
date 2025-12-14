
import { Box, Typography } from "@mui/material";

const Footer = () => {
    return (
        <Box sx={{
            width: "100%",
            textAlign: "center",
            py: 2,
            mt: 4,
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            opacity: 0.6
        }}>
            <Typography variant="body2" color="text.secondary">
                © {new Date().getFullYear()} Marvel Rivals Builder. All rights reserved.
            </Typography>
        </Box>
    );
};

export default Footer;
