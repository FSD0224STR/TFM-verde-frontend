import  { useContext, useState } from 'react'
import {
   MenuItem,
   Avatar,
   Box,
   IconButton,
   Tooltip,
   Menu
} from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import Person2Icon from '@mui/icons-material/Person2';
import { LoginContextP } from '../../context/loginContextPrueba';
import { Navigate, useNavigate } from 'react-router-dom';

export default function MenuProfile({handleNavProfile,handleSwitchNav}) {

   const navigate = useNavigate()

   const [anchorEl, setAnchorEl] = useState(null);
   const{profileDetails,logout}=useContext(LoginContextP)
   const open = Boolean(anchorEl);
   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };
   return (
      <>
         <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
           
            <Tooltip title="Account settings">
          
               <IconButton
                  onClick={handleClick}
                  size="large"
                  sx={{ ml: 2 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
               >
                  {profileDetails.imgProfile !== undefined || null ?
                     <Avatar src={profileDetails.imgProfile} sx={{ width: 60, height: 60, bgcolor: ' background.avatar' }} /> :
                     <Avatar sx={{ width: 60, height: 60,bgcolor:' background.avatar' }}>{profileDetails.name[0]+profileDetails.subName[0]}</Avatar>}
                  
               </IconButton>
            </Tooltip>
         </Box>
         <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
         >
            <MenuItem onClick={()=>navigate('/profile')} sx={{
               color: 'secondary.variante', fontSize: '1.3rem', ':hover': {
                  color:'primary.main',fontWeight:'600'
               }}}>
               <Person2Icon color='primary' sx={{mr:'0.8rem'}}/> Perfil
            </MenuItem>
            <MenuItem onClick={handleNavProfile} sx={{ color: 'secondary.variante',fontSize:'1.3rem' ,':hover': {
               color:'primary.main',fontWeight:'600'
            }}}>
               <ListItemIcon>
                  <Settings color='primary' fontSize="medium" />
               </ListItemIcon>
          Configuración
            </MenuItem>
            <MenuItem onClick={handleClose} sx={{ color: 'secondary.variante',fontSize:'1.3rem',':hover': {
               color:'primary.main',fontWeight:'600'
            } }}>
               <ListItemIcon>
                  <ContactSupportOutlinedIcon color='primary' fontSize="medium" />
               </ListItemIcon>
        Servicio al cliente
            </MenuItem>
            <MenuItem onClick={logout} sx={{ color: 'secondary.variante',fontSize:'1.3rem',':hover': {
               color:'primary.main',fontWeight:'600'
            } }}>
               <ListItemIcon >
                  <Logout color='primary' fontSize="medium" />
               </ListItemIcon>
         Cerrar sesión
            </MenuItem>
         </Menu>
        
      </>
   )
}
