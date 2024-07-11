
import { useContext, useEffect } from 'react';
import User from '../components/Pure/User';
import { Grid, Box, Typography,Button } from '@mui/material';
import NavigationMenu from '../components/Menu/NavigationMenu';
import { EventContext } from '../context/eventContext';
import { Search } from '../components/Pure/Search';
import { CircularProgressLoading } from '../components/Pure/Loading';
import { useState } from 'react';

export default function ProfileList() {

   const [loading,setLoading]=useState(false)

   const { listOfInterested,getProfileList,button_findPartner_Clicked,setButton_findPartner_Clicked} = useContext(EventContext);

   const getListOfInterested  = async () => {

      setLoading(true)
      const response=await getProfileList()

      if (response) {
         console.log('Que es listOfInterested',listOfInterested)
         setLoading(false)
         setButton_findPartner_Clicked(false)
       
      } 
   
   };
  
   useEffect (()=>{
      
      getListOfInterested()
   
   },[button_findPartner_Clicked]) 

   const optionsRole=['Leader','Follower','Switch']
   return (
      <>

         <NavigationMenu />
      
         {loading ?  (  <CircularProgressLoading/>):(

            <>

               <Grid
                  container
                  justifyContent="center"
                  sx={{ m: '1.5rem' }}
       
               >
           
                  <Grid 
                     item  
                     display="flex"
                     justifyContent="center"
                     xs={12}
                     sm={1}
                     lg={1}
               
                  >
                     <Search    /* value={role} */   label='Filtrar por Role'  options={optionsRole} /* onChange={(event, newValue) => {setCity(newValue)}} */  > </Search>          
                  </Grid>
            
                  <Grid 
                     item  
                     display="flex"
                     justifyContent="center"
                     xs={12}
                     sm={1}
                     lg={1}
               
                  >
                     <Button sx={{bgcolor: 'background.secondary',color: 'text.secondary',marginLeft:'10px'}} /*   onClick={() => {}} */>Filtrar</Button>         
                  </Grid>

               </Grid>
              
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
