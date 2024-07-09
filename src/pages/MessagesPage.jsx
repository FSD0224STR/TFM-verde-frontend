
import NavigationMenu from '../components/Menu/NavigationMenu'
import ListMessages from '../components/ListMessages/ListMessages'
import { useContext, useEffect } from 'react'
import { MessagesContext } from '../context/messagesContext'
import { Box, CircularProgress } from '@mui/material'
import { LoginContextP } from '../context/loginContextPrueba'
import { io } from 'socket.io-client'
import { WebSocketsContext } from '../context/websocketsContext'

const VITE_HOSTING_BACKEND=import.meta.env.VITE_HOSTING_BACK
const socket = io(VITE_HOSTING_BACKEND)

export default function MessagesPage() {
   const {isConnected} = useContext(WebSocketsContext)
   const { allConversation, getListMessages } = useContext(MessagesContext)
   const { profileDetails, setIsLoggedIn } = useContext(LoginContextP)
   
   useEffect(() => {
      const token = localStorage.getItem('access_token');
      if(token)setIsLoggedIn(true)
      if (profileDetails) {
         getListMessages()
      }
   }, [profileDetails]);

   return (
      <>
         {/* {console.log('esto es all conversation en page',allConversation)} */}
         <NavigationMenu />
         {profileDetails && allConversation?
            <ListMessages />
            :
            <Box sx={{
               display: 'flex', height: '100vh', justifyContent: 'center',
               alignItems:'center'}}>
               <CircularProgress size={130}  sx={{color:'white'}} />
            </Box>}  
         
      </>
   )
}
