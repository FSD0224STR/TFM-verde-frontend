import React, { useState } from 'react';
import NavListDrawer from './NavListDrawer';
import MeetDancingIcon from '../../assets/MeetDancingIcon.png';
import {
   AppBar,
   Avatar,
   Box,
   Button,
   Drawer,
   IconButton,
   Toolbar,
   Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
export default function NavBar() {
   const [open, setOpen] = useState(false);

   return (
      <>
         <AppBar position="static" sx={{ textAlign: 'left', padding:'0.8rem'}}>
            <Toolbar sx={{justifyContent:'space-between' }}>
               <IconButton
                  color="inherit"
                  size="3rem"
                  onClick={() => setOpen(true)}
               >
                  <MenuIcon viewBox="0 0 20 20"/>
                  <Avatar src={MeetDancingIcon} alt="meetDancig icono" sx={{ m: 'auto',ml:'3rem', width: 50, height: 50 }}/>
                  <Typography fontSize="2rem" fontWeight="bold" ml="0.5rem">MeetDancing</Typography>
               </IconButton>
                 
               <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
                  <Typography mr='1rem'>¿Aun no eres miembro?</Typography>
                  <Button component={NavLink} to='/register' color="inherit" sx={{mr:'1rem',bgcolor:'#338DB8',paddingInline:'1.5rem'}}>Sing Up</Button>
                  <Button component={NavLink} to='/login' color="inherit" sx={{bgcolor:'background.secondary',color:'text.secondary',paddingInline:'1.5rem'}}>Login</Button>
               </Box>
            </Toolbar>
         </AppBar>
         <Drawer open={open} anchor="left" onClose={() => setOpen(false)}>
            <NavListDrawer setOpen={setOpen} />
         </Drawer>
      </>
   );
}
