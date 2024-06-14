
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usersApi from '../apiServices/usersApi';

export const UserContext = React.createContext();

export const UserContextProvider = ({ children }) => {
   const [users, setUsers] = useState([])
   const [userDetail, setUserDetail] = useState(null);
   const [listEventsInterested, setListEventsInterested] = useState([]);
   const [error, setError] = useState('')
    
   const navigate = useNavigate()

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
    
   const getOneUser= async (userId)=>{ //Con esta función se pintan solo aquellos usuarios interesados en un determinado evento
      const user= await usersApi.getOneUserApi (userId)
      if(user.error) setError(user.error)
      return user
    
   }

   const getListEventsUser= (userDetail)=>{
      
      const listEvents=userDetail.interestingEvent
      setListEventsInterested(listEvents) 
    
   }

   const userContextValue = {
      users,
      userDetail,
      setUserDetail,
      getUserDetail,
      getOneUser,
      getListEventsUser,
      listEventsInterested,
  
   }
  
   return (
      <UserContext.Provider value={userContextValue} >
         {children}
      </UserContext.Provider>
   )
    
}