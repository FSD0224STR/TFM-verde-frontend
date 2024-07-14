import * as React from 'react';

import unavailableimage from '../../img/unavailable-image.jpg'
import {CardMedia, Grid, Typography } from '@mui/material';

export const LocationComponentBig=({location})=> {

   const{

      name,
      address,
      photoURL

   }=location

   return (

      <Grid
         container
         maxWidth="80%"
         minWidth='80%'
         justifyContent="left"
         spacing={1}
         sx={{ m: '1rem',bgcolor:'white', borderRadius: '50px' ,  padding: '5px 5px 5px'}}
         
      >
            
         <Grid  item
       
            display="flex"
            justifyContent="center"
            p={1}
            xs={12}
            sm={6}
            md={6}
            lg={6}
         > 
          
            <CardMedia
               component="img"
               sx={{maxWidth: 280,borderRadius: '50px'}}

               image={photoURL ? (photoURL):( unavailableimage)}
              
            />
         </Grid>

         <Grid  item
            display="flex"
            flexDirection='column'
          
            xs={12}
            sm={6}
            md={6}
            lg={6} >
             
            <Grid item
       
               display="flex"
               justifyContent="center" 
               alignItems='center'
               p={1}
               xs={12}
               sm={12}
               md={12}
               lg={12}> 
          
               <Typography  sx={{color:'primary.main',fontSize: '1.5rem', fontWeight: 'bold',textAlign: 'center'}} >{name}</Typography>
            </Grid>

            <Grid item
       
               display="flex"
               justifyContent="center"
               
               p={1}
               xs={12}
               sm={12}
               md={12}
               lg={12}> 
          
               <Typography  sx={{color:'stack.secondary',fontSize: '1.1rem', fontWeight: 'bold',  textAlign: 'center',fontStyle:'italic'
               }}>{address}</Typography>
            </Grid>
         </Grid>
      </Grid>

   );
      
}
