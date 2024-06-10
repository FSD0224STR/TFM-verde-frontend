
import NavigationMenu from '../components/Menu/NavigationMenu';
import { Search } from '../components/Pure/Search'
import {Box, Button, Grid, Typography } from '@mui/material'
import { LocationsComponent } from '../components/Pure/LocationComponent'
import { useContext, useEffect} from 'react';
import { LocationContext } from '../context/locationContext';
import { DateCalendarValue } from '../components/Pure/Calendar';

export default function Home() {

   const{getLocationFiltered,coordinates,city,date,typeOfDancing,locations,setCity,setTypeOfDancing}=useContext(LocationContext)

   useEffect(() => {
      getLocationFiltered();
  
   },[])

   const optionsCity=['Madrid','Barcelona']
   const optionsDanceStyle=['Swing','Salsa cubana','Salsa','Merengue','Bachata','Kizomba','Festival','Bachata Dominicana']
 
   return (
      <>
            
         <NavigationMenu/>

         <Grid container m={2} spacing={2} alignItems='center'>
  
            <Grid item xs={12} sm={3} >

               <Box display="flex" justifyContent="center" alignItems="center" marginLeft={2} marginRight={2}>
                  <Search     value={city}   label='Filtrar por ciudad'  options={optionsCity} onChange={(event, newValue) => {setCity(newValue)}}  > </Search>
               </Box>                    
            </Grid>

            <Grid item xs={12} sm={3} >

               <Box display="flex" justifyContent="center" alignItems="center" marginLeft={2} marginRight={2}>
                  <DateCalendarValue/>
      
               </Box>
            </Grid>
                    
            <Grid item xs={12} sm={3} >

               <Box display="flex" justifyContent="center" alignItems="center" marginLeft={2} marginRight={2}>
                  <Search  value={typeOfDancing}  label='Filtrar por estilo' options={optionsDanceStyle} onChange={(event, newValue) => {setTypeOfDancing(newValue)}}></Search>
               </Box>
     
            </Grid>

            <Grid item xs={12} sm={3}>
               <Box display="flex" justifyContent="center" alignItems="center" marginLeft={2} marginRight={2}>
                  <Button sx={{bgcolor: 'background.secondary',color: 'text.secondary',}} 
                  
                     onClick={() => {getLocationFiltered(coordinates,city,date,typeOfDancing)}}>Filtrar</Button>
               </Box>
     
            </Grid>

         </Grid>

         <Grid container spacing={1} my={3} width='95%' p={1} bgcolor='white' sx={{justifyContent:'center'}}>

            {locations.length?(locations.map(local=> 
               <Grid item xs={12} sm={6} key={local._id}> 
               
                  <LocationsComponent  {...local}></LocationsComponent> 
               
               </Grid>)):(<Typography
               textAlign="center"
               variant="h2"
               my="3rem"
               color="text.secondary"
            >
          No se han encontrado resultados
            </Typography>)}
      
         </Grid>
        
      </>
   )
}
