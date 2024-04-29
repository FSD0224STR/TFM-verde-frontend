import { useState,useEffect } from 'react'
import './App.css'
import userAPI from './apiServices/usersApi';
import UsersList from './components/UsersList';



const userDefault = {
  name: 'pepito',
  subName: 'perez',
  dateOfBirth:'21/03/1996'
}


function App() {
  const [users, setUsers] = useState([])


  const getUsers = () => {
    userAPI.getAllUsers()
      .then(allUsers => setUsers(allUsers))
      .catch(err => alert("Ha ocurrido el siguiente error: " + err.message))
  }

  useEffect(() => {
    getUsers()


  }, []);



  return (
    <>
      
      <h1>LISTADO DE USUARIOS</h1>
      
     {users.map((user,index) =>(
    
       <UsersList
         user={user}
         key={index} />
    
    ))} 
      
    </>
  )
}

export default App
