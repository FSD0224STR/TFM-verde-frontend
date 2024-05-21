
import { Avatar, Box, Typography, Button, Alert } from '@mui/material';

export default function InvitationMessageText({
   responseInvitation,
   setResponseInvitation,
}) {
   const ControlledResponse = () => {
      if (responseInvitation === null) {
         return (
            <>
               <Typography m="1rem" fontWeight="bold" color="primary.main">
              ¿Deseas aceptar la invitación de Mario?
               </Typography>
               <Button
                  sx={{ ml: '0.5rem', mr: '2rem', bgcolor: 'success.main' }}
                  variant="contained"
                  onClick={() => setResponseInvitation(true)}
               >
            aceptar
               </Button>{' '}
               <Button
                  variant="contained"
                  sx={{ bgcolor: 'error.main' }}
                  onClick={() => setResponseInvitation(false)}
               >
            rechazar
               </Button>
            </>
         );
      } else if (responseInvitation === true) {
         return <Alert severity="success">Invitacion aceptada</Alert>;
      } else {
         return <Alert severity="error">Invitacion Rechazada</Alert>;
      }
   };

   return (
      <>
         <Box display="flex" justifyContent="flex-end" >
            <Box
               display="flex"
               m="2rem"
               p="1rem"
               bgcolor="white"
               width="60%"
               borderRadius={2}
            >
               <Avatar
                  sx={{ width: '40px', height: '40px', mr: '0.3rem', mt: '0.3rem' }}
                  alt="Joao Victor"
                  src="https://reqres.in/img/faces/8-image.jpg"
               />
               <Box>
                  <Typography
                     color="text.secondary"
                     sx={{ fontSize: '1rem', fontWeight: '600', ml: '1rem' }}
                  >
                        Buenas Maria ¡Espero que te encuentres muy bien! Me encantaría
                        invitarte a este evento de baile que se llevará a cabo este sábado
                        por la noche. Será una noche llena de música, alegría y mucho
                        baile. Una ocasión perfecta para disfrutar y compartir unos buenos
                        momentos juntos. ¡Espero que puedas asistir!
                  </Typography>
             
                  <Box m="0.8rem">{ControlledResponse()}</Box>
               </Box>
            </Box>
         </Box>
      </>
   );
}
