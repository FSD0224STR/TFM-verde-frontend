import {
   Avatar,
   Box,
   Typography,
   TextField,
   Button,
   IconButton,
   CircularProgress,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
// import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import BoxMessageDestinatario from './BoxMessageDestinatario';
import BoxMessageRemitente from './BoxMessageRemitente';
import { useContext, useEffect, useRef, useState } from 'react';
import InvitationMessageText from './InvitationMessageText';
import { UserContext } from '../../context/userContext';
import { MessagesContext } from '../../context/messagesContext';
import { LoginContextP } from '../../context/loginContextPrueba';
import AlertRequest from './AlertRequest';
import { useNavigate } from 'react-router-dom';

export default function ComponentMessage({ setOpenMessage }) {

   const {
      message,
      setMessage,
      setSendMessage,
      messageSend,
      handleSendMessage,
      deleteMyConversation,
      // loadingChat,
      handleRequestCouple,
      invitationMessage,
      setInvitationMessage,
      resetBoxMessage,
      setResponseInvitation

   } = useContext(MessagesContext);
   const { userDetail } = useContext(UserContext);
   const { profileDetails } = useContext(LoginContextP);
   const [loadingChat, setloadingChat] = useState(false)
   const navigate = useNavigate()
   console.log('esto es invitationMessage', invitationMessage)
   useEffect(() => {
      console.log('entrando en use effect de reseteo')
      setResponseInvitation('')
      setInvitationMessage(false)
   }, []);

   useEffect(() => {

      setloadingChat(true)
      messageSend.forEach((msg) => {
         if ( msg.idRequest && msg.idRequest.status) {
            // if (msg.type === 'request' && msg.idRequest.status === 'Accepted') {
            //    console.log('estoy entrando para invitacion true')
            //    setInvitationMessage(true);
            // }
            if ((msg.type === 'request' && msg.idRequest.status === 'Pending')) {
               setInvitationMessage(true)
            }
         } else {
            setInvitationMessage(false)
         }
      })
      setloadingChat(false)
     
   }, [])

   //enviar mensajes presionando la tecla enter
   function keypress(e) {
      const keypress = e.keyCode;
      if (keypress === 13) return handleSendMessage();
   }
 
   //permacer el chat siempre abajo cuando se escribe //TODO MEJORAR ESTO QUE ESTA AFECTADBNO A TODA LA PAGINA

   const messagesEndRef = useRef(null);

   const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ block: 'end' });
   };

   useEffect(() => {
      scrollToBottom();
   }, [messageSend]);

   //informacion enviado para la request
   const dataForRequest = {
      sender: profileDetails._id,
      nameSender: profileDetails.name,
      subnameSender: profileDetails.subName,
      receiver: userDetail._id,
      nameReceiver: userDetail.name,
      subnamereceiver: userDetail.subName,
   };

   return (
      <Box
         onChange={scrollToBottom}
         component="section"
         bgcolor="#E2E6E4"
         borderRadius={2}
         sx={{
            width: '900px',
            minHeight: '750px',
            display: 'flex',
            mt: '1rem',
            mr: '1rem',
            flexDirection: 'column',
            p: '1rem',
         }}
      >
         <AlertRequest/>
         {loadingChat ?
            
            <Box sx={{
               display: 'flex', height: '100vh', justifyContent: 'center',
               alignItems: 'center'
            }}>
               <CircularProgress size={110} sx={{ color: 'primary.main' }} />
            </Box>
            :
            <>
               <Box width="100%" display="flex" p={1}>
                  <Box display="flex" flexGrow={1}>
                     <Avatar
                        sx={{ width: '40px', height: '40px' }}
                        alt="Profile"
                        src={userDetail.imgProfile}
                     />

                     <Typography
                        color="primary.main"
                        variant="h6"
                        sx={{ flexGrow: 1 }}
                        ml="1rem"
                        mt="0.4rem"
                     >
                        {userDetail.name} {userDetail.subName}
                     </Typography>
                  </Box>
                  <Box display="flex" minWidth="auto">

                     <Button
                        variant="contained"
                        sx={{ bgcolor: 'secondary.variante', p: '0.5rem', mr: '0.5rem',  }}
                        onClick={() => handleRequestCouple(dataForRequest)}
                        disabled={invitationMessage}
                     >
                           Invita a {userDetail.name} a este evento
                     </Button>
                     
                     <IconButton onClick={resetBoxMessage}>
                        <CancelIcon
                           color="primary"
                           sx={{ mr: '0.5rem', fontSize: '2rem' }}
                        />
                     </IconButton>
                     
                     {/* //TODO MEJORAR LA FUNCIONALIDAD DE BORRAR */}
                     {/* <IconButton onClick={deleteMyConversation}>
                        <DeleteIcon color="primary" sx={{ fontSize: '2rem' }} />
                     </IconButton> */}
                  </Box>
               </Box>

               <Box display="flex" flexDirection="column-reverse" flexGrow={1}>
                  <Box
                     display="flex"
                     flexDirection="column"
                     sx={{
                        maxHeight: '650px', // Ajusta esta altura
                        overflowY: 'auto',
                        overflowX: 'hidden', // Opcional: ocultar el desplazamiento horizontal si no es necesario
                     }}
                  >
                     {messageSend.map((msg, index) => {
                        if (msg.sender === profileDetails._id && msg.type === 'message') {
                           return <BoxMessageRemitente key={index} msg={msg.message} />
                        }
                        if (msg.type === 'request') {
                         
                           return <InvitationMessageText key={index} msg={msg.message} sender={msg.sender} status={msg.idRequest.status} idRequest={msg.idRequest._id} />
                        }  
                        else{
                           return <BoxMessageDestinatario key={index} msg={msg.message} />
                        }
                     })}
                     <div ref={messagesEndRef} />
                  </Box>
               </Box>
               <Box display="flex" m="1rem">
                  <Avatar
                     sx={{ width: '40px', height: '40px', mr: '1rem', mt: '0.3rem' }}
                     alt={userDetail.name}
                     src={profileDetails.imgProfile}
                  />
                  <TextField
                     id="outlined-textarea"
                     label="Ecribe un mensaje"
                     placeholder="escribe un mensaje "
                     multiline
                     fullWidth
                     value={message}
                     sx={{
                        mr: '1rem',
                        width: '100%',
                        '& .MuiInputBase-input': {
                           color: 'primary.main',
                           fontSize: '1.3rem',
                           overflow: 'auto',
                           whiteSpace: 'nowrap',
                        },
                     }}
                     onChange={(e) => setMessage(e.currentTarget.value)}
                     onKeyDown={keypress}
                  />
                  <Button
                     sx={{ px: '2rem', py: '1rem' }}
                     variant="contained"
                     endIcon={<SendIcon />}
                     onClick={handleSendMessage}
                  >
                     Enviar
                  </Button>
               </Box>
            </>}
      </Box>
   );
}
