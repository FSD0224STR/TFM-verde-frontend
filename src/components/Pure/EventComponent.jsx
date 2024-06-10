import * as React from 'react';
import { styled } from '@mui/material/styles';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { LoginContextP } from '../../context/loginContextPrueba';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Alert, Box, Button, Icon, Paper, Stack} from '@mui/material';
import { updateEventApi, updateInterestedPeopleApi } from '../../apiServices/eventsApi';
import { useContext } from 'react';
import { RepeatButton } from './CommonButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import dayjs from 'dayjs';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import danceCouple from '../../img/danceCouple.png'
import priceImg from '../../img/price.png'
import people from '../../img/people.png'
import {updateUser} from '../../apiServices/usersApi'
import { useEffect } from 'react';
import { LocationContext } from '../../context/locationContext';
import { EventContext } from '../../context/eventContext';

const ExpandMore = styled((props) => {
   const { expand, ...other } = props;
   return <IconButton {...other} />;
})(({ theme, expand }) => ({
   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
   marginLeft: 'auto',
   transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
   }),
}));

export function EventComponent({event}) {

   const {

      name,
      _id, 
      typeOfDancing,
      price,
      availability,
      date,
      danceCouples,
      description,
      interestedPeople,
      photoURL

   }=event
   
   const navigate = useNavigate();
   const [expanded, setExpanded] = useState(false);
   const [error,setError] = useState();
   const {profileDetails} = useContext(LoginContextP)
   const{setListOfInterested}=useContext(EventContext)
   const [isInterested,setIsInterested]=useState(false)
   const dateFormat=dayjs(date.start).format('DD MMMM YYYY').toUpperCase()
   const hourFormat=dayjs(date.start).format('HH:mm').toUpperCase()
   const hourFormatEnd=dayjs(date.end).format('HH:mm').toUpperCase()
   const userId=profileDetails._id

   const handleExpandClick = () => {
      setExpanded(!expanded);
   };

   const check_interested_event=()=>{
      const eventId =_id
      const arrayInterestingEvent=profileDetails.interestingEvent
      const eventId_exist=arrayInterestingEvent.find((event)=>event===eventId)
      if (eventId_exist!==undefined) setIsInterested(true)
      return eventId_exist
   }

   useEffect(()=>{
      check_interested_event()
      setListOfInterested(interestedPeople)    
   },[])

   //Esta función incluye el evento en el usuario en el array de interestingEvent
   const update_User_Id_Event= async ()=>{

      const eventId_exist=check_interested_event()

      if (eventId_exist===undefined){
         const interesting_Event_Updated = [...profileDetails.interestingEvent,_id] //Añadimos el id de este evento a los que ya hay en interestingEvent del user.
         const modifiedData={interestingEvent:interesting_Event_Updated}
         const user = await updateUser(userId,modifiedData) 

         if (user.error) return setError('Este es el error al intentar añadir el evento a user',user.error )
         
         console.log('Has añadido este evento en interestingEvent en tu perfil:',user.data.interestingEvent)
         return (user.data.interestingEvent)

      }
   }

   const delete_Interest_Event= async ()=>{

      const delete_event_InUser=profileDetails.interestingEvent.filter(event=>event !=_id) //Me devuelve todos los eventos de interesados menos este.
      const modifyUser={interestingEvent:delete_event_InUser}
      const user = await updateUser(userId,modifyUser) 

      //////////////////////////////////////////////////////////////////////////
      const  delete_user_InEvent=interestedPeople.filter(user=>user.userId!==userId)
      console.log('Que es delete_user_InEvent',delete_user_InEvent)
      const modifyEvent={interestedPeople:delete_user_InEvent}
      const event = await updateEventApi(_id,modifyEvent)
      if(event.error || user.error) setError(`aqui estan los posibles errores al eliminar evento evento:${event.error} user:${user.error}`)  
      
      console.log('Tras eliminar el evento quiero ver que hay en interestedPeople dentro de este evento:' ,event.data.interestedPeople,'y user',user.data.interestingEvent)
      setIsInterested(false)
     
   }

   const  updateInterestedPeople_Event = async () => {
  
      const event = await updateInterestedPeopleApi(_id,userId)
  
      if(event.error) return setError(`aqui esta el error',${event.error}`)
         
      console.log('Te has interesad por este evento, ver evento con interestedPeople modificado:',event.data.interestedPeople)
      
   }

   const click_Find_Partner = async () => {
     
      navigate('/profiles'); 
 
   };

   const click_For_interesting = async () => {
      setIsInterested(true)
      await update_User_Id_Event(); 
      await updateInterestedPeople_Event(); 
      
   };
  
   return (
      <Paper  elevation={22}  sx={{ width: 340, color: 'text.secondary'/* ,backgroundColor:'grey'  */}}>
        
         <CardMedia
            component="img"
            height="175"
            image= {photoURL[0]} 
            alt=""
         />
            
         <CardContent sx={{display: 'flex',flexDirection:'column',gap:'15px',fontSize: '1rem'}}>

            <Typography variant='h5' sx={{color:'primary.main', textAlign: 'center',fontSize: '1.8rem', fontWeight: 'bold'}} > {name}</Typography>
            
            <Stack direction="column" spacing={1}>
               
               <Box sx={{ display: 'flex',gap:'5px'}}>
                  <CalendarMonthIcon sx={{color:'black'}}/>
                  {dateFormat}
               </Box>
               <Box sx={{ display: 'flex',gap:'5px'}}>
                  <QueryBuilderIcon sx={{color:'black'}}/>
                  { `${hourFormat}-${hourFormatEnd}`}
               </Box>
               <Box sx={{ display: 'flex',gap:'5px'}}>
                  <Icon component="img" src={danceCouple}  ></Icon>
                  {typeOfDancing.toUpperCase()}
               </Box>
               <Box sx={{ display: 'flex',gap:'5px'}}>
                  <Icon component="img" src={people}  ></Icon>
                  {availability}
               </Box>
               <Box sx={{ display: 'flex',gap:'5px'}}>
                  <Icon component="img" src={priceImg}  ></Icon>
                  {`${price}€`}
               </Box>
               <Box sx={{ display: 'flex',gap:'5px'}}>
                  <Icon component="img" src={people}  ></Icon>
                  {_id}
               </Box>
            </Stack>
         </CardContent>

         <CardActions   sx={{justifyContent: 'center',display:'flex',flexDirection:'column',padding: '0',gap: '0'}}>

            {isInterested ?
            
               (<>
                  <RepeatButton name='Encuentra tu pareja' onClick={click_Find_Partner} ></RepeatButton>
                  <Button variant="text" sx={{color:'red',fontSize:'xx-small'}}  onClick={delete_Interest_Event}  startIcon={<HighlightOffIcon/>}>
  Ya no me interesa este evento
                  </Button>
           
               </>
            
               )                     
               :(<RepeatButton name='Me interesa' onClick={click_For_interesting} ></RepeatButton>)
            
            }
           
         </CardActions>

         <CardActions>
            <ExpandMore 
       
               expand={expanded}
               onClick={handleExpandClick}
               aria-expanded={expanded}>
               <ExpandMoreIcon   />
            
            </ExpandMore>

            <IconButton>
               <ShareIcon />
            </IconButton>

         </CardActions>
         
         <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>

               <Typography variant='h6'> Descripción:</Typography>

               <Typography paragraph fontSize='small' >
            
                  {description}
               </Typography>
            </CardContent>
         </Collapse>

         {error && <Alert sx={{ mb: 2,mt:2 }}  variant="outlined" severity="error" onClose={() => setError('')}>{` ${error}`}</Alert>}
                     
      </Paper>

   );
        
}
