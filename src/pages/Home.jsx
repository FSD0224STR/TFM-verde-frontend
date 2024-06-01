
import NavigationMenu from '../components/Menu/NavigationMenu';
import { Search } from '../components/Pure/Search'
import {Box, Button, Grid } from '@mui/material'
import { LocationsComponent } from '../components/Pure/LocationComponent'
import { useContext, useEffect} from 'react';
import { LocationContext } from '../context/locationContext';
export default function Home() {

   const{getLocationFiltered,coordinates,city,date,typeOfDancing,locations,setCity,setDate,setTypeOfDancing}=useContext(LocationContext)
   
   useEffect(() => {
      getLocationFiltered();
   },[])
   
   return (
      <>
         <NavigationMenu/>

         <Grid container  sx={{marginBottom:'50px'}} spacing={2} alignItems='center'>
           
            <Grid item xs={12} sm={3} >

               <Box display="flex" justifyContent="center" alignItems="center" marginLeft={2} marginRight={2}>
                  <Search     filterBy={city}   onChange={(e)=>{setCity(e.currentTarget.value)}} placeholder='Filtrar por ciudad' >  </Search>
               </Box>                    
            </Grid>

            <Grid item xs={12} sm={3} >

               <Box display="flex" justifyContent="center" alignItems="center" marginLeft={2} marginRight={2}>
                  <Search filterBy={date} onChange={(e)=>{setDate(e.currentTarget.value)}} placeholder='Filtrar por fecha' ></Search> 
               
               </Box>
            </Grid>
                             
            <Grid item xs={12} sm={3} >

               <Box display="flex" justifyContent="center" alignItems="center" marginLeft={2} marginRight={2}>
                  <Search filterBy={typeOfDancing}  onChange={(e)=>{setTypeOfDancing(e.currentTarget.value)}} placeholder='Filtrar por estilo' ></Search>
               </Box>
              
            </Grid>

            <Grid item xs={12} sm={3}>
               <Box display="flex" justifyContent="center" alignItems="center" marginLeft={2} marginRight={2}>
                  <Button sx={{bgcolor: 'background.secondary',
                     color: 'text.secondary',}}  onClick={() => {getLocationFiltered(coordinates,city,date,typeOfDancing)}}>Filtrar</Button>
               </Box>
              
            </Grid>

         </Grid>

         <Grid container spacing={3}>

            {locations.map(local=> 
               <Grid item xs={12} sm={6} key={local._id}> 

                  <Box display="flex" justifyContent="center" alignItems="center" marginLeft={2} marginRight={2}>
               
                     <LocationsComponent  {...local}></LocationsComponent> 
                  </Box>
               
               </Grid>)}
      
         </Grid>
         
      </>
   )
}
