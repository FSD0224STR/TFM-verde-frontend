
import NavigationMenu from '../components/Menu/NavigationMenu'
import ListMessages from '../components/ListMessages/ListMessages'
import { useContext, useEffect } from 'react'
import { MessagesContext } from '../context/messagesContext'
import { Box, CircularProgress } from '@mui/material'
import { LoginContextP } from '../context/loginContextPrueba'
import { useState } from 'react'
import { WebSocketsContext } from '../context/websocketsContext'

export default function MessagesPage() {

   const { allConversation, getListMessages } = useContext(MessagesContext)
   const { profileDetails, setIsLoggedIn } = useContext(LoginContextP)
   const { userConnected } = useContext(WebSocketsContext)
   console.log("Usuarios conectados en este momento", userConnected)
   const token = localStorage.getItem('access_token')

   useEffect(() => {

      if (token) setIsLoggedIn(true)
      if (profileDetails) {
         getListMessages()
      }
   }, [profileDetails]);


   return (
      <>
         {/* {console.log('esto es all conversation en page',allConversation)} */}
         {profileDetails && allConversation ?
            <>
               <NavigationMenu />
               <ListMessages />
            </>
            :
            <Box sx={{
               display: 'flex', height: '100vh', justifyContent: 'center',
               alignItems: 'center'
            }}>
               <CircularProgress size={130} sx={{ color: 'white' }} />
            </Box>}

      </>
   )
}
