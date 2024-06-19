
import NavigationMenu from '../components/Menu/NavigationMenu'
import ListMessages from '../components/ListMessages/ListMessages'
import { useContext, useEffect } from 'react'
import { MessagesContext } from '../context/messagesContext'
import { Box, CircularProgress } from '@mui/material'

export default function MessagesPage() {
   const { allConversation,getListMessages } = useContext(MessagesContext)
   
   useEffect(() => {
      
      getListMessages()
   }, []);

   return (
      <>
         {console.log('esto es all conversation en page',allConversation)}
         <NavigationMenu />
         {allConversation.length > 0 ?
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
