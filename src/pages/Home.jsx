
import NavigationMenu from '../components/Menu/NavigationMenu';
import { Search } from '../components/Pure/Search'
import {Box, Button, CircularProgress, Grid, Paper, Stack, Typography } from '@mui/material'
import { LocationsComponent } from '../components/Pure/LocationComponent'
import { useContext, useEffect} from 'react';
import { LocationContext } from '../context/locationContext';
import { DateCalendarValue } from '../components/Pure/Calendar';
import { useState } from 'react';
import { Map } from '../components/Pure/Map';
import { ShowMapButton } from '../components/Pure/CommonButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import MapIcon from '@mui/icons-material/Map';
import ListIcon from '@mui/icons-material/List';
import { LoginContextP } from '../context/loginContextPrueba';

export default function Home() {
   const {setIsLoggedIn}= useContext(LoginContextP)
   const { getLocationFiltered, city, date, typeOfDancing, locations, setCity, setTypeOfDancing,getDataForCluster,cleanFilter } = useContext(LocationContext)
   const [loading,setLoading]=useState(false)
   const [filterButtonClicked, setFilterButtonClicked] = useState(false); 
   const [clearFilterButtonClicked, setClearFilterButtonClicked] = useState(false); 
   const [NameMapButton, setNameMapButton] = useState('Mostrar mapa'); 

   const LocationFilteredInfo = async () => {

      setLoading(true)
      const locationHome=await getLocationFiltered(city, date, typeOfDancing);
      const locationMap=await  getDataForCluster(city,date,typeOfDancing)
      
      if( locationHome && locationMap){
         setLoading(false)
         return 

      }
     
   };

   const clickMapButton = () => {

      setLoading(true)

      if(NameMapButton==='Ver listado') {

         console.log('Mostrar mapa')
         setNameMapButton('Mostrar mapa');
         setLoading(false)
      }
      
      if(NameMapButton==='Mostrar mapa') {
         
         console.log('Ver listado')
         setNameMapButton('Ver listado')
         setLoading(false)
      }
   }

   const handleClick = () => {
      setFilterButtonClicked(true);
      
   }

   const handleClearFilterButtonClicked = () => {
      cleanFilter()
      setClearFilterButtonClicked(true);
      
   }

   useEffect (()=>{

      if (filterButtonClicked ||  clearFilterButtonClicked) {
         LocationFilteredInfo()
         setFilterButtonClicked(false)
         setClearFilterButtonClicked(false);

      }
      
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[filterButtonClicked,clearFilterButtonClicked])

   useEffect (()=>{
      const token = localStorage.getItem('access_token');
      if(token)setIsLoggedIn(true)
      LocationFilteredInfo() 
      
   },[])
  
   const optionsCity=[ 
      'Barcelona',
      'Bilbao',
      'Las Palmas',
      'Madrid',
      'Murcia',
      'Málaga',
      'Palma',
      'Sevilla',
      'Valencia',
      'Zaragoza'
   ]
   const optionsDanceStyle=['Swing','Salsa cubana','Salsa','Merengue','Bachata','Kizomba','Festival','Bachata Dominicana']
 
   return (
      
      <> 
      
         <NavigationMenu/>
         {loading ?( <Box sx={{ display: 'flex',height:'100vh',justifyContent:'center',
            alignItems:'center'}}>
            <CircularProgress size={130}  sx={{color:'white'}} color="inherit"/>
         </Box>):(

            <>
            
               <Grid
            
                  container
                  maxWidth="50%"
                  justifyContent="center"
                  spacing={2}
                  sx={{ m: '0.5rem',bgcolor:'white', borderRadius: '50px' ,  padding: '10px 10px 10px'}}
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

                     <Search  value={typeOfDancing}  label='Filtrar por estilo' options={optionsDanceStyle} onChange={(event, newValue) => {setTypeOfDancing(newValue)}}></Search>

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
                     sm={12}
                     lg={3}
  
                  >
                     <Stack direction="column"  alignItems="center" >

                        <Button 
               
                           sx={{borderRadius: '50%',height:'50px',width:'50px', bgcolor: 'primary.main',color: 'white',
                              '&:hover': {
                                 backgroundColor: 'background.nav',
                  
                              },

                           }} 

                           onClick={handleClick}>Filtrar</Button>

                        <Button variant="text" sx={{color:'red',fontSize:'xx-small'}}   onClick={handleClearFilterButtonClicked}   startIcon={<HighlightOffIcon/>}>
Quitar filtros
                        </Button>

                     </Stack>

                  </Grid>

               </Grid> 

               {NameMapButton=='Mostrar mapa'?(

                  <>   
      
                     <Paper square={false} sx={{ minWidth: '80%', m: '2rem', pb: '2rem' }}>

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
            
               ):(<Map  /> ) } 

               {NameMapButton=='Mostrar mapa' ?(
   
                  <ShowMapButton     onClick={clickMapButton} name={NameMapButton} icon={<MapIcon/>}/>
               ):(

                  <ShowMapButton     onClick={clickMapButton} name={NameMapButton} icon={<ListIcon/>}/>
               )}
               
            </>
            
         )
         } 
            
      </>
   )
}
