import { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client'
export const WebSocketsContext = createContext();

export default function WebsocketsContextProvider({ children }) {

   const [userConnected, setUserConnected] = useState([])
   const VITE_HOSTING_BACKEND = import.meta.env.VITE_HOSTING_BACK
   const socket = io(VITE_HOSTING_BACKEND)
   const token = localStorage.getItem('access_token')
   /* const socket = io({
      autoConnect: false
   }); */

   function onLoginSuccess(data) {
      console.log('data', data)
      if (!data) {
         return
      }
      setUserConnected(prevUserConnected => {
         //console.log('esto es prev', prevUserConnected)
         const userExists = prevUserConnected.some(user => user === data);
         if (!userExists) {
            return [...prevUserConnected, data];
         }
         return prevUserConnected;
      });
      //console.log('loginSuccess', userConnected);
   }

   function onUserDisconnected(data) {
      console.log('Usuario desconectado:', data);
      setUserConnected(prevUserConnected => {
         const datos = prevUserConnected.filter(user => user !== data)
         console.log('prevUserConnected', datos)
      });
      console.log('ejecutando disconect socker', userConnected)
      socket.emit('userDisconnected', userConnected)
      //socket.disconnect(); // Desconectar el socket explícitamente
      setUserConnected([]);

   }



   useEffect(() => {
      //   function onConnect() {
      //      setIsConnected(true);
      //   }
      socket.on('connect', () => {
         console.log('Conectado al servidor');
         //socket.on('loginSuccess', onLoginSuccess)

         /* socket.off('connection', () => {
            console.log('Desconectado del servidor');
         }) */
      })

      socket.on('disconnect', () => {
         console.log('Disconnected from backend');
      });




      return () => {
         //  socket.off('connect', onConnect);
         socket.off('userDisconnected', onUserDisconnected);
         socket.off('loginSuccess', onLoginSuccess);
      };
   }, []);

   useEffect(() => {
      socket.on('loginSuccess', onLoginSuccess)
   }, [userConnected]);

   const webSocketsContextValue = {
      userConnected,
      setUserConnected,
      token,
      onLoginSuccess,
      onUserDisconnected,
      socket
   }
   return (

      <WebSocketsContext.Provider value={webSocketsContextValue}>
         {children}
      </WebSocketsContext.Provider>
   )
}
