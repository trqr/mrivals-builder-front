import {createTheme} from "@mui/material";

const theme = createTheme({
    palette: {
        mode: "dark",
        background: {
            default: "#343345",
            paper: "#1e1e2f",
        },
        primary: {
            main: "#8B8B8B",
        },
        secondary: {
            main: "#58b697",
        },
        divider: "#28c7d6",
        text: {
            primary: "#ffffff",
            secondary: "#b3b3b3",
        },
    },
});


export default theme;