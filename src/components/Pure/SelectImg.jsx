import React from 'react';
import { Box, Typography, Grid, Button, Avatar } from '@mui/material';
export default function SelectImg({ imgProfile, handleSelectImg }) {
   return (
      <>
         <Box
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

            <Avatar
               alt="Remy Sharp"
               src={imgProfile}
               sx={{ width: 300, height: 300 ,mb:'2rem'}}
            />

            <Grid item xs={12}>
               <Button variant="contained" sx={{ position: 'relative', mb: '5rem' }}>
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
         </Box>
      </>
   );
}

// (e) => {
//     setFieldValue('imgProfile', e.target.files[0]); //PARA RECOGER VALORES DE TARGET
//     if (e.target.files[0]) {
//        const reader = new FileReader();
//        reader.onload = function (e) {
//           setFieldValue('imgProfile', e.target.result); //PARA RECOGER VALORES DE TARGET
//        };
//        reader.readAsDataURL(e.target.files[0]);
//     } else {
//        setFieldValue('imgProfile', defaultImg);
//     }
//  }
