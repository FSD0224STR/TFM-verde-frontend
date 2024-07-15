
import NavigationMenu from '../components/Menu/NavigationMenu'
import ListMessages from '../components/ListMessages/ListMessages'
import { useContext, useEffect } from 'react'
import { MessagesContext } from '../context/messagesContext'
import { Box, CircularProgress } from '@mui/material'
import { LoginContextP } from '../context/loginContextPrueba'
import { EventContext } from '../context/eventContext'
import { useParams } from 'react-router-dom'

export default function MessagesPage() {

   const {loggedUserId}=useParams()

   const { allConversation, getListMessages } = useContext(MessagesContext)
   const { profileDetails, setIsLoggedIn } = useContext(LoginContextP)
   const {getListEventsUser,fetchAllEvent} = useContext(EventContext)

   useEffect(() => {
      if (loggedUserId) {

         console.log('Estoy entrando en el usseEffect de MessagePage para ver getListEventsInterested')         
         const getListEventsInterested  = async () => {
   
            const listEvents=await getListEventsUser(loggedUserId)
            const response=await fetchAllEvent(listEvents)
         };
         getListEventsInterested()
      }
   }, []);

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
