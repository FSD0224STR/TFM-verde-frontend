// import userAPI from '../apiServices/usersApi';
import { useContext } from 'react'
import User from '../components/Pure/User';
import { Grid,Box, Typography,Paper} from '@mui/material';
import NavBar from '../components/NavBar/NavBar';
import { UserContext } from '../context/userContext';
import NavigationMenu from '../components/Menu/NavigationMenu';
import { EventContext } from '../context/eventContext';
import { useState } from 'react';
import { LoginContextP } from '../context/loginContextPrueba';

export default function ProfileList() {

   const [user, setUser] = useState({})

   // useEffect(() => {
   //    getUsers()

   // }, []);

   // const getUsers = async () => {
   //    try {
   //       const allUsers = await userAPI.ListOfInterestedUsers();
   //       setUsers(allUsers);
   //    } catch (err) {
   //       alert('Ha ocurrido el siguiente error: ' + err.message);
   //    }
   // }

   const {users} = useContext(UserContext) //Si mapeamos la variable user se pintan todos los perfiles de la BDD 
   const{listOfInterested}=useContext(EventContext)
   const {profileDetails} = useContext(LoginContextP)
   const Interested_without_me=listOfInterested.filter(person=>person.userId!=profileDetails._id) 
   console.log('Que es lista de interesados quitando mi usuario',Interested_without_me)
   
   return (
      <>
         <NavigationMenu/>
         <Paper square={false} sx={{maxWidth:'90%', m:'3rem', pb:'2rem',p:'2rem'}}>
            <Box width='100%' display='flex' flexDirection='column'justifyContent='center' alignItems='center'>
               <Typography textAlign="center" variant='h2'  my="3rem" color='text.secondary'>Lista de interesados</Typography>
               <Grid container  maxWidth="95%" justifyContent='center' spacing={4}  >

                  {Interested_without_me.length>0?(

                     <>
                        <Grid item display='flex' justifyContent='center'  xs={12} sm={6} md={4} lg={3} gap={2} >
                        
                           {Interested_without_me.map((person,index) => (
                           
                              <User
                                 userApi={person} key={index} />
                        
                           ))}
                        </Grid>
                     
                     </>

                  ):(<Typography textAlign="center" variant='h2'  my="3rem" color='text.secondary'>Eres el primer interesado a este evento, pero tenemos estas sugerencias para ti</Typography>)}
                 
               </Grid>
            </Box>
         </Paper>
      </>
   )
}
