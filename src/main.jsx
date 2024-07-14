
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
import { UserContextProvider } from './context/userContext.jsx';
import { LoginContextProviderP } from './context/loginContextPrueba.jsx';
import { LocationContextProvider } from './context/locationContext.jsx';
import { EventContextProvider } from './context/eventContext.jsx';
import MessagesContextProvider from './context/messagesContext.jsx';
import WebsocketsContextProvider from './context/websocketsContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(

   <ThemeProvider theme={main_theme}>
      <BrowserRouter>
         <WebsocketsContextProvider>
            <LoginContextProviderP>
               <LocationContextProvider>
                  <EventContextProvider>
                     <UserContextProvider>
                        <MessagesContextProvider>

                           <CssBaseline />

                           <App />

                        </MessagesContextProvider>
                     </UserContextProvider>
                  </EventContextProvider>
               </LocationContextProvider>
            </LoginContextProviderP>
         </WebsocketsContextProvider>
      </BrowserRouter>
   </ThemeProvider>

);
