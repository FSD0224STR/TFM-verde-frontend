import { useState,useEffect } from 'react'
import './App.css'
import userAPI from './apiServices/usersApi';
import UsersList from './components/pure/UsersList';
import FormRegister from './components/forms/registerForm/FormRegister';
import LoginForm from './components/forms/loginForm/LoginForm';







function App( ) {
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
    <>

      
      {/* <h1>LISTADO DE USUARIOS</h1>
      
     {users.map((user,index) =>(
      <UsersList 
      user={user}
      key={index} ></UsersList>
    
      
    
    ))}  */}

    <p>Hola</p>

 
    <FormRegister />
          
    <LoginForm/>

 
 
     
      
    </>
  )
}

export default App
