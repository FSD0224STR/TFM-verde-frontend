import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActions } from '@mui/material';
import { RepeatButton } from './CommonButton';

export function LocationComponentMap({ feature}) {

   return (
      <Card sx={{display:'flex',position:'relative',flexDirection:'column'}} >
         <CardMedia
            component="img"
            height="194"
            image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt_fcdW_dwM-vM7XKx-dQyEpkN4RUTwhrSPQ&s'
            alt="no hay"
         />
        
         <CardContent  /* sx={{display:'flex',position:'relative',flexDirection:'column'}} */>
            <Typography variant="h6" component="div">
               {feature.properties.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
               {feature.properties.address}
            </Typography>

            <RepeatButton    /* onClick={handleClick} */ name='Ver eventos'></RepeatButton>
       
         </CardContent>
        
      </Card>
   );

}
