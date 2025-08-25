import {createTheme} from "@mui/material";

const theme = createTheme({
    colorSchemes: {
        light: {
            palette: {
                mode: 'light',
                primary: {
                    main: '#7155e1',
                },
                secondary: {
                    main: '#c32581',
                },
                background: {
                    default: '#cfcfcf',
                },
                text: {
                    primary: '#000000',
                    secondary: '#000000',
                },
                divider: '#7155e1',
                action: {}
            },
        },
        dark: {
            palette: {
                mode: 'dark',
                primary: {
                    main: '#28c7d6',
                },
                secondary: {
                    main: '#58b697',
                },
                divider: '#28c7d6',
            },
        },
    },
});

export default theme;