import  { useContext, useEffect, useState} from 'react'
import NavigationMenu from '../components/Menu/NavigationMenu'
import { Box, Grid,Typography } from '@mui/material'
import { EventComponent } from '../components/Pure/EventComponent'
import { EventContext } from '../context/eventContext'
import { CircularProgressLoading } from '../components/Pure/Loading'

export default function EventsList() {

   const [loading,setLoading]=useState(false)
   const {listEventsInterested,getListEventsUser,fetchAllEvent,eventsInfoList}=useContext(EventContext) 

   const getListEventsInterested  = async () => {

      setLoading(true)
      const response=await getListEventsUser()

      if (response) {

         setLoading(false)
         const dataAllEvent=await fetchAllEvent()

         if (dataAllEvent){
            setLoading(false)

         } 
       
      } 
   
   };
  
   useEffect (()=>{
      
      getListEventsInterested()
   
   },[]) 

   /* useEffect(() => {

      setLoading(true)
      
      const getallEvent = async () => {
         getListEventsUser
         const response=await getListEventsUser()

         if(response){
            setLoading(false)
         }
      };

      getallEvent();
  
   }, []); */

   console.log('Que es listEventsInterested en eventinterested',listEventsInterested)
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
            
            </>

         )} 
       
      </>
   )
}
