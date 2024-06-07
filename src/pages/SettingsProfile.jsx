import  { useState } from 'react'
import UserSettings from '../components/UserSettings/UserSettings'
import NavigationMenu from '../components/Menu/NavigationMenu'
import NavSettings from '../components/UserSettings/NavSettings'
import { useNavigate } from 'react-router-dom';

export default function SettingsProfile() {
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
         <NavigationMenu handleNavProfile={handleNavProfile} handleSwitchNav={ handleSwitchNav} />
         <NavSettings handleSwitchNav={handleSwitchNav} handleNavProfile={handleNavProfile}  />
         <UserSettings navProfile={navProfile} setNavProfile={setNavProfile} />
      </>
   )
}
