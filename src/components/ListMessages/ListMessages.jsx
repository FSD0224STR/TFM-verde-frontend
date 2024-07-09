import {
   Box,
   CircularProgress,
   Grid,
   Typography,
} from '@mui/material';
import ComponentMessageList from './ComponentMessageList';
import { useContext} from 'react';
import EmailIcon from '@mui/icons-material/Email';
import { MessagesContext } from '../../context/messagesContext';
import ComponentChatBox from './ComponentChatBox';

export default function ListMessages() {
   
   const { allConversation,openMessage,loadingChat } = useContext(MessagesContext);
   // console.log('esto es allConvertaion en component',allConversation)
   const infoUser = allConversation
   // console.log('esto es infoUser',infoUser)
   return (
      <Grid
         container
         sx={{
            bgcolor: 'white',
            maxWidth: '85%',
            minHeight: '83vh',
            mx: '4rem',
            mt: '2rem',
            borderRadius: 2,
         }}
      >
         {allConversation ? (
            <>
               <Grid
                  item
                  xs={12}
                  md={4}
                  sx={{ bgcolor: '#ddeced', color: 'primary.main', borderRadius: 2 }}
               >
                  <Box sx={{borderBottom:4}}>

                     <Typography
                        variant="h4"
                        sx={{
                           fontWeight: 'bold',
                           textAlign: 'center',
                           m: '2rem',
                           
                        }}
                     >
              Bandeja de entrada
                     </Typography>
                  </Box>
                  {allConversation?.map(chat => {
                     let checkLastMessage = chat.idMensage[0]
                     if (!checkLastMessage) {
                        checkLastMessage = { message: 'No hay mensajes ' }
                        return <ComponentChatBox  key={chat._id} members={chat.members} lastmessage={checkLastMessage} />
                     } else {
                        return  <ComponentChatBox  key={chat._id} members={chat.members} lastmessage={checkLastMessage} />
                     }

                  })}
               </Grid>
               <Grid
                  item
                  xs={12}
                  md={8}
                  sx={{
                     display: 'flex',
                     justifyContent: 'center',
                     alignItems: 'center',
                     minHeight:'80vh'
                  }}
               >
                  {openMessage === true && loadingChat === false ? (
                     <ComponentMessageList />
                  ) : (
                     loadingChat ? <CircularProgress size={130}/> : 
                        <Grid
                           item
                           sx={{
                              color: 'primary.main',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                           }}
                        >
                           <EmailIcon sx={{ fontSize: 120 }} />

                           <Typography variant="h2" sx={{ fontWeight: 'bold',textAlign:'center' }}>
                  Ningún mensaje seleccionado
                           </Typography>
                           <Typography
                              variant="h6"
                              sx={{ textAlign: 'center', m: '1rem', fontSize: '1.5rem' }}
                           >
                  Escoge una conversacion a la Izquierda para empezar
                           </Typography>
                        </Grid>
                  )}
               </Grid>
            </>
         ) : (
            <Grid
               container
               sx={{
                  bgcolor: 'white',
                  maxWidth: '85%',
                  minHeight: '83vh',
                  mx: '4rem',
                  mt: '4.2rem',
                  borderRadius: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
               }}
            >
          
               <CircularProgress size={130} sx={{ color: 'primary.main' }} />
         
            </Grid>
         )}
      </Grid>
   );
}
