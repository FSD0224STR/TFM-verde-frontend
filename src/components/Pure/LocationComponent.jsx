import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { LoginContextP } from '../../context/loginContextPrueba';
import { LocationContext } from '../../context/locationContext';

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

export function LocationsComponent({ name, address,_id}) {
   const [expanded, setExpanded] = React.useState(false);
   const {navigate}=React.useContext(LoginContextP)
   const{setIdLocal}=React.useContext(LocationContext)

   const handleExpandClick = () => {
      setExpanded(!expanded);
   };

   return (
      <Card sx={{ maxWidth: 345, color: 'text.secondary' }}>
         <CardHeader
            avatar={
               <Avatar sx={{ bgcolor: 'primary.main',color:'white' }} aria-label="recipe">
                  {name.slice(0,2)}
               </Avatar>
            }
            action={
               <IconButton aria-label="settings">
                  <MoreVertIcon />
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
         <CardContent>
            <Typography variant="body2" color="text.secondary">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut ea rem
          doloribus repellendus quasi, minus enim culpa dolores quos perferendis
          voluptas debitis dolore est vero nulla nemo aperiam dicta corporis?
            </Typography>
         </CardContent>
         <CardActions disableSpacing>
            <IconButton aria-label="add to favorites" onClick={()=> {navigate(`/events/${_id}`);setIdLocal(_id);console.log('Estas en centro con id',`${_id}`)}} >
               <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
               <ShareIcon />
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
                     
      </Card>

   );
        
}
