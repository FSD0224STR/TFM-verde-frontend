import  { useContext, useEffect} from 'react'

import { UserContext } from '../context/userContext';
import ComponentUserDetail from '../components/Pure/UserDetail';
import NavigationMenu from '../components/Menu/NavigationMenu';
import { Container } from '@mui/material';
import { LoginContextP } from '../context/loginContextPrueba';

export default function DetailUser() {

   const { userDetail } = useContext(UserContext)
   const {setIsLoggedIn}= useContext(LoginContextP)
   // console.log('esto es dentro de la pagian de detalle la informacion de UserDetail',userDetail)
   useEffect(() => {
      const token = localStorage.getItem('access_token');
      if(token)setIsLoggedIn(true)
   
   }, []);
   return (
      <>
         
         <NavigationMenu />
         
         <ComponentUserDetail userDetail={userDetail}/>
         
      </>
   )
}
