import { createTheme } from "@mui/material"
import colors from "../sass/_colors.scss"

export const useMuiTheme = () => {
    const THEME = createTheme({
        typography: {
            //  "fontFamily": ["Poppins"].join(','),
            //  "fontSize": 14,
            //  "fontWeightLight": 300,
            //  "fontWeightRegular": 400,
            //  "fontWeightMedium": 500
        },
        palette: {
            // mode: 'dark',

            primary: {
                main: colors.primary,
            },
            secondary: {
                main: "#ffffff",
            },
            text: {
                primary: colors.primary,
                // secondary: colors.primary,
                // disabled: colors.primary,
            },
            // success: {
            //     main: colors.green,
            // },
            // error: {
            //     main: colors.red,
            // }
        },
    })

    return THEME
}
