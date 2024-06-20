
import NavigationMenu from '../components/Menu/NavigationMenu';
import { Search } from '../components/Pure/Search'
import {Box, Button, CircularProgress, Grid, Paper, Typography } from '@mui/material'
import { LocationsComponent } from '../components/Pure/LocationComponent'
import { useContext, useEffect} from 'react';
import { LocationContext } from '../context/locationContext';
import { DateCalendarValue } from '../components/Pure/Calendar';
import { useState } from 'react';
export default function Home() {

   const { getLocationFiltered, coordinates, city, date, typeOfDancing, locations, setCity, setTypeOfDancing } = useContext(LocationContext)
   const [loading,setLoading]=useState(false)
   const [buttonClicked, setButtonClicked] = useState(false);

   const LocationFilteredInfo = async () => {

      setLoading(true)
      const response=await getLocationFiltered(coordinates, city, date, typeOfDancing);
      if(response){
         setLoading(false)
         return 

      }
     
   };

   const handleClick = () => {
      setButtonClicked(true);
      
   }
   useEffect (()=>{

      if (buttonClicked) {
         LocationFilteredInfo(coordinates, city, date, typeOfDancing)
         setButtonClicked(false)

      }
      
   },[buttonClicked])

   useEffect (()=>{
  
      LocationFilteredInfo() 
      
   },[])

   const optionsCity=['Madrid','Barcelona']
   const optionsDanceStyle=['Swing','Salsa cubana','Salsa','Merengue','Bachata','Kizomba','Festival','Bachata Dominicana']
 
   return (
      
      <> {loading ?( <Box sx={{ display: 'flex',height:'100vh',justifyContent:'center',
         alignItems:'center'}}>
         <CircularProgress size={130}  sx={{color:'white'}} color="inherit"/>
      </Box>):(

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
   
                     onClick={handleClick}>Filtrar</Button>

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
            
      </>
   )
}
