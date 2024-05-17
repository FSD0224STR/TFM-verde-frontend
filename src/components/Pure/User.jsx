import { useState } from 'react';
import {
   Card,
   CardMedia,
   CardContent,
   Typography,
   CardActions,
   Button,
   Box,
   Chip,
   Stack,
} from '@mui/material';

const listImages = {
   img1:'',
   img2:'',
   img3:'',
}

export default function User({ userApi }) {
   const {
      name,
      subName,
      email,
      description,
      gender,
      dateOfBirth,
      role,
      city,
      status,
      rating,
      age,
      imgProfile
   } = userApi;

   return (
      <div>
         <Card
            sx={{
               transitionDuration: '2s',
               maxWidth: 300,
               minWidth: 300,
               maxHeight: 600,
               boxShadow: '5',
               position: 'relative',
               '&:hover': {
                  transition: ' all 1s ease-in-out',
                  transform: 'scale(1.05)'
               }
           
            }}
         >
            <Box sx={{ position: 'relative' }}>
               <Box
                  component="div"
                  sx={{ position: 'absolute', top: '80%', ml: '0.5rem' }}
               >
                  <Typography
                     variant="h5"
                     sx={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                      
                     }}
                  >
                     {name} {subName}
                  </Typography>
                  <Typography
                     sx={{
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        
                     }}
                  >
              ({gender === 'Male' ? 'M' : 'F'}/{age}){city}
                  </Typography>
               </Box>
               <Box position="static">
                  <CardMedia
                     component="img"
                     title="Profile picture"
                     src={imgProfile}
                     sx={{ 
                        width: '100%', // Adjust the width as needed
                        height: '300px', // Set the desired height
                        objectFit: 'cover', // Adjust the object fit as needed
                     }}
                  />
               </Box>
            </Box>
            <CardContent
               sx={{
                  overflow: 'hidden',
                  maxHeight: '8rem', // Altura para 3 líneas de texto
               }}
            >
               <Stack direction="row" spacing={1}>
                  {role === 'Leader' ? (
                     <Chip
                        label="Leader"
                        color="success"
                        size="small"
                        sx={{
                           '&.MuiChip-root': { backgroundColor: 'stack.secondary' },
                        }}
                     />
                  ) : (
                     <Chip
                        label="Follower"
                        sx={{ '&.MuiChip-root': { backgroundColor: 'stack.primary' } }}
                        size="small"
                     />
                  )}
               </Stack>
               <Typography variant="body" color="text.secondary" fontSize="1.2rem">
                  {description}
               </Typography>
            </CardContent>
            <Box
               display="flex"
               sx={{ width: '100%', justifyContent: 'center', padding: '0.5rem' }}
            >
               <CardActions>
                  <Button
                     size="medium"
                     sx={{
                        position: 'relative',
                        padding: '0.5rem',
                        mb: '1rem',
                        maxWidth: '100%',
                        width: '100%',
                        bgcolor: 'primary.main',
                        color: 'text.primary',
                        display: 'flex',
                        alignItems: 'center',
                        px: '1rem',
                        '&:hover': {
                           '& .MuiTypography-root': {
                              color: 'text.secondary',
                           },
                           backgroundColor: 'background.nav',
                        },
                     }}
                  >
              Perfil completo
                  </Button>
               </CardActions>
            </Box>
         </Card>
      </div>
   );
}
