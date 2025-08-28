import {createTheme} from "@mui/material";



const theme = createTheme({
    palette: {
        mode: "dark",
        background: {
            default: "#343345",
            paper: "#1e1e2f",
        },
        primary: {
            main: "#FDDE2B",
            contrastText: "#FFFFFF",
        },
        secondary: {
            main: "#535755",
        },
        divider: "#000000",
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
                    clipPath: 'polygon(15px 0, 100% 0, calc(100% - 15px) 100%, 0 100%)',
                    borderRadius: '0px',
                },
            },
            variants: [
                {
                    props: { variant: 'contained'} ,
                    style: {
                        boxShadow: '10px 5px 2px black'},
                }],
            },
        },
});


export default theme;