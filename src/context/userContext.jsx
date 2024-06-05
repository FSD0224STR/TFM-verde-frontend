
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usersApi from '../apiServices/usersApi';

export const UserContext = React.createContext();

export const UserContextProvider = ({ children }) => {
   const [users, setUsers] = useState([])
   const [userDetail, setUserDetail] = useState(null);
    
   const navigate = useNavigate()

   useEffect(() => {
      getUsers()
  
   }, []);  
   
   //Listado de usuarios
   const getUsers = async () => {
      try {
         const allUsers = await usersApi.ListOfInterestedUsers();
         setUsers(allUsers);
      } catch (err) {
         alert('Ha ocurrido el siguiente error: ' + err.message);
      }
   }
    
   //Informacion del usuario de interes

   const getUserDetail = async (id) => {
      try {
         const detailUser = await usersApi.detailByIdUser(id);
         console.log('esto es detailUser',detailUser)
         setUserDetail(detailUser);
         navigate(`/profile/${id}`)
      } catch (err) {
         alert('Ha ocurrido el siguiente error: ' + err.message);
      }
   }
   // useEffect(() => {
      
   //    getUserDetail()   
   //    console.log('El estado userDetail ha sido actualizado:', userDetail);  
        
   // }, []);
    
   const userContextValue = {
      users,
      userDetail,
      getUserDetail,
   }
  
   return (
      <UserContext.Provider value={userContextValue} >
         {children}
      </UserContext.Provider>
   )
    
}