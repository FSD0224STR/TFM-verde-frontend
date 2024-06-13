
import NavigationMenu from '../components/Menu/NavigationMenu';
import { Search } from '../components/Pure/Search'
import {Box, Button, Grid, Paper, Typography } from '@mui/material'
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

         <Grid
            container
            maxWidth="100%"
            justifyContent="center"
            spacing={4}
            sx={{ m: '1rem' }}
         >

            <Grid 
               item  
               display="flex"
               justifyContent="center"
               xs={12}
               sm={4}
               lg={3}
               
            >
            
               <Search     value={city}   label='Filtrar por ciudad'  options={optionsCity} onChange={(event, newValue) => {setCity(newValue)}}  > </Search>
                                
            </Grid>

            <Grid
               item   
               display="flex"
               justifyContent="center"
               xs={12}
               sm={4}
               lg={3}
               
            >
             
               <DateCalendarValue/>
          
            </Grid>
     
            <Grid 
               item   
               display="flex" 
               justifyContent="center"
               xs={12}
               sm={4}
               lg={3}
               
            >
            
               <Search  value={typeOfDancing}  label='Filtrar por estilo' options={optionsDanceStyle} onChange={(event, newValue) => {setTypeOfDancing(newValue)}}></Search>

            </Grid>

            <Grid
               item  
               display="flex"
               justifyContent="center"
               xs={12}
               sm={12}
               lg={3}
              
            >
              
               <Button sx={{bgcolor: 'background.secondary',color: 'text.secondary',}} 
   
                  onClick={() => {getLocationFiltered(coordinates,city,date,typeOfDancing)}}>Filtrar</Button>

            </Grid>

         </Grid>

         <Paper square={false} sx={{ minWidth: '80%', m: '3rem', pb: '2rem' }}>

            {locations.length?(
               
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
                     {locations.map((local,index)=> (
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
                           <LocationsComponent  {...local}/>

                        </Grid>
                     ))}
                  </Grid>
               </Box>

            ):(<Typography
               textAlign="center"
               variant="h2"
               my="3rem"
               color="text.secondary"
            >
          No se han encontrado resultados
            </Typography>)}
           
         </Paper>
        
      </>
   )
}
