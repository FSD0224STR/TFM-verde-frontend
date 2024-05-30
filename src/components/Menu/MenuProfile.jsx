import React, { useContext } from 'react'
import {
        MenuItem,
        Avatar,
        Box,
        IconButton,
        Typography,
        Divider,
        Tooltip,
        Menu
} from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import Person2Icon from '@mui/icons-material/Person2';
import { LoginContextP } from '../../context/loginContextPrueba';

export default function MenuProfile() {

        const [anchorEl, setAnchorEl] = React.useState(null);
        const{profileDetails}=useContext(LoginContextP)

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
                                                {profileDetails?<Avatar sx={{ width: 40, height: 40 }}>{profileDetails.name[0]+profileDetails.subName[0]
                                                }</Avatar>:null}
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
                                <MenuItem onClick={handleClose} sx={{
                                        color: 'secondary.variante', fontSize: '1.3rem', ':hover': {
                                                color:'primary.main',fontWeight:'600'
                                        }}}>
                                        <Person2Icon color='primary' sx={{mr:'0.8rem'}}/> Perfil
                                </MenuItem>
                                <MenuItem onClick={handleClose} sx={{ color: 'secondary.variante',fontSize:'1.3rem' ,':hover': {
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
                                <MenuItem onClick={handleClose} sx={{ color: 'secondary.variante',fontSize:'1.3rem',':hover': {
                                        color:'primary.main',fontWeight:'600'
                                } }}>
                                        <ListItemIcon>
                                                <Logout color='primary' fontSize="medium" />
                                        </ListItemIcon>
          Logout
                                </MenuItem>
                        </Menu>
        
                </>
        )
}
