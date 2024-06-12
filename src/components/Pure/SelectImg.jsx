import React from 'react';
import { Typography, Grid, Button, Avatar } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
export default function SelectImg({ imgProfile, handleSelectImg, loading }) {
   
   return (
      <Grid
         container
         sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
         }}
      >
         <Typography
            variant="h6"
            sx={{
               color: 'primary.main',
               fontWeight: 'bold',
               textAlign: 'left',
               margin: '10px',
               fontSize: '20px',
            }}
         >
        1.Seleccione una foto para tu perfil
         </Typography>
         {loading ? (
            <CircularProgress  size={100} sx={{color:'secondary.main',m:'5rem'}}/>
         ) : (
            <Avatar
               alt="Remy Sharp"
               src={imgProfile}
               sx={{ width: 300, height: 300, mb: '2rem' }}
            />
         )}

         <Grid item xs={12}>
            
            <Button variant="contained" disabled={loading? true : false}  sx={{ position: 'relative', mb: '5rem',':disabled':{opacity:'0'} }}>
               <input
                  style={{
                     position: 'absolute',
                     top: 0,
                     left: 0,
                     width: '100%',
                     height: '100%',
                     opacity: 0,
                     cursor: 'pointer',
                  }}
                  name="imgProfile"
                  type="file"
                  accept="image/*"
                  onChange={handleSelectImg}
               />
          Seleccionar foto
            </Button>
         </Grid>
      </Grid>
   );
}
