import  { useContext, useEffect, useState } from 'react'
import UserSettings from '../components/UserSettings/UserSettings'
import NavigationMenu from '../components/Menu/NavigationMenu'
import NavSettings from '../components/UserSettings/NavSettings'
import { useNavigate } from 'react-router-dom';
import { LoginContextP } from '../context/loginContextPrueba';
import { Box, CircularProgress } from '@mui/material';
import { UserContext } from '../context/userContext';

export default function SettingsProfile() {
   const { profileDetails,setIsLoggedIn } = useContext(LoginContextP)
   const {navProfile,setNavProfile,handleNavProfile,handleSwitchNav} = useContext(UserContext)
   
   useEffect(() => {
      const token = localStorage.getItem('access_token');
      if(token)setIsLoggedIn(true)
   
   }, []);
   return (

      <>
         {profileDetails ?
            <>
               
               <NavigationMenu handleNavProfile={handleNavProfile} handleSwitchNav={ handleSwitchNav} />
               <NavSettings handleSwitchNav={handleSwitchNav} handleNavProfile={handleNavProfile}  />
               <UserSettings navProfile={navProfile} setNavProfile={setNavProfile} />

            </> : <Box sx={{ display: 'flex',height:'100vh',justifyContent:'center',
               alignItems:'center'}}>
               <CircularProgress size={130}  sx={{color:'white'}} color="inherit"/>
            </Box>}
      </>
   )
}
