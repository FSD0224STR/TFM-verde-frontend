import React, { useContext, useEffect} from 'react'
import NavigationMenu from '../components/Menu/NavigationMenu'
import { LocationContext } from '../context/locationContext'
import { Box, CircularProgress, Grid,Paper, Typography } from '@mui/material'
import { EventComponent } from '../components/Pure/EventComponent'
import { LocationComponentBig } from '../components/Pure/LocationComponentBig'
import { useState } from 'react'

export default function EventsList() {

   const [loading,setLoading]=useState(false)
   const {getLocationData,locationDatas,LocationEventsData}=useContext(LocationContext)
      
   const current_Location_Info = async () => {

      setLoading(true)
      const response=await getLocationData()

      if (response) {
         setLoading(false)
         return 
        
      } 
     
   };

   useEffect (()=>{
      
      current_Location_Info()
      
   },[])
    
   return (
      <>
              
         <NavigationMenu />

         {loading ?  ( <Box sx={{ display: 'flex',height:'100vh',justifyContent:'center',
            alignItems:'center'}}>
            <CircularProgress size={130}  sx={{color:'white'}} color="inherit"/>
         </Box>):(

            <>

               <LocationComponentBig location={locationDatas}/>

               <h2>Proximos eventos</h2>

               <Paper square={false} sx={{ minWidth: '90%', m: '3rem', pb: '2rem'}}>

                  {LocationEventsData.length ? (
   
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

                           {LocationEventsData.map((event,index)=> (

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
Actualmente no hay eventos disponibles
                     </Typography>
                  )}
               </Paper>

            </>

         )}
       
      </>
   )
}
