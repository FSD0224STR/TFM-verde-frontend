import { useState } from 'react';
import NavListDrawer from './NavListDrawer';
import MeetDancingIcon from '../../assets/MeetDancingIcon.png';
import {
   AppBar,
   Avatar,
   Box,
   Button,
   Drawer,
   Hidden,
   IconButton,
   Toolbar,
   Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, NavLink } from 'react-router-dom';
export default function NavBar() {
   const [open, setOpen] = useState(false);

   return (
      <>
         <AppBar sx={{ textAlign: 'left', padding: '0.8rem',position: 'fixed',top: 0,width: '100%',zIndex: 1000,}}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
               <Box display='flex'>
                  <IconButton color="inherit" size="3rem" onClick={() => setOpen(true)}>
                     <MenuIcon viewBox="0 0 20 20" />
                  </IconButton>

                  <Avatar
                     src={MeetDancingIcon}
                     alt="meetDancig icono"
                     sx={{ m: 'auto', ml: '3rem', width: 50, height: 50 }}
                  />
                  
                  <Typography 
                     fontSize="2rem"
                     fontWeight="bold"
                     ml="0.5rem"
                     fontFamily="Dancing Script"
                     color="inherit"
                  >
                     <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>MeetDancing</Link>
                  </Typography>
                
               </Box>

               <Box
                  sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}
               >
                  <Hidden mdDown>
                     <Typography mr="1rem">
                ¿Aun no eres miembro?
                     </Typography>
                  </Hidden>
                  <Button
                     component={NavLink}
                     to="/register"
                     color="inherit"
                     sx={{ mr: '1rem', bgcolor: '#338DB8', paddingInline: '1.5rem' }}
                  >
              Registrate
                  </Button>
                  <Button
                     component={NavLink}
                     to="/login"
                     color="inherit"
                     sx={{
                        bgcolor: 'background.secondary',
                        color: 'text.secondary',
                        paddingInline: '1.5rem',
                     }}
                  >
              Conectate
                  </Button>
               </Box>
            </Toolbar>
         </AppBar>
         <Drawer open={open} anchor="left" onClose={() => setOpen(false)}>
            <NavListDrawer setOpen={setOpen} />
         </Drawer>
      </>
   );
}
