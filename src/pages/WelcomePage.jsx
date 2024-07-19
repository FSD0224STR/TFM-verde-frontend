import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import NavBar from '../components/NavBar/NavBar';
import { useNavigate } from 'react-router-dom';

export default function WelcomePage() {
   const navigate= useNavigate()
   useEffect(() => {
      setTimeout(() => {
            
         navigate('/login')
      }, 4000);
   })
   return (
      <>
         <NavBar />
         <Box
            sx={{
               display: 'flex',
               flexDirection: 'column',
               justifyContent: 'center',
               alignItems: 'center',
               width: '90%',
               height: '100vh',
            }}
         >
            <Box width={'80%'} sx={{ mb: '5rem' }}>
               <Typography
                  variant="h3"
                  sx={{
                     fontWeight: 'bold',
                     textAlign: 'center',
                     mb: '5rem',
                     color: 'primary.main',
                     fontSize:'4rem'
                  }}
               >
            Bienvenido a     <Box
                     component="span"
                     variant='h3'
                     sx={{ fontFamily: 'Dancing Script', fontSize: '6rem', color: 'secondary.variante',fontWeight:'bold' }}
                  >
                                 MeetDancig
                  </Box>{' '}
               </Typography>
               <Typography
                  sx={{ color: 'primary.main' }}
                  fontSize={'2rem'}
                  textAlign={'center'}
               >
            Estamos encantados de tenerte en nuestra vibrante comunidad de
            amantes del baile. MeetDancing es tu plataforma ideal para conectar
            con otros bailarines apasionados como tú. Ya sea que busques
            perfeccionar tus movimientos, encontrar un compañero para una clase
            o simplemente disfrutar de una noche de baile, has llegado al lugar
            adecuado.
               </Typography>
            </Box>
            <Typography variant='h5'>Te hemos envia un email para confirmar la cuenta. En breve serás dirigido al inicio de sesión.... si no deseas esperar pulsa en Conectate</Typography>
         </Box>
      </>
   );
}
