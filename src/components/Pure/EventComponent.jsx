import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { LoginContextP } from '../../context/loginContextPrueba';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Alert } from '@mui/material';
import { updateInterestedPeopleApi } from '../../apiServices/eventsApi';
import { useContext } from 'react';

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

export function EventComponent({ name, address,_id}) {
   const navigate = useNavigate();
   const [expanded, setExpanded] = useState(false);
   
   const [error,setError] = useState();
   const{profileDetails}=useContext(LoginContextP)

   const handleExpandClick = () => {
      setExpanded(!expanded);
   };

   const  updateInterestedPeople = async () => {
  
      const event = await updateInterestedPeopleApi(_id,profileDetails._id)
  
      if(event.error) setError(console.log('aqui esta el error',event.error))
  
      else {
  
         console.log('Cual es el id del usuario registrado',profileDetails._id)
         console.log('Estas entrando en el else de updateInterestedPeople',event.data)
         return  event.data
                         
      }
      
   }

   const handleClick = async () => {

      console.log('Cual es el id del usuario actual:',profileDetails._id)
      console.log('Cual es el id del evento:',_id,'y el nombre:',name)
      await updateInterestedPeople();
      navigate('/profiles');
   };

   return (
      <Card sx={{ maxWidth: 345, color: 'text.secondary' }}>
         <CardHeader
           
            action={
               <IconButton>
                  <ShareIcon />
               </IconButton>
            }
            title={name}
            subheader={address}
            
         />
         <CardMedia
            component="img"
            height="194"
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6cXZHOGuTHCJ7zH0W5vS-zeNvrUNCUnXH9w&usqp=CAU"
            alt=""
         />

         {/* <Carousel></Carousel> */}
         <CardContent>
            <Typography variant="body2" color="text.secondary">
         Interested people: 
         _idEvento={_id}
      
            </Typography>
         </CardContent>
         <CardActions disableSpacing>
            <IconButton aria-label="add to favorites" onClick={handleClick} >
               <FavoriteIcon />
            </IconButton>
           
            <ExpandMore
               expand={expanded}
               onClick={handleExpandClick}
               aria-expanded={expanded}
               aria-label="show more"
            >
               <ExpandMoreIcon />
            </ExpandMore>
         </CardActions>
         <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
               <Typography paragraph>
            Tipos de eventos que tiene este local, para probar el filtro
               </Typography>

               <Typography paragraph>Descripción:</Typography>

               <Typography paragraph>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
            obcaecati magni praesentium, quaerat architecto at ipsum. Magni
            tenetur ipsa commodi fuga non necessitatibus culpa ipsam cupiditate
            odio? Neque, quae dignissimos.r
               </Typography>
            </CardContent>
         </Collapse>

         {error && <Alert sx={{ mb: 2,mt:2 }}  variant="outlined" severity="error" onClose={() => setError('')}>{` ${error}`}</Alert>}
                     
      </Card>

   );
        
}
