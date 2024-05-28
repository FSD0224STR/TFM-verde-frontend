import {Password} from '@mui/icons-material';

const Servidorurl= 'http://localhost:3000'

const getAllUsers=async ()=>{
        const token = localStorage.getItem('access_token');
        const response=await fetch(`${Servidorurl}/users`, {headers: { 'authorization:': `Bearer ${token}`}})
        const users=await response.json()
        return users
}

const addUser = async (newUserData) => {
        const response = await fetch(`${Servidorurl}/users/register`, {
                method: 'POST', body: JSON.stringify(newUserData), headers: {
                        'Content-Type': 'application/json',}})
        const users=await response.json()
        return users
}
const loginUser=async (data)=>{
        const response=await fetch(`${Servidorurl}/login`,{method:'POST',body:JSON.stringify(data),headers: { 'Content-Type': 'application/json',}})
        const user=await response.json()
        return user
}

const deleteUser=async (id)=>{
        const response=await fetch(`${Servidorurl}/user/${id}`, {method:'DELETE'} ) 
        const deleteUser=await response.json() 
        return deleteUser
}

const updateUser=async (id,modifiedData)=>{
        const response=await fetch(`${Servidorurl}/user/${id}`,{method:'PUT',body:JSON.stringify(modifiedData),headers: { 'Content-Type': 'application/json'}})
        const user=await response.json()
        return user
}

const login = async (email, password) => {
        const response = await fetch(`${Servidorurl}/users/login`,{method:'POST',body:JSON.stringify({email, password}),headers: { 'Content-Type': 'application/json'}})
       
        if (!response.ok)  {
                const error = await response.json()
                return {error: error.message};
        }

        const token = await response.json()
        return {data: token}
}

export default { 
        getAllUsers,
        addUser,
        deleteUser,
        updateUser,
        loginUser,
        login
}