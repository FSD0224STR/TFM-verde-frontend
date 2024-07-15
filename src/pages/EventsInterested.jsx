import  { useContext, useEffect, useState} from 'react'
import NavigationMenu from '../components/Menu/NavigationMenu'
import { Box, Grid,Typography } from '@mui/material'
import { EventComponent } from '../components/Pure/EventComponent'
import { EventContext } from '../context/eventContext'
import { CircularProgressLoading } from '../components/Pure/Loading'
import { useParams } from 'react-router-dom'
import { LoginContextP } from '../context/loginContextPrueba'

export default function EventsList() {
   
   const { loggedUserId} = useParams()  
   const [loading,setLoading]=useState(false)
   const {listEventsInterested,getListEventsUser,fetchAllEvent,eventsInfoList, button_interestedEvent_Clicked,setButton_interestedEvent_Clicked}=useContext(EventContext) 
   const { profileDetails, setIsLoggedIn } = useContext(LoginContextP)
   const getListEventsInterested  = async () => {

      setLoading(true)
      const listEvents=await getListEventsUser(loggedUserId)
      const response=await fetchAllEvent(listEvents)
      
      if (response) {
         
         setLoading(false)
         setButton_interestedEvent_Clicked(false);
         return 
      } 
   
   };

   useEffect(() => {
      const token = localStorage.getItem('access_token');
      if(token)setIsLoggedIn(true)
   }, [profileDetails]);
  
   useEffect (()=>{
      
      getListEventsInterested()
   
   },[]) 

   useEffect (()=>{

      if (button_interestedEvent_Clicked) {
         getListEventsInterested()
         setButton_interestedEvent_Clicked(false);

      }
      
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[button_interestedEvent_Clicked])
   
   return (

      <>
         <NavigationMenu />

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

               {listEventsInterested.length ? (
                  
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

                        {eventsInfoList.map((event,index)=> (
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
