
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
import { useContext, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import MenuDrawerList from './MenuDrawerList';
import { MessagesContext } from '../../context/messagesContext';
import { UserContext } from '../../context/userContext';
import { EventContext } from '../../context/eventContext';

export default function NavigationMenu({ handleNavProfile, handleSwitchNav }) {
   const { getListMessages } = useContext(MessagesContext)
   const { handleNavConfig} = useContext(UserContext)
   const [open, setOpen] = useState(false);
   const {setCheckInterestedEvents_Button}=useContext(EventContext) 
   const navigate = useNavigate()
   return (
      <>
         <AppBar position="static" sx={{ textAlign: 'left', padding: '2rem'}}>
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
                        <Link to="/home" style={{ textDecoration: 'none', color: 'inherit',fontSize:'3rem' }}>MeetDancing</Link>
                     </Typography>
                  </Box>
               </Box>

               <Box
                  sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center',mr:'11rem',gap:'1.5rem' }}
               >
                  <Tooltip title="Centros de baile">
                     <IconButton onClick={()=> navigate('/home')}>
                        <PlaceIcon sx={{fontSize:45,ml:'0.5rem',color:'white'}}/>
                     </IconButton>
                  </Tooltip>
                  <Tooltip title="mensajes">
                     <IconButton onClick={getListMessages}>
                        <Badge  badgeContent={100} max={99} color='error' sx={{'&.MuiBadge-root':{color:'white'}}} >
                           <MailIcon sx={{fontSize:45,ml:'0.5rem'}}/>
                        </Badge>
                     </IconButton>
                  </Tooltip>
                  <Tooltip title="Eventos de interés">
                     <IconButton onClick={()=>setCheckInterestedEvents_Button(true)} >
                   
                        <Icon component="img" src={events} sx={{ fontSize: 35,ml:'0.5rem'}}></Icon>
                       
                     </IconButton>
                  </Tooltip>
               </Box>
               <Box sx={{display: { xs: 'none', sm: 'flex' }, alignItems: 'center', textAlign: 'center' }}>
                  <Tooltip title="Notificaciones">
                     <IconButton>
                        <Badge  badgeContent={5} max={99} color='error' sx={{'&.MuiBadge-root':{color:'white'}}} >
                           <NotificationsIcon sx={{ fontSize: 45, color: 'white' }} />
                        </Badge>
                     </IconButton>
                  </Tooltip>
                  <MenuProfile handleNavProfile={handleNavProfile} handleSwitchNav={ handleSwitchNav} />
               </Box>
            </Toolbar>
         </AppBar>
         <Drawer open={open}    anchor="left" onClose={() => setOpen(false)}>
            <MenuDrawerList setOpen={setOpen}  handleNavConfig={handleNavConfig} />
         </Drawer>
      </>
   );
}
