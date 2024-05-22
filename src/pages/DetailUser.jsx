import React, { useState } from 'react'
import UserDetail from '../components/pure/UserDetail'
import usersApi from '../apiServices/usersApi';

export default function DetailUser() {

   const [userDetail, setUserDetail] = useState();

   const getUserDetail = async () => {
      try {
         const detailUser = await usersApi.detailByIdUser();
         setUserDetail(detailUser);
      } catch (err) {
         alert('Ha ocurrido el siguiente error: ' + err.message);
      }
   }

   return (
      <div>
         <UserDetail/>
      </div>
   )
}
