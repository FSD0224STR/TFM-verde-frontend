import { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client'
export const WebSocketsContext = createContext();
const VITE_HOSTING_BACKEND=import.meta.env.VITE_HOSTING_BACK
const socket = io(VITE_HOSTING_BACKEND)
export default function WebsocketsContextProvider({ children }) {

   const [userConnected, setUserConnected] = useState([])
   const socket = io({
      autoConnect: false
   });
   
   function onLoginSuccess(data) {
      console.log('data',data)
      setUserConnected(prevUserConnected => {
         console.log('esto es prev',prevUserConnected)
         const userExists = prevUserConnected.some(user => user === data.idProfile);
         if (!userExists) {
            return [...prevUserConnected, data.idProfile];
         }
         return prevUserConnected;
      });
      console.log('loginSuccess', userConnected);
   }

   function onUserDisconnected(data) {
      console.log('Usuario desconectado:', data.idProfile);
      setUserConnected(prevUserConnected => prevUserConnected.filter(user => user !== data.idProfile));
   }

   function onLogoutSocket() {
      console.log('ejecutando disconect socker')
      socket.disconnect(); // Desconectar el socket explícitamente
      setUserConnected([]);
   }

   useEffect(() => {
      //   function onConnect() {
      //      setIsConnected(true);
      //   }
    
      socket.on('userDisconnected', onUserDisconnected);
      socket.on('loginSuccess', onLoginSuccess);
    
      return () => {
         //  socket.off('connect', onConnect);
         socket.off('userDisconnected', onUserDisconnected);
         socket.off('loginSuccess', onLoginSuccess);
      };
   }, []);
    
   const webSocketsContextValue = {
      userConnected,
      setUserConnected,
      onLogoutSocket
   }
   return (
       
      <WebSocketsContext.Provider value={webSocketsContextValue}>
         {children}
      </WebSocketsContext.Provider>
   )
}
