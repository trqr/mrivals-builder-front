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
                background: {
                    default: '#343345'
                },
                primary: {
                    main: '#8B8B8B',
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