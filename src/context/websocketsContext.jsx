import { createContext, useState } from 'react';

export const WebSocketsContext = createContext();

export default function WebsocketsContextProvider({ children }) {

   const [isConnected, setIsConnected] = useState(false)
    
   const webSocketsContextValue = {
      isConnected  
   }
   return (
       
      <WebSocketsContext.Provider value={webSocketsContextValue}>
         {children}
      </WebSocketsContext.Provider>
   )
}
