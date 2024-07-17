import  { useContext, useEffect} from 'react'

import { UserContext } from '../context/userContext';
import ComponentUserDetail from '../components/Pure/UserDetail';
import NavigationMenu from '../components/Menu/NavigationMenu';
import { LoginContextP } from '../context/loginContextPrueba';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { CircularProgressLoading } from '../components/Pure/Loading';
import usersApi from '../apiServices/usersApi';

export default function DetailUser() {
   
   const {idUser} = useParams()
   const { userDetail,setUserDetail } = useContext(UserContext)
   const {setIsLoggedIn}= useContext(LoginContextP)
   const [loading,setLoading]=useState(false)

   useEffect(() => {
      const token = localStorage.getItem('access_token');
      if(token)setIsLoggedIn(true)
   
   }, []);

   const getUser=async ()=>{

      setLoading(true)
      const user=await usersApi.detailByIdUser(idUser)
      setUserDetail(user)
      if(user){
         
         setLoading(false)
      }
  
   }
   useEffect( ()=>{
   
      getUser()

   },[])
   return (
      <>
         
         <NavigationMenu />
         
         {loading ?  (  <CircularProgressLoading/>):(
            <ComponentUserDetail userDetail={userDetail}/>

         )}
         
      </>
   )
}
