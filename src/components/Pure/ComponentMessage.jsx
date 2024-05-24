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
import BoxMessageDestinatario from './BoxMessageDestinatario';
import BoxMessageRemitente from './BoxMessageRemitente';
import { useContext, useState } from 'react';
import InvitationMessageText from './InvitationMessageText';
import { Message } from '@mui/icons-material';
import { UserContext } from '../../context/userContext';

export default function ComponentMessage({ setOpenMessage }) {

   const { userDetail } = useContext(UserContext)
   const [invitationMessage, setInvitationMessage] = useState(false);
   const [responseInvitation, setResponseInvitation] = useState(null);
   const [message, setMessage] = useState('');
   const [messageSend, setSendMessage] = useState([]);

   const handleSendMessage = () => {
      if (message.trim() !== '') {
         const newMessage = { messageSend: message, isSender: true };
         setSendMessage([ newMessage,...messageSend]);
         setMessage(' ');
      //  console.log('enviando', messageSend)
      }
   };
   const ControlInvitacion = () => {
      if (invitationMessage) {
         return alert('ya has enviado un invitacion');
      } else {
         setInvitationMessage(true);
      }
   };

   return (
      <Box
         component="section"
         bgcolor="#b3e6e2"
         borderRadius={2}
         sx={{
            width: '736px',
            minHeight: '640px',
            display: 'flex',
            mt: '1rem',
            flexDirection: 'column',
         }}
      >
         <Box width="100%" display="flex" p={1}>
            <Box display="flex" flexGrow={1}>
               <Avatar
                  sx={{ width: '40px', height: '40px' }}
                  alt="Maria Sanchez"
                  src={userDetail.imgProfile}
               />

               <Typography
                  color="primary.main"
                  variant="h6"
                  sx={{ flexGrow: 1 }}
                  ml="1rem"
                  mt="0.4rem"
                  
               >
                  {userDetail.name}{' '}{userDetail.subName}
               </Typography>
            </Box>
            <Box display="flex" minWidth="auto">
               <Button
                  variant="contained"
                  sx={{ bgcolor: 'secondary.variante', p: '0.5rem', mr: '0.5rem' }}
                  onClick={ControlInvitacion}
               >
                  {invitationMessage
                     ? 'Solicitud Enviada'
                     : `Invita a ${userDetail.name} a este evento`}
               </Button>
               <IconButton onClick={() => setOpenMessage(false)}>
                  <CancelIcon
                     color="primary"
                     sx={{ mr: '0.5rem', fontSize: '2rem' }}
                  />
               </IconButton>
               <IconButton>
                  <DeleteIcon color="primary" sx={{ fontSize: '2rem' }} />
               </IconButton>
            </Box>
         </Box>

         <Box display="flex"  flexDirection="column-reverse"  flexGrow={1}>
            <Box
               display="flex"
               flexDirection="column-reverse"
              
               sx={{
                  maxHeight: '500px', // Ajusta esta altura según tus necesidades
                  overflowY: 'auto',
                  overflowX: 'hidden', // Opcional: ocultar el desplazamiento horizontal si no es necesario
               }}
            >
               {messageSend.map((msg, index) => (
               //    console.log( 'esto es el map de messageSend',msg)
                  <BoxMessageRemitente key={index} msg={msg.messageSend} />
               ))}
               {invitationMessage && (
                  <InvitationMessageText
                     responseInvitation={responseInvitation}
                     setResponseInvitation={setResponseInvitation}
                  />
               )}
            </Box>
         </Box>
         <Box display="flex" m="1rem">
            <Avatar
               sx={{ width: '40px', height: '40px', mr: '1rem', mt: '0.3rem' }}
               alt={userDetail.name}
               src="https://reqres.in/img/faces/8-image.jpg"
            />
            <TextField
               id="outlined-textarea"
               label="Ecribe un mensaje"
               placeholder="escribe un mensaje "
               multiline
               fullWidth
               value={message}
               sx={{ mr: '1rem', width: '100%' }}
               onChange={(e)=>setMessage(e.target.value)}
            />
            <Button
               sx={{ px: '2rem', py: '1rem' }}
               variant="contained"
               endIcon={<SendIcon />}
               onClick={handleSendMessage}
            >
          Send
            </Button>
         </Box>
      </Box>
   );
}
