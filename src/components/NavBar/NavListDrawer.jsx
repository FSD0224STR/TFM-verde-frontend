import React from 'react';
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
} from '@mui/material';
import { main_theme } from '../../../palette-theme-colors';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CardMembershipOutlinedIcon from '@mui/icons-material/CardMembershipOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { NavLink } from 'react-router-dom';
export default function NavListDrawer({ setOpen }) {
   return (
      <ThemeProvider theme={main_theme}>
         <Box
            sx={{
               width: 430,
               minHeight: '100vh',
               bgcolor: 'background.secondary',
               overflow: 'hidden',
            }}
         >
            <nav>
               <List>
                  <ListItem disablePadding>
                     <IconButton size="large" onClick={() => setOpen(false)}>
                        <CloseIcon />
                     </IconButton>
                     <Typography ml="0.5rem" color="text.secondary" fontSize="1rem">
                Menu
                     </Typography>
                  </ListItem>

                  <ListItem
                     disablePadding
                     sx={{
                        flexDirection: 'column',
                        marginTop: '1rem',
                     }}
                  >
                     <Typography
                        variant="h6"
                        sx={{
                           color: 'text.secondary',
                           fontSize: '2.8rem',
                           lineHeight: 1,
                           fontWeight: 'bold',
                           ml: '2rem',
                           mt: '3rem',
                        }}
                     >
                Juntos somos mas!
                     </Typography>
                     <Box
                        sx={{
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'flex-start',
                           ml: '2rem',
                           width: '100%',
                        }}
                     >
                        <Typography
                           variant="body2"
                           sx={{
                              color: 'text.secondary',
                              fontSize: '1rem',
                              fontWeight: '200',
                              textAlign: 'left',
                              margin: '1rem',
                           }}
                        >
                  Registrate Gratis
                        </Typography>
                     </Box>
                     <Button
                        component={NavLink}
                        to="/register"
                        sx={{
                           bgcolor: '#338DB8',
                           //   m: "1.5rem",
                           mb: '3rem',
                           '&:hover': {
                              color: 'text.primary',
                              backgroundColor: 'background.nav',
                           },
                           paddingBlock:'1rem'
                        }}
                     >
                Encuentra tu pareja de baile!
                     </Button>
                  </ListItem>

                  <Divider />
                  <ListItem
                     disablePadding
                     sx={{
                        '& .MuiTypography-root': {
                           color: 'text.secondary',
                           fontWeight: '600',
                           fontSize: '1.5rem',
                           margin: '1rem',
                        },
                        '&:hover': {
                           '& .MuiTypography-root': {
                              color: 'text.primary',
                           },
                           backgroundColor: 'background.nav',
                        },
                     }}
                  >
                     <ListItemButton component={NavLink} to="/">
                        <ListItemIcon>
                           <HomeOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                     </ListItemButton>
                  </ListItem>

                  <ListItem
                     disablePadding
                     sx={{
                        '& .MuiTypography-root': {
                           color: 'text.secondary',
                           fontWeight: '600',
                           fontSize: '1.5rem',
                           margin: '1rem',
                        },
                        '&:hover': {
                           '& .MuiTypography-root': {
                              color: 'text.primary',
                           },
                           backgroundColor: 'background.nav',
                        },
                     }}
                  >
                     <ListItemButton component={NavLink} to="/membership">
                        <ListItemIcon>
                           <CardMembershipOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="membresia" />
                     </ListItemButton>
                  </ListItem>
                  <Divider />

                  <ListItem
                     disablePadding
                     sx={{
                        '& .MuiTypography-root': {
                           color: 'text.secondary',
                           fontWeight: '600',
                           fontSize: '1.5rem',
                           margin: '1rem',
                        },
                        '&:hover': {
                           '& .MuiTypography-root': {
                              color: 'text.primary',
                           },
                           backgroundColor: 'background.nav',
                        },
                     }}
                  >
                     <ListItemButton component={NavLink} to="/login">
                        <ListItemIcon>
                           <LoginOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Login" />
                     </ListItemButton>
                  </ListItem>
                  <ListItem
                     disablePadding
                     sx={{
                        '& .MuiTypography-root': {
                           color: 'text.secondary',
                           fontWeight: '600',
                           fontSize: '1.5rem',
                           margin: '1rem',
                        },
                        '&:hover': {
                           '& .MuiTypography-root': {
                              color: 'text.primary',
                           },
                           backgroundColor: 'background.nav',
                        },
                     }}
                  >
                     <ListItemButton component={NavLink} to="/register">
                        <ListItemIcon>
                           <HowToRegOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Registrate" />
                     </ListItemButton>
                  </ListItem>
               </List>
            </nav>
         </Box>
      </ThemeProvider>
   );
}
