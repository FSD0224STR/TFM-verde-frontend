import { createContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
export const WebSocketsContext = createContext();

export default function WebsocketsContextProvider({ children }) {

   const [userConnected, setUserConnected] = useState([])
   const [disconnectedUser, setDisconnectedUser] = useState(null)
   const VITE_HOSTING_BACKEND = import.meta.env.VITE_HOSTING_BACK
   const newSocket = io(VITE_HOSTING_BACKEND)
   const [socket, setSocket] = useState(newSocket)
   const token = localStorage.getItem('access_token')

   useEffect(() => {
      //const newSocket = io(VITE_HOSTING_BACKEND)
      //setSocket(newSocket)
      socket.on('connect', () => {
         console.log('Conectado al servidor')
      })
      socket.on('loginSuccess', data => onLoginSuccess(data))
      socket.on('userDisconnected', data => onUserDisconnected(data))
      socket.on('userBroadcast', data => updateUserConnected(data))
      socket.on('disconnect', () => {
         console.log('Disconnected from backend')
      });
      return () => {
         socket.off('loginSuccess', onLoginSuccess)
         socket.off('userDisconnected', onUserDisconnected);
         socket.off('userBroadcast', updateUserConnected)
      };
   }, []);

   function onLoginSuccess(data) {
      console.log('data', data)
      if (Object.keys(data).length === 0) {
         return
      }
      setUserConnected(prevUserConnected => {
         //console.log('esto es prev', prevUserConnected)
         const userExists = prevUserConnected.some(user => user === data)
         if (!userExists) {
            return [...prevUserConnected, data]
         }
         return prevUserConnected
      });
      //console.log('loginSuccess', userConnected);
   }

   function onUserDisconnected(data) {
      //console.log('Usuario desconectado:', data);
      setUserConnected(prevUserConnected => {
         const datos = prevUserConnected.filter(user => user !== data)
         //console.log('datos antes de añadir a userConnected', datos)
         return datos
      })
      setDisconnectedUser(data)

      //socket.disconnect(); // Desconectar el socket explícitamente
      //setUserConnected([]);

   }
   useEffect(() => {
      // console.log('Usuarios conectados despues de cerrar sesión', userConnected);
      socket.emit('userBroadcast', userConnected);
   }, [disconnectedUser])

   const updateUserConnected = (data) => {
      //console.log('userBroadcast', data)
      setUserConnected(data)
   }

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