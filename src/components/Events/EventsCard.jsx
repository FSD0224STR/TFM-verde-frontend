
import Box from '@mui/material/Box';
import { Switch as BaseSwitch, switchClasses } from '@mui/base/Switch'
import { styled } from '@mui/system';
import { ThemeProvider } from '@emotion/react';
import { buttons_theme, events_card_theme } from '../../../palette-theme-colors';
import {  Button, CardMedia,  Divider, Typography } from '@mui/material';

import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import Stack from '@mui/material/Stack';

import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';

const Switch = styled(BaseSwitch)`
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 30px;
  height: 20px;
  background: #B11010;
  border-radius: 10px;
  margin: 10px;
  cursor: pointer;

  & .${switchClasses.thumb} {
    display: block;
    width: 14px;
    height: 14px;
    top: 3px;
    left: 3px;
    border-radius: 16px;
    background-color: #fff;
    position: relative;
    transition: all 100ms ease;
  }

  & .${switchClasses.input} {
    cursor: inherit;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
    margin: 0;
  }

  &.${switchClasses.disabled} {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &.${switchClasses.checked} {
    background: #00c853;

    & .${switchClasses.thumb} {
      left: 14px;
      top: 3px;
      background-color: #ffff;
    }
  }
`
export default function EventCard() {
 
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
            <Switch   sx={{
               position: 'absolute', 
               right: 0, 
               top: 0, 
            }} />

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
               <Button variant="contained" startIcon={<PersonSearchOutlinedIcon />} sx={{ borderRadius: 50,
                  position: 'absolute', 
                  bottom:'10%',
                  marginLeft:'24%',

               }} >
               Encuentra tu pareja
               </Button>
            </ThemeProvider>

         </Box>
          
      </ThemeProvider>
     
   );
}