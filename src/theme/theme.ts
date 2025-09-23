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
            secondary: "#e1dfdf",
        },
    },
    typography: {
        h1: { fontFamily: "Avenger, Arial, sans-serif" },
        h2: { fontFamily: "Avenger, Arial, sans-serif" },
        h3: { fontFamily: "Avenger, Arial, sans-serif" },
        h4: { fontFamily: "Avenger, Arial, sans-serif" },
        h5: { fontFamily: "Avenger, Arial, sans-serif" },
        h6: { fontFamily: "Avenger, Arial, sans-serif" },
    },
    components: {
        // Name of the component
        MuiButton: {
            variants: [
                {
                    props: { variant: 'contained'} ,
                    style: {
                        fontSize: '1rem',
                        color: '#3c3c3c',
                        clipPath: 'polygon(15px 0, 100% 0, calc(100% - 15px) 100%, 0 100%)',
                        borderRadius: '0px',},
                },
                {
                    props: {variant: "outlined"},
                    style: ({theme}) => ({
                        transform: "skew(-21deg)",
                        borderRadius: "0px",

                        "& .MuiButton-startIcon, & .MuiButton-endIcon, & span": {
                            transform: "skew(21deg)",
                        },
                    }),
                },],
            },
        },
});


export default theme;