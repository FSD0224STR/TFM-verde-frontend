 
const Servidorurl= 'http://localhost:3000'

const getAllUsers=async ()=>{
   const token = localStorage.getItem('access_token');
   const response=await fetch(`${Servidorurl}/users`, {headers: { 'authorization:': `Bearer ${token}`}})
   const users=await response.json()
   return users
}

const detailByIdUser = async (id) => {
   const response = await fetch(`${Servidorurl}/users/${id}`)
   const user = await response.json()
   return user.user //? hay quew revisar lo que se estta devolviendo
}

const ListOfInterestedUsers = async () => {
   const response = await fetch(`${Servidorurl}/users`)
   const ListUsers = await response.json()
   return ListUsers
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

   if (!response.ok)   {

      if(response.status==403) return {error: 'La contraseña es incorrecta, por favor inserte contraseña correcta.'}
      if(response.status==404) return {error: 'El usuario no está registrado, por favor registrarse. '}
           
   }

   const info = await response.json()
   return {data: info.token,userDetails:info.userDetails}
}

const getMyprofile=async ()=>{

   const token = localStorage.getItem('access_token')

   const response = await fetch(`${Servidorurl}/users/myinfo`, {headers: {'authorization': `Bearer ${token}`}})

   if (!response.ok)  {
      const error=await response.json()
      return {error: error}
   }
   
   return {data:  response.json()} //LO que me devuelve el backend es toda la información de usuario. 

}

export default { 
   getAllUsers,
   addUser,
   deleteUser,
   updateUser,
   loginUser,
   login,
   ListOfInterestedUsers,
   detailByIdUser,
   getMyprofile
}