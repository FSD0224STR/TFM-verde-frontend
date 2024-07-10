import * as React from 'react';

import elson from '../../img/elson.jpg'
import { CardMedia, Grid, Paper, Typography } from '@mui/material';

export const LocationComponentBig=({location})=> {

   const{

      name,
      address,

   }=location

   return (
     
      <Paper square={false} elevation={15} sx={{ minWidth: '90%', m: '1rem', p: '1rem'}} >

         <Grid
            container
            minWidth="100%"
            justifyContent="left"
            spacing={1}
         
         >
            
            <Grid item  xs={6} lg={2}> 
          
               <CardMedia
                  component="img"
                  sx={{maxWidth: 280,minWidth:280}}
                  image={elson}
     
               />
            </Grid>

            <Grid  item  xs={6} >
             
               <Grid item xs={12} lg={2}> 
          
                  <Typography  sx={{color:'primary.main',fontSize: '1.20rem', fontWeight: 'bold'}} >{name}</Typography>
               </Grid>

               <Grid item xs={12} lg={2}> 
          
                  <Typography  sx={{color:'primary.main',fontSize: '1.20rem', fontWeight: 'bold'}}>{address}</Typography>
               </Grid>
            </Grid>
         </Grid>
   
      </Paper>

   );
}
