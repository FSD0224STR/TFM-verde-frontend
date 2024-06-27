import {
   Avatar,
   Box,
   Typography,
   TextField,
   Button,
   IconButton,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import BoxMessageDestinatario from '../Pure/BoxMessageDestinatario';
import BoxMessageRemitente from '../Pure/BoxMessageRemitente';
import { useContext, useEffect, useRef, useState } from 'react';
import InvitationMessageText from '../Pure/InvitationMessageText';
import { MessagesContext } from '../../context/messagesContext';
import { LoginContextP } from '../../context/loginContextPrueba';
import { UserContext } from '../../context/userContext';
import AlertDelete from './AlertDelete';

export default function ComponentMessageList() {
   const {
      message,
      setMessage,
      messageSend,
      handleSendMessage,
      deleteMyConversation,
      setSendMessage,
      setOpenMessage,
      alertStatusDelete,
      setAlertStatusDelete,
      invitationMessage,
      handleRequestCouple,
      infoConversation
   } = useContext(MessagesContext);
   const { userDetail } = useContext(UserContext);
   const { profileDetails } = useContext(LoginContextP);
   const [responseInvitation, setResponseInvitation] = useState(null);
   const messagesEndRef = useRef(null);
   const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ block: 'end' });
   };
   console.log('messageSemd',messageSend)
   useEffect(() => {
      scrollToBottom();
   }, [messageSend]);

   //TODO gestinar el alerta
   
   const [openAlert, setOpenAlert] = useState(false);
    
   const handleClickOpen = () => {
      setOpenAlert(true);
   };
    
   const handleClose = () => {
      setOpenAlert(false);
   };
  
   const handleResetStatus = () => {
      setAlertStatusDelete(null)
      setOpenAlert(false);
        
   }

   const dataForRequest = {sender:profileDetails._id,receiver:userDetail._id,idConversation:infoConversation._id}

   return (
      <Box
         onChange={scrollToBottom}
         component="section"
         bgcolor="#E2E6E4"
         borderRadius={2}
         sx={{
            width: '100%',
            minHeight: '83vh',
            display: 'flex',
           
            flexDirection: 'column',
            p: '1rem',
         }}
      >
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
                  {userDetail.name}
               </Typography>
            </Box>
            <Box display="flex" minWidth="auto">
               <Button
                  variant="contained"
                  sx={{ bgcolor: 'secondary.variante', p: '0.5rem', mr: '0.5rem' }}
                  onClick={() => handleRequestCouple(dataForRequest)}
               >
                  {invitationMessage
                     ? 'Solicitud Enviada'
                     : `Invita a ${userDetail.name} a este evento`}
               </Button>
               <IconButton onClick={() => {
                  setSendMessage([])
                  setOpenMessage(false)
               }}>
                  <CancelIcon
                     color="primary"
                     sx={{ mr: '0.5rem', fontSize: '2rem' }}
                  />
               </IconButton>
               <IconButton onClick={handleClickOpen}>
                  <DeleteIcon color="primary" sx={{ fontSize: '2rem' }} />
               </IconButton>
            </Box>
         </Box>

         <Box display="flex" flexDirection="column-reverse" flexGrow={1}>
            <Box
               display="flex"
               flexDirection="column"
               sx={{
                  maxHeight: '650px', // Ajusta esta altura según tus necesidades
                  overflowY: 'auto',
                  overflowX: 'hidden', // Opcional: ocultar el desplazamiento horizontal si no es necesario
               }}
            >
               {messageSend.map((msg, index) =>
                  msg.sender === profileDetails._id ? (
                     <BoxMessageRemitente key={index} msg={msg.message} />
                  ) : (
                     <BoxMessageDestinatario key={index} msg={msg.message} />
                  )
               )}
               {invitationMessage && (
                  <InvitationMessageText
                     responseInvitation={responseInvitation}
                     setResponseInvitation={setResponseInvitation}
                  />
               )}
               <div ref={messagesEndRef} />
            </Box>
         </Box>
         <Box display="flex" m="1rem">
            <Avatar
               sx={{ width: '60px', height: '60px', mr: '1rem', mt: '0.3rem' }}
               alt={profileDetails.name}
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
            />
            <Button
               sx={{ px: '2rem', py: '1rem' }}
               variant="contained"
               endIcon={<SendIcon />}
               onClick={handleSendMessage}
            >
          Send
            </Button>
            <AlertDelete alertStatusDelete={alertStatusDelete} openAlert={openAlert} handleClose={handleClose} handleResetStatus={handleResetStatus} deleteMyConversation={deleteMyConversation} />
         </Box>
      </Box>
   );
}
