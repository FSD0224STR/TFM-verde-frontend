import React, { useContext, useEffect} from 'react'
import NavigationMenu from '../components/Menu/NavigationMenu'
import { LocationContext } from '../context/locationContext'
import { Box,Grid,Typography } from '@mui/material'
import { EventComponent } from '../components/Pure/EventComponent'
import { LocationComponentBig } from '../components/Pure/LocationComponentBig'
import { useState } from 'react'
import { CircularProgressLoading } from '../components/Pure/Loading'
import {DividerWithText} from '../components/Pure/Divider'
import { useParams } from 'react-router-dom' 

export default function EventsList() {

   const { idLocal } = useParams()  

   const [loading,setLoading]=useState(false)
   const [showAllEvents,setShowAllEvents]=useState([])
   const {getLocationData,locationDatas,eventsFilteredData,eventsUnFilteredData,typeOfDancing,date,city}=useContext(LocationContext)
      
   const current_Location_Info = async () => {

      setLoading(true)
      const response=await getLocationData(  )

      if (response) {
         setLoading(false)
       
      } 
   
   };

   useEffect(() => {

      console.log('Estoy entrando en el useEffect que me setea showallevents')
     
      if (!date && !typeOfDancing) {
         setShowAllEvents(eventsFilteredData);
      }
    
   }, [eventsFilteredData, date, typeOfDancing]);

   useEffect (()=>{
      
      current_Location_Info()
   
   },[])

   console.log('Que es showallevents',showAllEvents)
    
   return (
      <>
      
         <NavigationMenu />

         {loading ?  (  <CircularProgressLoading/>):(

            <>
            
               <LocationComponentBig location={locationDatas}/>
          
               {showAllEvents.length? (
                  
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
                        sx={{ m: '3rem' }}
                     >
                        {showAllEvents.map((event,index)=> (
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
                  <>
                  
                     {eventsFilteredData.length ?(

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
                              spacing={2}
                              sx={{ m: '1rem' }}
                           >
                              {eventsFilteredData.map((event,index)=> (
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
                              {eventsUnFilteredData.length ?(

                                 <>
                              
                                    <DividerWithText text='Otros eventos disponibles'/>
                                    {eventsUnFilteredData.map((event,index)=> (
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
                                 </>
                              
                              ):(null)}

                           </Grid>
                           
                        </Box>

                     ):(

                        <Typography
                           textAlign="center"
                           variant="h2"
                           my="3rem"
                           color="text.secondary"
                        >
Actualmente no hay eventos disponibles en este centro. 
                        </Typography>
                     
                     )} 

                  </>

               )}  
            
            </>
            
         )}

      </>

   )}
