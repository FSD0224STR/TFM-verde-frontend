import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssBaseline, ThemeProvider } from '@mui/material';
import App from './App.jsx'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css'
import { main_theme } from '../palette-theme-colors.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   

    <ThemeProvider theme={main_theme}>
    <CssBaseline/>
      </ThemeProvider>
    <App />

  </React.StrictMode>,
)
