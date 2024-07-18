import {
   Avatar,
   Box,
   Typography,
   TextField,
   Button,
   IconButton,
   InputLabel,
   FormControl,
   MenuItem,
   Select,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import BoxMessageDestinatario from '../Pure/BoxMessageDestinatario';
import BoxMessageRemitente from '../Pure/BoxMessageRemitente';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import InvitationMessageText from '../Pure/InvitationMessageText';
import { MessagesContext } from '../../context/messagesContext';
import { LoginContextP } from '../../context/loginContextPrueba';
import { UserContext } from '../../context/userContext';
import AlertDelete from './AlertDelete';
import { EventContext } from '../../context/eventContext';
import dayjs from 'dayjs';

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
      setInvitationMessage,
      setSendEventForCouple,
      setResponseInvitation
   } = useContext(MessagesContext);
   const { userDetail } = useContext(UserContext);
   const { profileDetails } = useContext(LoginContextP);
   const { listEventsInterested } = useContext(EventContext);
   const messagesEndRef = useRef(null);
   const [openAlert, setOpenAlert] = useState(false);
   const [eventsId, setEventsId] = useState('');
   const [isDisable, setisDisable] = useState(false);
   // console.log('mis eventos interesados en componenteMessage', eventsInfoList);
  
   // console.log('messageSemd',messageSend)

   useEffect(() => {
     
      setResponseInvitation('')
      setInvitationMessage(false)
   }, []);

   const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ block: 'end' });
   };
   useEffect(() => {
      scrollToBottom();
   }, [messageSend]);

   useEffect(() => {
      messageSend.forEach((msg) => {
         if (msg.type === 'request') {
            setInvitationMessage(true);
         }
      });
   }, [messageSend, profileDetails._id]);

   //TODO gestinar el alerta

   const handleClickOpenAlert = () => {
      setOpenAlert(true);
   };

   const handleClose = () => {
      setOpenAlert(false);
   };

   //enviar mensajes presionando la tecla enter
   function keypress(e) {
      const keypress = e.keyCode;
      if (keypress === 13) return handleSendMessage();
   }

   const handleResetStatus = () => {
      setAlertStatusDelete(null);
      setOpenAlert(false);
   };

   //Informacion de la request 
   const infoEvent = useMemo(
      () => listEventsInterested.filter((eve) => eve._id === eventsId)[0],
      [eventsId]
   );

   useEffect(() => {
      if (!infoEvent) {
         setisDisable(true)
      }else setisDisable(false) 
      
      const dateFormat = dayjs(infoEvent?.date.start).format('DD MMMM YYYY').toUpperCase();
      const hourFormat = dayjs(infoEvent?.date.start).format('HH:mm').toUpperCase();
      setSendEventForCouple({ name:infoEvent?.name, date: dateFormat, hour: hourFormat, _id:infoEvent?._id});
   }, [infoEvent]);

   const dataForRequest = {
      sender: profileDetails._id,
      nameSender: profileDetails.name,
      subnameSender: profileDetails.subName,
      receiver: userDetail._id,
      nameReceiver: userDetail.name,
      subnameReceiver: userDetail.subName, //TODO HAYQ UE PASSAR EL APELLIDO CUANDOSE SOLICITA EL CHAT 
   };

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
                  sx={{ width: '55px', height: '55px' }}
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
            <FormControl sx={{ mr: '2rem', width: '200px', fontSize: '1.2rem' }}>
               <InputLabel id="Selecte_IdEvents_Interesting_label">
            Elige uno de tus Eventos
               </InputLabel>
               <Select
                  labelId="selector del id del evento"
                  id="Selecte_IdEvents_Interesting"
                  value={eventsId}
                  label="Elegi  uno de tus Eventos "
                  onChange={(e) => {
                     setEventsId(e.target.value);
                     console.log('informacion de mis eventos en select',e.target.value)
                  }}
               >
                  <MenuItem value="">
                     <em>Selecionar</em>
                  </MenuItem>
                  {listEventsInterested.map((ev) => (
                     <MenuItem value={ev._id} key={ev._id}>
                        {ev.name}
                     </MenuItem>
                  ))}
               </Select>
            </FormControl>
            <Box display="flex" minWidth="auto">
               <Button
                  variant="contained"
                  sx={{
                     bgcolor: 'secondary.variante',
                     p: '0.5rem',
                     mr: '0.5rem',
                     ':disabled': { bgcolor: 'stack.terciary', color: 'primary.main' },
                  }}
                  onClick={() => handleRequestCouple(dataForRequest)}
                  disabled={isDisable}
               >
                  {isDisable
                     ? 'Elige un evento'
                     : `Invita a ${userDetail.name} a este evento`}
               </Button>

               <IconButton
                  onClick={() => {
                     setSendMessage([]);
                     setOpenMessage(false);
                  }}
               >
                  <CancelIcon
                     color="primary"
                     sx={{ mr: '0.5rem', fontSize: '2rem' }}
                  />
               </IconButton>
               <IconButton onClick={handleClickOpenAlert}>
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
               {messageSend.map((msg, index) => {
                  if (msg.sender === profileDetails._id && msg.type === 'message') {
                     return <BoxMessageRemitente key={index} msg={msg.message} />;
                  }
                  if (msg.type === 'request') {
                     return (
                        <InvitationMessageText
                           key={index}
                           msg={msg.message}
                           sender={msg.sender}
                           status={msg.idRequest.status}
                           idRequest={msg.idRequest._id}
                           idEvent={msg.idRequest.idEvent}
                       
                        />
                     );
                  } else {
                     return <BoxMessageDestinatario key={index} msg={msg.message} />;
                  }
               })}
               <div ref={messagesEndRef} />
            </Box>
         </Box>
         <Box display="flex" m="1rem">
            <Avatar
               sx={{ width: '60px', height: '60px', mr: '1rem', mb: '0.3rem' }}
               alt={profileDetails.name}
               src={profileDetails.imgProfile}
            />
            <TextField
               id="entrada"
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
            <div id="press">
               <Button
                  id="Button_Send"
                  sx={{ px: '2rem', py: '1rem' }}
                  variant="contained"
                  endIcon={<SendIcon />}
                  onClick={handleSendMessage}
               >
            Enviar
               </Button>
            </div>
            <AlertDelete
               alertStatusDelete={alertStatusDelete}
               openAlert={openAlert}
               handleClose={handleClose}
               handleResetStatus={handleResetStatus}
               deleteMyConversation={deleteMyConversation}
            />
         </Box>
      </Box>
   );
}
