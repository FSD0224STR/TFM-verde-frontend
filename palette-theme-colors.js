import { createTheme } from '@mui/material'

export const main_theme= createTheme({
        palette: {
                mode: 'light',
                primary: {
                        main: '#163938',
                        contrastText: '#ffffff' 
                },
                secondary: {
                        main: '#2A9D8F',
                        contrastText: '#ffffff',
                        variante:'#338DB8'
      
                },
                background: {
                        default: '#1D6B68', 
                        secondary: '#ffffff',
                        nav:'rgb(39, 143, 139, 0.5)',
                        avatar:'#fff9'
                },
                text: {
                        primary: '#ffffff',
                        secondary:'#278F8B'
                },
                error: {
                        main: '#d32f2f',
                },
                warning: {
                        main: '#a05314',
                },
                success: {
                        main: '#187d1a',
                },
                divider: 'rgba(9,144,8,0.3)',
                stack: {
                        primary:'#92cbdf',
                        secondary:'#6fb260'
                },
        },
});
