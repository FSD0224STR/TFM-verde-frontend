
import NavigationMenu from '../components/Menu/NavigationMenu'
import ListMessages from '../components/ListMessages/ListMessages'
import { useContext, useEffect } from 'react'
import { MessagesContext } from '../context/messagesContext'
import { Box, CircularProgress } from '@mui/material'
import { LoginContextP } from '../context/loginContextPrueba'

export default function MessagesPage() {
   const { allConversation, getListMessages } = useContext(MessagesContext)
   const {profileDetails} = useContext(LoginContextP)
   
   useEffect(() => {
      
      if (profileDetails) {
         getListMessages()
      }
     
   }, [profileDetails]);

   return (
      <>
         {console.log('esto es all conversation en page',allConversation)}
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
