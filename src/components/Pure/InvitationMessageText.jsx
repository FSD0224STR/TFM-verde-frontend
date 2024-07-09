
import { Avatar, Box, Typography, Button, Alert } from '@mui/material';
import { forwardRef, useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { MessagesContext } from '../../context/messagesContext';
import { LoginContextP } from '../../context/loginContextPrueba';

const InvitationMessageText = ({ msg, sender,status,idRequest }) => {
   // console.log('esto es idRequest', idRequest)
   // console.log('esto es status', status)
   const { profileDetails } = useContext(LoginContextP)
   const { userDetail } = useContext(UserContext)
   const{responseInvitation,hanldeAnswerRequest,invitationMessageRef} = useContext(MessagesContext)

   const ControlledResponse = () => {
      if (status === 'Pending' && sender === profileDetails._id ) {

         return (
            <> <Box sx={{display:'flex',justifyContent:'center',gap:2}} > 

               <Alert severity="warning" sx={{ fontSize: '1.2rem' } }>Aguardando la respuesta ...</Alert>
               <Button
                  sx={{
                     bgcolor: '#e8b1a0', ':hover': {
                        bgcolor:'#db5a32'
                     } }}
                  size='small'
                  variant="contained"
                  onClick={()=>console.log('cancelando...')}
               >
               cancelar
               </Button>
            </Box>
            </>
         )
      } 

      if (status === 'Accepted') {
         return <Alert severity="success" sx={{ fontSize: '1.2rem' }} >Invitación aceptada por {sender === profileDetails._id ? userDetail.name : profileDetails.name }</Alert>;
      } 

      if ( status === 'Declined') {
         return <Alert severity="error"sx={{ fontSize: '1.2rem' } } >Invitación Rechazada por {sender === profileDetails._id ? userDetail.name : profileDetails.name }</Alert>;
      }

      return (
         <>
            <Box sx={{display:'flex',justifyContent:'center',flexDirection:'column'}}>
               <Typography fontWeight="bold" color="primary.main" sx={{ textAlign:'center',mb:'0.5rem'}}>
               ¿Deseas aceptar la invitación de {userDetail.name }?
               </Typography>
               <Box display={{display:'flex',justifyContent:'center'}}>
                  
                  <Button
                     sx={{ ml: '0.5rem', mr: '2rem', bgcolor: 'success.main',width:'10rem' }}
                     variant="contained"
                     onClick={()=>hanldeAnswerRequest({status:'Accepted',idRequest})}
                  >
               aceptar
                  </Button>
                  <Button
                     variant="contained"
                     sx={{ bgcolor: 'error.main',width:'10rem' }}
                     onClick={() => hanldeAnswerRequest({status:'Declined',idRequest})}
                  >
               rechazar
                  </Button>
               </Box>
            </Box>
         </>
      );
   };

   return (
      <>
         <Box display="flex" justifyContent="flex-end"  ref={invitationMessageRef} >
            <Box
               display="flex"
               m="1rem"
               p="1rem"
               bgcolor="white"
               maxWidth="70%"
               borderRadius={2}
            >
               {sender === profileDetails._id ?
                  
                  <Avatar
                     sx={{ width: '40px', height: '40px', mr: '0.3rem', mt: '0.3rem' }}
                     alt="Sender request"
                     src={profileDetails.imgProfile}
                  />
                  
                  :
                  
                  <Avatar
                     sx={{ width: '55px', height: '55px', mr: '0.3rem', mt: '0.3rem' }}
                     alt="Sender request"
                     src={userDetail.imgProfile}
                  /> }
               
               <Box>
                  <Typography
                     color="text.secondary"
                     sx={{ fontSize: '1rem', fontWeight: '600', ml: '1rem' }}
                  >
                     {msg}
                  </Typography>
             
                  <Box m="0.8rem">{ControlledResponse()}</Box>
               </Box>
            </Box>
         </Box>
      </>
   );
}

export default InvitationMessageText