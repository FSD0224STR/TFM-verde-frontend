import React, { useContext } from 'react';
import {
   Box,
   Button,
   Divider,
   List,
   ListItem,
   ListItemButton,
   ListItemIcon,
   ListItemText,
   ThemeProvider,
   Typography,
   IconButton,
   Avatar,
   Badge
} from '@mui/material';
import { main_theme } from '../../../palette-theme-colors';
import PlaceIcon from '@mui/icons-material/Place';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import Person2Icon from '@mui/icons-material/Person2';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Settings from '@mui/icons-material/Settings';
import MailIcon from '@mui/icons-material/Mail';
import CloseIcon from '@mui/icons-material/Close';
import { NavLink ,Link} from 'react-router-dom';
import imagenDefault from '../../assets/fotoDefault.png'
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import { LoginContextP } from '../../context/loginContextPrueba';
export default function MenuDrawerList({ setOpen }) {

   const { logout,profileDetails } = useContext(LoginContextP)
   return (
      <ThemeProvider theme={main_theme}>
         <Box
            sx={{
               maxWidth: '300px',
               minHeight: '100vh',
               bgcolor: 'background.secondary',
               overflow: 'hidden',
            }}
         >
            <nav>
               <List sx={{p:'1rem'}}>
                  <ListItem disablePadding>
                     <IconButton size="large" onClick={() => setOpen(false)}>
                        <CloseIcon />
                     </IconButton>
                     <Typography ml="0.5rem" color="text.secondary" fontSize="1rem">
                               Menu
                     </Typography>
                  </ListItem>

                  <ListItem
                    
                     sx={{
                        flexDirection: 'row',
                        marginTop: '1rem',
                        color: 'text.secondary',
                        display: 'flex',
                        mb:'1rem'
                        
                     }}
                  >
                     <Avatar alt="Profile User" sx={{ width: 70, height: 70 }} src={profileDetails.imgProfile} />
                     <Link style={{ textDecoration: 'none', color: 'inherit' }} to={'/#myprofile'} > <Typography ml='0.5rem' fontSize='1.2rem' fontWeight={600}>Maria Sanchez</Typography></Link>
                  </ListItem>

                  <Divider />
                  <Box my='2rem'>
                     <ListItem
                        disablePadding
                        sx={{
                           '& .MuiTypography-root': {
                              color: 'text.secondary',
                              fontWeight: '600',
                              fontSize: '1.2rem',
                              mx: '1rem',
                           },
                           '&:hover': {
                              '& .MuiTypography-root': {
                                 color: 'text.primary',
                              },
                              backgroundColor: 'background.nav',
                           },
                        }}
                     >
                        <ListItemButton component={NavLink} to="/home">
                           <ListItemIcon>
                              <PlaceIcon sx={{fontSize:25 ,color:'primary.main'}}/>
                           </ListItemIcon>
                           <ListItemText primary="Centros" />
                        </ListItemButton>
                     </ListItem>

                     <ListItem
                        disablePadding
                        sx={{
                           '& .MuiTypography-root': {
                              color: 'text.secondary',
                              fontWeight: '600',
                              fontSize: '1.2rem',
                              mx: '1rem',
                           },
                           '&:hover': {
                              '& .MuiTypography-root': {
                                 color: 'text.primary',
                              },
                              backgroundColor: 'background.nav',
                           },
                        }}
                     >
                        <ListItemButton component={NavLink} to="/messages">
                           <ListItemIcon>
                              <Badge  badgeContent={100} max={99} color='error' sx={{'&.MuiBadge-root':{color:'white'}}} >
                                 <MailIcon sx={{fontSize:25,ml:'0.5rem',color:'primary.main'}}/>
                              </Badge>
                           </ListItemIcon>
                           <ListItemText primary="Mensajes" />
                        </ListItemButton>
                
                     </ListItem>
                     <ListItem
                        disablePadding
                        sx={{
                           '& .MuiTypography-root': {
                              color: 'text.secondary',
                              fontWeight: '600',
                              fontSize: '1.2rem',
                              mx: '1rem',
                           },
                           '&:hover': {
                              '& .MuiTypography-root': {
                                 color: 'text.primary',
                              },
                              backgroundColor: 'background.nav',
                           },
                        }}
                     >
                        <ListItemButton component={NavLink} to="/#notification">
                           <ListItemIcon>
                              <Badge  badgeContent={5} max={99} color='error' sx={{'&.MuiBadge-root':{color:'white'}}} >
                                 <NotificationsIcon sx={{ fontSize: 25, color:'primary.main' }} />
                              </Badge>
                           </ListItemIcon>
                           <ListItemText primary="Notificaciones" />
                        </ListItemButton>
                     </ListItem>
                  </Box>
                  <Divider />
                  <Box my='2rem'>
                     <ListItem
                        disablePadding
                        sx={{
                           '& .MuiTypography-root': {
                              color: 'text.secondary',
                              fontWeight: '400',
                              fontSize: '1.2rem',
                              mx: '1rem',
                           },
                           '&:hover': {
                              '& .MuiTypography-root': {
                                 color: 'text.primary',
                              },
                              backgroundColor: 'background.nav',
                           },
                        }}
                     >
                        <ListItemButton component={NavLink} to="/profile">
                           <ListItemIcon>
                              <Person2Icon/>
                           </ListItemIcon>
                           <ListItemText primary="Perfil" />
                        </ListItemButton>
                     </ListItem>
                     <ListItem
                        disablePadding
                        sx={{
                           '& .MuiTypography-root': {
                              color: 'text.secondary',
                              fontWeight: '400',
                              fontSize: '1.2rem',
                              mx: '1rem',
                           },
                           '&:hover': {
                              '& .MuiTypography-root': {
                                 color: 'text.primary',
                              },
                              backgroundColor: 'background.nav',
                           },
                        }}
                     >
                        <ListItemButton component={NavLink} to="/profile">
                           <ListItemIcon>
                              <Settings fontSize="medium" />
                           </ListItemIcon>
                           <ListItemText primary="Configuración" />
                        </ListItemButton>
                     </ListItem>
                     <ListItem
                        disablePadding
                        sx={{
                           '& .MuiTypography-root': {
                              color: 'text.secondary',
                              fontWeight: '400',
                              fontSize: '1.2rem',
                              mx: '1rem',
                           },
                           '&:hover': {
                              '& .MuiTypography-root': {
                                 color: 'text.primary',
                              },
                              backgroundColor: 'background.nav',
                           },
                        }}
                     >
                        <ListItemButton component={NavLink} to="/#contact">
                           <ListItemIcon>
                              <ContactSupportOutlinedIcon fontSize="medium" />
                           </ListItemIcon>
                           <ListItemText primary="Servicio al Cliente" />
                        </ListItemButton>
                     </ListItem>
                     <ListItem
                        disablePadding
                        sx={{
                           '& .MuiTypography-root': {
                              color: 'text.secondary',
                              fontWeight: '400',
                              fontSize: '1.2rem',
                              mx: '1rem',
                           },
                           '&:hover': {
                              '& .MuiTypography-root': {
                                 color: 'text.primary',
                              },
                              backgroundColor: 'background.nav',
                           },
                        }}
                     >
                        <ListItemButton onClick={logout}>
                           <ListItemIcon >
                              <LoginOutlinedIcon sx={{color:'primary.main'}} />
                           </ListItemIcon>
                           <ListItemText primary="Cerrar sesión" />
                        </ListItemButton>
                     </ListItem>
                  </Box>
               </List>
            </nav>
         </Box>
      </ThemeProvider>
   );
}
