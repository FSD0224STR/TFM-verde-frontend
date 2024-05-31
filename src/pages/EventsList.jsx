import React, { useContext, useEffect, useState } from 'react'
import NavigationMenu from '../components/Menu/NavigationMenu'
import { LocationsComponent } from '../components/Pure/LocationComponent'
import { LocationContext } from '../context/locationContext'
import { Box, Grid } from '@mui/material'
import { EventComponent } from '../components/Pure/EventComponent'

export default function EventsList() {

   const {getLocationData,locationDatas}=useContext(LocationContext) 
   /*  const [locationDatas,setLocationData]=useState('') */

   /* const getLocationData = async () => { */
   /*    if (idLocal) { */
   /*       const data = await getOneLocation(idLocal); */
   /*       setLocationData(data); */
   /*               */
   /*    } */
   /* } */

   /* const getInterestedPeople=async()=>{ */

   /*    const interestedPeople= (await getLocationData()).events.interestedPeople */
   /*    console.log('Que es interestedPeople',interestedPeople) */
   /* } */
        
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

               {locationDatas.events.length >0? (

                  <>

                     <Grid container spacing={3} my={5}>
                        {locationDatas.events.map(event=> 
   
                           <Grid item xs={12}  sm={6} key={event._id} > 
                              <Box display="flex" justifyContent="center" alignItems="center" marginLeft={2} marginRight={2}>
   
                                 <EventComponent  name={event.name} address={event.typeOfDancing}></EventComponent> 
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
