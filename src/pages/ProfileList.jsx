// import userAPI from '../apiServices/usersApi';
import { useContext } from 'react';
import User from '../components/Pure/User';
import { Grid, Box, Typography, Paper, Button } from '@mui/material';
import NavigationMenu from '../components/Menu/NavigationMenu';
import { EventContext } from '../context/eventContext';
import { LoginContextP } from '../context/loginContextPrueba';
import { Search } from '../components/Pure/Search';

export default function ProfileList() {

   const { listOfInterested } = useContext(EventContext);
   const { profileDetails } = useContext(LoginContextP);
   const Interested_without_me = listOfInterested.filter(
      (person) => person.userId != profileDetails._id
   );

   const optionsRole=['Leader','Follower','Switch']
   return (
      <>

         <NavigationMenu />
  
         <Grid  xs={12} sm={8} justifyContent="center" p={2}>

            <Box display="flex" justifyContent="center" alignItems="center" flexWrap='wrap' >
               <Search    /* value={role} */   label='Filtrar por Role'  options={optionsRole} /* onChange={(event, newValue) => {setCity(newValue)}} */  > </Search>
              
               <Button sx={{bgcolor: 'background.secondary',color: 'text.secondary',marginLeft:'10px'}} /*   onClick={() => {}} */>Filtrar</Button>
            </Box>                    
         </Grid>
      
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
