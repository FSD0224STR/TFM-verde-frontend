
import { Avatar, Box, Divider, Grid, Icon, ListItemButton, Typography } from '@mui/material'
import ComponentMessageList from './ComponentMessageList'
import { useState } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import imgDefault from '../../img/fotoDefault.jpg'

export default function ListMessages() {
   const [openChat, setOpenChat] = useState(false);
   return (
       
      <Grid container sx={{ bgcolor:'white',maxWidth:'85%',minHeight:'83vh',mx:'4rem',mt:'4.2rem',borderRadius:2}}>
         <Grid item xs={12} md={4} sx={{ bgcolor: '#ddeced', color: 'primary.main', borderRadius: 2 }}>
            <Typography variant='h4' sx={{ fontWeight: 'bold', textAlign: 'center', m:'1rem',mb:'2rem'}}>Bandeja de entrada</Typography>
            <Divider />
            <ListItemButton onClick={()=>setOpenChat(true)} sx={{display:'flex',maxWidth:'100%',m:'1.5rem',cursor:'pointer'}}>
               <Avatar src={imgDefault} sx={{ width: 70, height: 70 }} />
               <Box sx={{ display: 'flex', flexDirection: 'column',ml:'1rem' }}>
                  <Typography variant='h6' sx={{fontSize: '1.6rem' }}>Maria Sanchez</Typography>
                  <Typography sx={{fontSize:'1.2rem'}}>Hola que tal</Typography>
               </Box>
            </ListItemButton>
            <Divider />
            <ListItemButton onClick={()=>setOpenChat(true)} sx={{display:'flex',maxWidth:'100%',m:'1.5rem',cursor:'pointer'}}>
               <Avatar src="https://reqres.in/img/faces/1-image.jpg" sx={{ width: 70, height: 70 }} />
               <Box sx={{ display: 'flex', flexDirection: 'column',ml:'1rem' }}>
                  <Typography variant='h6' sx={{fontSize: '1.6rem' }}>Pedro Gomez</Typography>
                  <Typography sx={{fontSize:'1.2rem'}}>Donde vamos a quedar ?</Typography>
               </Box>
            </ListItemButton>
            <Divider />
            <ListItemButton onClick={()=>setOpenChat(true)} sx={{display:'flex',maxWidth:'100%',m:'1.5rem',cursor:'pointer'}}>
               <Avatar src='https://reqres.in/img/faces/5-image.jpg' sx={{ width: 70, height: 70 }} />
               <Box sx={{ display: 'flex', flexDirection: 'column',ml:'1rem' }}>
                  <Typography variant='h6' sx={{fontSize: '1.6rem' }}>Joao Victor</Typography>
                  <Typography sx={{fontSize:'1.2rem'}}>Me encataria ir a este evento !!</Typography>
               </Box>
            </ListItemButton>
            <Divider/>
         </Grid>
         <Grid item xs={12} md={8} sx={{display: 'flex', justifyContent: 'center',alignItems:'center'}} >
            {openChat ?
               <ComponentMessageList setOpenChat={setOpenChat} /> : 
            
               <Grid item sx={{ color:'primary.main',display:'flex',flexDirection:'column',alignItems:'center' }}>
                 
                  <EmailIcon sx={{fontSize:120}}/>
                
                  <Typography variant='h2' sx={{fontWeight:'bold'}}>
                     Ningún mensaje seleccionado
                  </Typography>
                  <Typography variant='h6' sx={{textAlign:'center',m:'1rem',fontSize:'1.5rem'}}>Escoge una conversacion a la Izquierda para empezar</Typography>
                  
               </Grid>

            }
           
         </Grid>
      </Grid>
   )
}
