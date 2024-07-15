import  { useContext, useEffect} from 'react'

import { UserContext } from '../context/userContext';
import ComponentUserDetail from '../components/Pure/UserDetail';
import NavigationMenu from '../components/Menu/NavigationMenu';
import { Container } from '@mui/material';
import { LoginContextP } from '../context/loginContextPrueba';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { CircularProgressLoading } from '../components/Pure/Loading';
import usersApi from '../apiServices/usersApi';

export default function DetailUser() {
   
   const {idUser} = useParams()
   const { userDetail,setUserDetail,getOneUser } = useContext(UserContext)
   const {setIsLoggedIn}= useContext(LoginContextP)
   const [loading,setLoading]=useState(false)
   // console.log('esto es dentro de la pagian de detalle la informacion de UserDetail',userDetail)
   useEffect(() => {
      const token = localStorage.getItem('access_token');
      if(token)setIsLoggedIn(true)
   
   }, []);
   
   console.log('Que es idUser en DetailUser',idUser)
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
      console.log('Que es userDetail en DetailUser page',userDetail)

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
