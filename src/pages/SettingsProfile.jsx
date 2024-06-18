import  { useContext, useState } from 'react'
import UserSettings from '../components/UserSettings/UserSettings'
import NavigationMenu from '../components/Menu/NavigationMenu'
import NavSettings from '../components/UserSettings/NavSettings'
import { useNavigate } from 'react-router-dom';
import { LoginContextP } from '../context/loginContextPrueba';
import { Box, CircularProgress } from '@mui/material';

export default function SettingsProfile() {
   const {profileDetails} = useContext(LoginContextP)
   const [navProfile, setNavProfile] = useState(false);
   const navigate = useNavigate()

   const handleNavProfile = () => {
      setNavProfile(true)
      navigate('/profile')
   }

   const handleSwitchNav = () => {
      setNavProfile(false)
      navigate('/profile')
   }

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
