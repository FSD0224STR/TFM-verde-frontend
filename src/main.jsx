
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { main_theme } from '../palette-theme-colors.js';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { LoginContextProviderP } from './context/loginContextPrueba.jsx';
import { UserContextProvider } from './context/userContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
       
        <ThemeProvider theme={main_theme}>
                <BrowserRouter>
                        <LoginContextProviderP>
                                <UserContextProvider>
                                        <CssBaseline />
                                        <App />
                                </UserContextProvider>

                        </LoginContextProviderP> 
                  
                </BrowserRouter>
        </ThemeProvider>
      
);
