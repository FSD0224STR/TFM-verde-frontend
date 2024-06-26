import  { useContext} from 'react'

import { UserContext } from '../context/userContext';
import ComponentUserDetail from '../components/Pure/UserDetail';
import NavigationMenu from '../components/Menu/NavigationMenu';
import { Container } from '@mui/material';

export default function DetailUser() {

   const { userDetail } = useContext(UserContext)
  
   console.log('esto es dentro de la pagian de detalle la informacion de UserDetail',userDetail)
   return (
      <>
         
         <NavigationMenu />
         
         <ComponentUserDetail userDetail={userDetail}/>
         
      </>
   )
}
