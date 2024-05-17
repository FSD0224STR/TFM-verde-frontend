import React from 'react'
import userAPI from '../apiServices/usersApi';
import { useState,useEffect } from 'react'
export default function ProfileList() {

   // const [users, setUsers] = useState([])

   // const getUsers = () => {
   //      userAPI.getAllUsers()
   //     .then(allUsers => setUsers(allUsers))
   //     .catch(err => alert("Ha ocurrido el siguiente error: " + err.message))
   // }

   // useEffect(() => {
   //   getUsers()

   // }, []);

   return (
      <div>
         <h1>Lista de interasados</h1>

      </div>
   )
}
