import { createTheme } from "@mui/material";



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
            secondary: "#ffffffff",
        },
    },
    typography: {
        h1: { fontFamily: "Avenger, Arial, sans-serif", letterSpacing: 1.5 },
        h2: { fontFamily: "Avenger, Arial, sans-serif", letterSpacing: 1.5 },
        h3: { fontFamily: "Avenger, Arial, sans-serif", letterSpacing: 1.5 },
        h4: { fontFamily: "Avenger, Arial, sans-serif", letterSpacing: 1.5 },
        h5: { fontFamily: "Avenger, Arial, sans-serif", letterSpacing: 1.5 },
        h6: { fontFamily: "Avenger, Arial, sans-serif", letterSpacing: 1.5 },
    },
    components: {
        // Name of the component
        MuiButton: {
            variants: [
                {
                    props: { variant: 'contained' },
                    style: {
                        fontSize: '1rem',
                        color: '#222222ff',
                        clipPath: 'polygon(15px 0, 100% 0, calc(100% - 15px) 100%, 0 100%)',
                        borderRadius: '0px',
                    },
                },
                {
                    props: { variant: "outlined" },
                    style: ({ theme }) => ({
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