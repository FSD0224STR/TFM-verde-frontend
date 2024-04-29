import { useState,useEffect } from 'react'
import './App.css'
import './components/UserList'
import { getUsers } from './apiServices/usersApi';

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    getUsers()

  }, []);



  return (
    <>
      
      {users.map(user =>
    
        <UserList
          user={ user} />
    
    )}
     
    </>
  )
}

export default App
