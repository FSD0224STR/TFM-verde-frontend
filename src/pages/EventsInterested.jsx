import  { useContext, useEffect, useState} from 'react'
import NavigationMenu from '../components/Menu/NavigationMenu'
import { Alert, Box, Grid,Typography } from '@mui/material'
import { EventComponent } from '../components/Pure/EventComponent'
import { EventContext } from '../context/eventContext'
import { CircularProgressLoading } from '../components/Pure/Loading'
import { LoginContextP } from '../context/loginContextPrueba'

export default function EventsList() {
  
   const [loading,setLoading]=useState(false)
   const [error,setError]=useState('')
   const {listEventsInterested,   getAllEventsUser,listUpcomingEvents, button_interestedEvent_Clicked,setButton_interestedEvent_Clicked}=useContext(EventContext) 
   const { profileDetails, setIsLoggedIn } = useContext(LoginContextP)

   const getAllEvents= async () => {

      setLoading(true) 
      const response=await getAllEventsUser() 
         
      if (response.error) {
         setError('Ha habido un error al visualizar tus eventos de interés')
         setTimeout(()=>{
            setError('')
         
         },3000)
         return 
      
      } 
         
      setLoading(false)
      setButton_interestedEvent_Clicked(false);
      return 
   } 
   
   useEffect(() => {
      const token = localStorage.getItem('access_token');
      if(token)setIsLoggedIn(true)
   }, [profileDetails]);
  
   useEffect (()=>{
   
      getAllEvents()
   
   },[button_interestedEvent_Clicked ]) 
  
   return (

      <>
         <NavigationMenu />
         {error && <Alert variant="filled" severity="error"  sx={{textAlign:'center',fontSize:'2rem',m:'20px'}}  > 
            {error} 
         </Alert> }  

         {loading ?  (  <CircularProgressLoading/>):(

            <>
            
               <Typography
                  textAlign="center"
                  variant="h2"
                  my="3rem"
                  color="primary.main"
                  fontWeight='bold'
               >
                 Eventos de interés
               </Typography>

               {listEventsInterested ?.length || listUpcomingEvents ?.length ? (
                  
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

                        {listEventsInterested .length ? (

                           <>

                              {listEventsInterested .map((event,index)=> (
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
   
                                    <EventComponent findPartner={true}  event={event} />  
                                
                                 </Grid> 
                              ))}

                           </>

                        ):( 

                           null
                        )}

                        {listUpcomingEvents.length ? (

                           <>

                              {listUpcomingEvents.map((event,index)=> (
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

                                    <EventComponent findPartner={true}  event={event} />  
     
                                 </Grid> 
                              ))}

                           </>

                        ):( 

                           null
                        )}
                     
                     </Grid>
                  </Box>

               ):(
               
                  <Typography
                     textAlign="center"
                     variant="h2"
                     my="3rem"
                     color="text.secondary"
                  >
                   Actualmente no te has interesado en ningun evento.
                  </Typography>
               )}
            
            </>

         )} 
       
      </>
   )
}
