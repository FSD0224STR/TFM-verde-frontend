import React, { useContext, useEffect, useState } from 'react'
import NavigationMenu from '../components/Menu/NavigationMenu'
import { LocationsComponent } from '../components/Pure/LocationComponent'
import { LocationContext } from '../context/locationContext'
import { Box, Grid } from '@mui/material'
import { EventComponent } from '../components/Pure/EventComponent'

export default function EventsList() {

   const {getLocationData,locationDatas,LocationEventsData}=useContext(LocationContext) 
   
   useEffect (()=>{
   
      getLocationData()
      
   })

   return (
      <>
              
         <NavigationMenu />

         {locationDatas ? (
            <>

               <LocationsComponent {...locationDatas} />

               <h1>Proximos eventos</h1>

               {LocationEventsData.length >0? (

                  <>

                     <Grid container spacing={3} my={5}>
                        {LocationEventsData.map(event=> 
   
                           <Grid item xs={12}  sm={6} key={event._id} > 
                              <Box display="flex" justifyContent="center" alignItems="center" marginLeft={2} marginRight={2}>
   
                                 <EventComponent _id={event._id}  name={event.name} address={event.typeOfDancing}  ></EventComponent> 
                              </Box>
                           </Grid>)}
                     </Grid>

                  </>

               ):(<h1>Este centro no tiene eventos proximos</h1>)
               
               }
           
            </>
        
         ): (<p>se estan cargando los datos, aqui hay que poner un cargando de MUI</p>)

         }
       
      </>
   )
}
