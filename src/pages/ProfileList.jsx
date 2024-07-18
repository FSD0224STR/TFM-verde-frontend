
import { useContext, useEffect } from 'react';
import User from '../components/Pure/User';
import { Grid, Box, Typography } from '@mui/material';
import NavigationMenu from '../components/Menu/NavigationMenu';
import { EventContext } from '../context/eventContext';
import { CircularProgressLoading } from '../components/Pure/Loading';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { LoginContextP } from '../context/loginContextPrueba';

export default function ProfileList() {

   const {idEventurl}=useParams()
   const { loggedUserId} = useParams()  

   const [loading,setLoading]=useState(false)

   const { listOfInterested,getProfileList,setButton_findPartner_Clicked} = useContext(EventContext);
   const { setIsLoggedIn} = useContext(LoginContextP)

   const getListOfInterested  = async () => {

      setLoading(true)
      const response=await getProfileList(idEventurl,loggedUserId)

      if (response) {
      
         setLoading(false)
         setButton_findPartner_Clicked(false)
       
      } 
   
   };
  
   useEffect (()=>{
      
      getListOfInterested()
   
   },[]) 

   useEffect(() => {
      const token = localStorage.getItem('access_token');
      if (token) setIsLoggedIn(true)
     
   }, [])

   return (
      <>

         <NavigationMenu />
      
         {loading ?  (  <CircularProgressLoading/>):(

            <>

               {listOfInterested.length ? (

                  <>

                     <Typography
                        textAlign="center"
                        variant="h2"
                        my="3rem"
                        color="primary.main"
                        fontWeight='bold'
                     >
                 Lista de interesados
                     </Typography>
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
                           gap={2}
                           spacing={4}
                           sx={{ m: '2rem' }}
                        >
                           {listOfInterested.map((user, index) => (
                              <Grid
                                 item
                                 key={index}
                                 display="flex"
                                 justifyContent="center"
                                 xs={12}
                                 sm={6}
                                 md={4}
                                 lg={2}
                              >
                                 <User userApi={user} />
                              </Grid>
                           ))}
                        </Grid>
                     </Box>

                  </>
               ) : (
                  <Typography
                     textAlign="center"
                     variant="h2"
                     my="3rem"
                     color="primary.main"
                     fontStyle='italic'
                     bgcolor='white'
                  >
            Eres el primer interesado en este evento. 
                  </Typography>
               )}

            </>)} 
         
      </>
   );
}
