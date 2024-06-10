// import userAPI from '../apiServices/usersApi';
import { useContext } from 'react';
import User from '../components/Pure/User';
import { Grid, Box, Typography, Paper } from '@mui/material';
import NavBar from '../components/NavBar/NavBar';
import { UserContext } from '../context/userContext';
import NavigationMenu from '../components/Menu/NavigationMenu';
import { EventContext } from '../context/eventContext';
import { useState } from 'react';
import { LoginContextP } from '../context/loginContextPrueba';

export default function ProfileList() {
   const { listOfInterested } = useContext(EventContext);
   const { profileDetails } = useContext(LoginContextP);
   const Interested_without_me = listOfInterested.filter(
      (person) => person.userId != profileDetails._id
   );
   console.log(
      'Que es lista de interesados quitando mi usuario',
      Interested_without_me
   );

   return (
      <>
         <NavigationMenu />
         <Paper square={false} sx={{ minWidth: '80%', m: '3rem', pb: '2rem' }}>
            <Typography
               textAlign="center"
               variant="h2"
               my="3rem"
               color="text.secondary"
            >
          Lista de interesados
            </Typography>
            {Interested_without_me.length ? (
               <Box
                  width="100%"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
               >
                  <Grid
                     container
                     maxWidth="100%"
                     justifyContent="center"
                     gap={4}
                     spacing={4}
                     sx={{ m: '4rem' }}
                  >
                     {Interested_without_me.map((user, index) => (
                        <Grid
                           item
                           key={index}
                           display="flex"
                           justifyContent="center"
                           xs={12}
                           sm={6}
                           md={4}
                           lg={3}
                        >
                           <User userApi={user} />
                        </Grid>
                     ))}
                  </Grid>
               </Box>
            ) : (
               <Typography
                  textAlign="center"
                  variant="h2"
                  my="3rem"
                  color="text.secondary"
               >
            Eres el primer interesado a este evento, pero tenemos estas
            sugerencias para ti
               </Typography>
            )}
         </Paper>
      </>
   );
}
