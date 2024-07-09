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
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Alert, Box, Button, Icon, Paper, Stack} from '@mui/material';
import { RepeatButton } from './CommonButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import dayjs from 'dayjs';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import danceCouple from '../../img/danceCouple.png'
import priceImg from '../../img/price.png'
import people from '../../img/people.png'
import { MessagesContext } from '../../context/messagesContext';

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
      photoURL,      

   }=event
   const {setSendEventForCouple} = useContext(MessagesContext)
   const navigate = useNavigate();
   const [expanded, setExpanded] = useState(false);
   const [error,setError] = useState();
   const [isInterested,setIsInterested]=useState(false)
   const dateFormat=dayjs(date.start).format('DD MMMM YYYY').toUpperCase()
   const hourFormat=dayjs(date.start).format('HH:mm').toUpperCase()
   const hourFormatEnd=dayjs(date.end).format('HH:mm').toUpperCase()

   const handleExpandClick = () => {
      setExpanded(!expanded);
   };

   const click_Find_Partner = async () => {
      setSendEventForCouple({name,date:dateFormat,hour:hourFormat,_id})
      navigate('/profiles'); 
 
   };
  
   return (
      <Paper  elevation={22}  sx={{ minWidth: 400, minHeight:600, color: 'text.secondary'}}>
        
         <CardMedia
            component="img"
            height="200"
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
                  <Button variant="text" sx={{color:'red',fontSize:'xx-small'}}  /* onClick={delete_Interest_Event}  */ startIcon={<HighlightOffIcon/>}>
  Ya no me interesa este evento
                  </Button>
           
               </>
            
               )                     
               :(<RepeatButton name='Me interesa' /* onClick={click_For_interesting} */ ></RepeatButton>)
            
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
