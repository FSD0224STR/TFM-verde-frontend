import { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client'
export const WebSocketsContext = createContext();

export default function WebsocketsContextProvider({ children }) {

   const [userConnected, setUserConnected] = useState([])
   const [socket, setSocket] = useState(null)
   const VITE_HOSTING_BACKEND = import.meta.env.VITE_HOSTING_BACK
   const token = localStorage.getItem('access_token')
   const newSocket = io(VITE_HOSTING_BACKEND)
   /* const socket = io({
      autoConnect: false
   }); */

   function onLoginSuccess(data) {
      console.log('data', data)
      if (Object.keys(data).length === 0) {
         //Object.keys(data).length === 0
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
         console.log('datos antes de añadir a userConnected', datos)
         if (!datos) {
            return [...prevUserConnected, data];
         }
         return datos
      })
      console.log('ejecutando disconect socker', userConnected)
      newSocket.emit('userBroadcast', userConnected)
      //socket.disconnect(); // Desconectar el socket explícitamente
      setUserConnected([]);

   }

   const updateUserConnected = (data) => {
      setUserConnected(data)
   }



   useEffect(() => {
      //   function onConnect() {
      //      setIsConnected(true);
      //   }

      setSocket(newSocket);
      newSocket.on('connect', () => {
         console.log('Conectado al servidor');
         //socket.on('loginSuccess', onLoginSuccess)

         /* socket.off('connection', () => {
            console.log('Desconectado del servidor');
         }) */
      })
      newSocket.on('userDisconnected', onUserDisconnected)
      newSocket.on('userBroadcast', updateUserConnected)
      newSocket.on('disconnect', () => {
         console.log('Disconnected from backend');
      });
      return () => {
         //  socket.off('connect', onConnect);
         newSocket.off('userDisconnected', onUserDisconnected);
         newSocket.off('loginSuccess', onLoginSuccess);
      };
   }, []);

   /* useEffect(() => {
      const newSocket = io(VITE_HOSTING_BACKEND)
      newSocket.on('loginSuccess', onLoginSuccess)
   }, [userConnected]); */

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
