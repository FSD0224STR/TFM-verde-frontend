const Servidorurl= 'http://localhost:3000'

export const getUsers=async ()=>{
 const response=await fetch(`${Servidorurl}/users`)
 const users=await response.json()
 return users
}

export const addUser=async (newuserdata)=>{
 const response=await fetch(`${Servidorurl}/user`,{method:'POST',body:JSON.stringify(newtaskdata),headers: { 'Content-Type': 'application/json'}})
 const users=await response.json()
 return users
}

export const deleteUser=async (id)=>{
 const response=await fetch(`${Servidorurl}/user/${id}`, {method:'DELETE'} ) 
 const deleteUser=await response.json() 
 return deleteUser}

 export const updateUser=async (id,modifiedData)=>{
  const response=await fetch(`${Servidorurl}/user/${id}`,{method:'PUT',body:JSON.stringify(modifiedData),headers: { 'Content-Type': 'application/json'}})
  const user=await response.json()
  return user
}