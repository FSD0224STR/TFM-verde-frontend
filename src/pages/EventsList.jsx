import React, { useContext, useEffect, useState } from 'react'
import NavigationMenu from '../components/Menu/NavigationMenu'
import { LocationsComponent } from '../components/Pure/LocationComponent'
import { LocationContext } from '../context/locationContext'
import { Box, Grid } from '@mui/material'
import { wrap } from 'framer-motion'

export default function EventsList() {

   const {idLocal,getOneLocation}=useContext(LocationContext) 
   const [locationDatas,setLocationData]=useState('')

   const getLocationData = async () => {
      if (idLocal) {
         const data = await getOneLocation(idLocal);
         setLocationData(data);
                
      }
   }
        
   useEffect (()=>{
   
      getLocationData()
   })

   return (
      <>
              
         <NavigationMenu/>
         <h1>Lista de eventos</h1>

         {locationDatas ? (
            <>

               <LocationsComponent {...locationDatas} />
               
               <Grid container spacing={3} my={1}>

                  {locationDatas.events.map(event=> 
                  
                     <Grid item xs={12}  sm={6} key={event._id} > 
                        <Box display="flex" justifyContent="center" alignItems="center" marginLeft={2} marginRight={2}>
                  
                           <LocationsComponent name={event.name} address={event.typeOfDancing}></LocationsComponent> 

                        </Box>
                     </Grid>)}
               </Grid>
           
            </>
        
         ):
            (<p>se estan cargando los datos, aqui hay que poner un cargando de MUI</p>)

         }
       
      </>
   )
}
