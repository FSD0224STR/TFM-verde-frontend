import * as React from 'react';
import Box from '@mui/material/Box';
import { Switch as BaseSwitch, switchClasses } from '@mui/base/Switch'
import { styled } from '@mui/system';
import { ThemeProvider } from '@emotion/react';
import { buttons_theme, events_card_theme } from '../../palette-theme-colors';
import {  Button, CardMedia,  Divider, LinearProgress, Typography } from '@mui/material';

import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import Stack from '@mui/material/Stack';

export default function LocationFiltered() {
 
   return (

      <ThemeProvider theme={events_card_theme} >
        
         <Box 
            position='relative'
            height={600}
            width={450}
            my={10}
            p={2}
            sx={{ bgcolor:'primary.main' }}
         >

            <CardMedia
               component="img"
               image="https://relatossalseros.files.wordpress.com/2022/08/998e4-7-new-york-sensual-bachata-night-relatossalseros-wordpress-com.jpg?w=869"
               alt="Descripción de la imagen"
                  
               sx={{
                  position: 'absolute', 
                  top: 10, 
                  maxWidth: '80%',
                  maxHeight: '50%',
                  marginLeft:'5.8%',

               }}
            />

            <Stack  direction="column"
               divider={<Divider orientation="row" flexItem />}
               spacing={1}
               position='absolute'
               left='9%'
               top='45%'
               color={'primary.contrastText'}
            >
               
               <Box display= 'flex' gap='8px'>
                  <CalendarMonthOutlinedIcon />
                  <Typography variant="h7">
Fecha: 25/10/2024
                  </Typography>

               </Box>

               <Box display= 'flex' gap='8px'>

                  <TimerOutlinedIcon  />
                  <Typography variant="h7">
Horario: 22:00 - 00:00
                  </Typography>
               </Box>
               <Box display= 'flex' gap='8px'>
                  <Groups2OutlinedIcon   />

                  <Typography variant="h7">
Estilo: Salsa cubana
                  </Typography>
               </Box>

               <Box display= 'flex' gap='8px'>
                  <Groups2OutlinedIcon   />

                  <Typography variant="h7">
Nivel: Fácil
                  </Typography>
               </Box>

               <Box display= 'flex' gap='8px'>
                  <Groups2OutlinedIcon   />

                  <Typography variant="h7">
Participantes: 10/30 plazas
                  </Typography>
           
               </Box>

            </Stack>
         
            <ThemeProvider theme={buttons_theme}>
               <Button variant="contained"  sx={{ borderRadius: 50,
                  position: 'absolute', 
                  bottom:'10%',
                  marginLeft:'15%',

               }} >
               Ver mas información del centro
               </Button>
            </ThemeProvider>

         </Box>
          
      </ThemeProvider>
     
   );
}