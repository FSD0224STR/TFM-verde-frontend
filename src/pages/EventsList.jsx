import React, { useContext, useEffect, useState } from 'react'
import NavigationMenu from '../components/Menu/NavigationMenu'
import { LocationsComponent } from '../components/Pure/LocationComponent'
import { LocationContext } from '../context/locationContext'
import { Grid } from '@mui/material'
import { EventComponent } from '../components/Pure/EventComponent'
import { LoginContextP } from '../context/loginContextPrueba'

export default function EventsList() {

   const {getLocationData,locationDatas,LocationEventsData}=useContext(LocationContext) 
   
   useEffect (()=>{
   
      getLocationData()
      
   },[])

   return (
      <>
              
         <NavigationMenu />

         {locationDatas ? (
            <>

               {/*           <LocationsComponent {...locationDatas} /> */}

               <h1>Proximos eventos</h1>

               {LocationEventsData.length >0? (

                  <>

                     <Grid container spacing={2} my={2} width='95%' p={2} bgcolor='white' sx={{justifyContent:'center'}}>

                        {LocationEventsData.map(event=> 
   
                           <Grid item xs={12}  sm={6}  md={4} key={event._id}> 
   
                              <EventComponent
                                 event={event}
                              >
                              </EventComponent> 
                             
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
