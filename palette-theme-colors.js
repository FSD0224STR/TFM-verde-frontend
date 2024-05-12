import { createTheme } from '@mui/material'


export const main_theme= createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#163938',//color nav bar y footer 
      contrastText: '#ffffff' 
    },
    secondary: {
      main: '#2A9D8F',
    },
    background: {
      default: '#1D6B68', //Color elegido por nosotros
      secondary: '#ffffff'
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
    divider: 'rgba(9,144,8,0.12)',
  },
});