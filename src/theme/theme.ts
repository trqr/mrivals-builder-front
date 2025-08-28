import {createTheme} from "@mui/material";

const theme = createTheme({
    palette: {
        mode: "dark",
        background: {
            default: "#343345",
            paper: "#1e1e2f",
        },
        primary: {
            main: "#f4e543",
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
    components: {
        // Name of the component
        MuiButton: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    fontSize: '1rem',
                    color: 'darkgrey',
                    clipPath: 'polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)',
                    borderRadius: '0px',
                },
            },
        },
    },
});


export default theme;