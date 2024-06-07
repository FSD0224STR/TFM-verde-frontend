
import MailIcon from '@mui/icons-material/Mail';
import MeetDancingIcon from '../../assets/MeetDancingIcon.png';
import PlaceIcon from '@mui/icons-material/Place';
import events from '../../img/events.png'
import {
   AppBar,
   Avatar,
   Box,
   Hidden,
   IconButton,
   Badge,
   Toolbar,
   Typography,
   Tooltip,
   Drawer,
   Icon
} from '@mui/material';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import MenuProfile from './MenuProfile';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import MenuDrawerList from './MenuDrawerList';

export default function NavigationMenu({handleNavProfile,handleSwitchNav}) {
   const [open, setOpen] = useState(false);
   const navigate = useNavigate()
   return (
      <>
         <AppBar position="static" sx={{ textAlign: 'left', padding: '1rem'}}>
            <Toolbar sx={{ justifyContent: { xs:'flex-start',sm:'space-between'},alignItems:'center' }}>
               <Box display='flex'>

                  <IconButton color="inherit" size="3rem" onClick={() => setOpen(true)} sx={{ display: { xs:'flex', sm: 'none' } }}>
                     <MenuIcon viewBox="0 0 20 20" />
                  </IconButton>
                     
                  <Box sx={{display:{xs:'flex'}, ml:{xs:'3.5rem',sm:'0'}}}>
                     <Avatar
                        src={MeetDancingIcon}
                        alt="meetDancig icono"
                        sx={{ m: 'auto', width: 50, height: 50 }}
                     />
                     <Typography 
                        fontSize="2rem"
                        fontWeight="bold"
                        ml="0.5rem"
                        fontFamily="Dancing Script"
                        color="inherit"
                     >
                        <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>MeetDancing</Link>
                     </Typography>
                  </Box>
               </Box>

               <Box
                  sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center',mr:'2rem' }}
               >
                  <Tooltip title="Centros de baile">
                     <IconButton onClick={()=> navigate('/home')}>
                        <PlaceIcon sx={{fontSize:35,ml:'0.5rem',color:'white'}}/>
                     </IconButton>
                  </Tooltip>
                  <Tooltip title="mensajes">
                     <IconButton>
                        <Badge  badgeContent={100} max={99} color='error' sx={{'&.MuiBadge-root':{color:'white'}}} >
                           <MailIcon sx={{fontSize:35,ml:'0.5rem'}}/>
                        </Badge>
                     </IconButton>
                  </Tooltip>
                  <Tooltip title="Eventos de interés">
                     <IconButton onClick={()=> navigate('/events')} >
                        <Badge  badgeContent={5} max={99} color='error' >
                           <Icon component="img" src={events} sx={{ fontSize: 35,ml:'0.5rem'}}></Icon>
                        </Badge>
                     </IconButton>
                  </Tooltip>
               </Box>
               <Box sx={{display: { xs: 'none', sm: 'flex' }, alignItems: 'center', textAlign: 'center' }}>
                  <Tooltip title="Notificaciones">
                     <IconButton>
                        <Badge  badgeContent={5} max={99} color='error' sx={{'&.MuiBadge-root':{color:'white'}}} >
                           <NotificationsIcon sx={{ fontSize: 35, color: 'white' }} />
                        </Badge>
                     </IconButton>
                  </Tooltip>
                  <MenuProfile handleNavProfile={handleNavProfile} handleSwitchNav={ handleSwitchNav} />
               </Box>
            </Toolbar>
         </AppBar>
         <Drawer open={open}    anchor="left" onClose={() => setOpen(false)}>
            <MenuDrawerList setOpen={setOpen}  />
         </Drawer>
      </>
   );
}
