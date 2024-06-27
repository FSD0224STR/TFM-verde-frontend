import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export function LocationComponentMap({ feature}) {

   return (
      <Card >
         <CardMedia
            component="img"
            height="194"
            image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt_fcdW_dwM-vM7XKx-dQyEpkN4RUTwhrSPQ&s'
            alt="no hay"
         />
        
         <CardContent  >
            <Typography variant="h6" component="div">
               {feature.properties.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
               {feature.properties.address}
            </Typography>
       
         </CardContent>
        
      </Card>
   );

}
