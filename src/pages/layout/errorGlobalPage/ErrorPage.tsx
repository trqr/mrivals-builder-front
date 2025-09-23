import { Container, Paper, Typography, Button, Box } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useLocation, useNavigate } from "react-router-dom";

export default function ErrorPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const error = (location.state as { error?: Error })?.error;

    return (
        <Container maxWidth="sm">
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Paper elevation={6} sx={{ p: 4, textAlign: "center" }}>
                    <ErrorOutlineIcon sx={{ fontSize: 60, color: "error.main", mb: 2 }} />
                    <Typography variant="h4" color="error" gutterBottom>
                        Oops, something went wrong...
                    </Typography>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                        {error?.message || "Unknown error"}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate("/", { replace: true })}
                        sx={{ mt: 2 }}
                    >
                        Back to Home
                    </Button>
                </Paper>
            </Box>
        </Container>
    );
}
