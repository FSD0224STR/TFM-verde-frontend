import  { useContext, useEffect, useState} from 'react'
import NavigationMenu from '../components/Menu/NavigationMenu'
import { Alert, Box, Grid,Typography } from '@mui/material'
import { EventComponent } from '../components/Pure/EventComponent'
import { EventContext } from '../context/eventContext'
import { CircularProgressLoading } from '../components/Pure/Loading'
import { LoginContextP } from '../context/loginContextPrueba'
import { DividerWithText } from '../components/Pure/Divider'

export default function EventsList() {

   const [loading,setLoading]=useState(false)
   const [error,setError]=useState('')
   const {listEventsInterested,   getAllEventsUser,listUpcomingEvents, button_interestedEvent_Clicked,setButton_interestedEvent_Clicked}=useContext(EventContext)
   const { profileDetails, setIsLoggedIn } = useContext(LoginContextP)
   const getAllEvents= async () => {
      setLoading(true)
      const response=await getAllEventsUser()
      if (response.error) {
         setError('Ha habido un error al visualizar tus eventos de interés')
         setTimeout(()=>{
            setError('')
         },3000)
         return
      }
      setLoading(false)
      setButton_interestedEvent_Clicked(false);
      return
   }
   useEffect(() => {
      const token = localStorage.getItem('access_token');
      if(token)setIsLoggedIn(true)
   }, [profileDetails]);

   useEffect (()=>{
      getAllEvents()
   },[button_interestedEvent_Clicked ])
   return (
      <>
         <NavigationMenu />
         {error && <Alert variant="filled" severity="error"  sx={{textAlign:'center',fontSize:'2rem',m:'20px'}}  >
            {error}
         </Alert> }
       
         {loading ?  (  <CircularProgressLoading/>):(
            <>
               
               {listEventsInterested.length || listUpcomingEvents.length ? (
                  <Box
                     width="100%"
                     display="flex"
                     flexDirection="column"
                     justifyContent="center"
                     alignItems="center"
                  >
                     
                     {listEventsInterested.length && (
                           
                        <Grid container
                           maxWidth="100%"
                           justifyContent="center"
                           gap={4}
                           spacing={4}
                           sx={{ m: '2rem' }}>

                           <Grid
                              item
                              display="flex"
                              justifyContent="center"
                              xs={12}
                              sm={12}
                              md={12}
                              lg={12}
                           >

                              <Typography
                                 textAlign="center"
                                 variant="h2"
                                 my="1rem"
                                 color="primary.main"
                                 fontWeight='bold'
                              >
                 Eventos de interés
                              </Typography>

                           </Grid>
                           {listEventsInterested.map((event,index)=> (
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
                                 <EventComponent findPartner={true}  event={event}   locationDatas={event.idLocation}  />
                              </Grid>
                           ))}
                        </Grid>
                        
                     )}

                     {listUpcomingEvents.length && (

                        <Grid container
                           maxWidth="100%"
                           justifyContent="center"
                           gap={4}
                           spacing={4}
                           sx={{ m: '2rem' }}>

                           <Grid
                              item
                              display="flex"
                              justifyContent="center"
                              xs={12}
                              sm={12}
                              md={12}
                              lg={12}
                           >

                              <DividerWithText text='Eventos Confirmados' />
                           
                           </Grid>
                         
                           {listUpcomingEvents.map((event,index)=> (
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
                                 <EventComponent   couple={true}   locationDatas={event.idEvent.idLocation}  event={event.idEvent} coupleInfo={event.idCouple} />
                              </Grid>
                           ))}
                          
                        </Grid>
                     )} 
                   
                  </Box>
               ):(
                  <>

                     <Typography
                        textAlign="center"
                        variant="h2"
                        my="3rem"
                        color="primary.main"
                        fontWeight='bold'
                     >
                       Eventos de interés
                     </Typography> 

                     <Typography
                        textAlign="center"
                        variant="h2"
                        my="3rem"
                        color="text.secondary"
                     >
                   Actualmente no te has interesado en ningun evento.
                     </Typography>

                  </>
               )}
            </>
         )}
      </>
   )
}