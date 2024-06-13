import React, { useContext, useEffect, useState} from 'react'
import NavigationMenu from '../components/Menu/NavigationMenu'
import { Box, CircularProgress, Grid,Paper, Typography } from '@mui/material'
import { EventComponent } from '../components/Pure/EventComponent'
import { UserContext } from '../context/userContext'
import { LoginContextP } from '../context/loginContextPrueba'
import { EventContext } from '../context/eventContext'
import { Navigate } from 'react-router-dom'

export default function EventsList() {

   const {listEventsInterested,getListEventsUser}=useContext(UserContext) 
   const{profileDetails}=useContext(LoginContextP)
   const{getOneEvent}=useContext(EventContext)
   const[eventsInfoList,setEventsInfoList]=useState([])

   useEffect (()=>{
   
      getListEventsUser(profileDetails)
     
   },[])

   useEffect(() => {
      const fetchAllEvent = async () => {
         const events = await Promise.all(listEventsInterested.map(eventId => getOneEvent(eventId)));
         setEventsInfoList(events);
      };

      fetchAllEvent();
  
   }, [listEventsInterested]);
   
   console.log('Que es listEventsInterested',listEventsInterested)

   return (
      <>
              
         <NavigationMenu />
           
         {listEventsInterested ? (
            <>
             
               <Paper square={false} sx={{ minWidth: '90%', m: '3rem', pb: '2rem' }}>
                  <Typography
                     textAlign="center"
                     variant="h2"
                     my="3rem"
                     color="text.secondary"
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

                                 <EventComponent   event={event} />  
                             
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
               </Paper>
           
            </>
        
         ): ( 
            <Box sx={{ display: 'flex',height:'100vh',justifyContent:'center',
               alignItems:'center'}}>
               <CircularProgress size={130}  sx={{color:'white'}} color="inherit"/>
            </Box>
         )

         }
       
      </>
   )
}
