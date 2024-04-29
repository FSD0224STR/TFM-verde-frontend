const Servidorurl= 'http://localhost:3000'

const getAllUsers=async ()=>{
 const response=await fetch(`${Servidorurl}/users`)
 const users=await response.json()
 return users
}

const addUser=async (newuserdata)=>{
 const response=await fetch(`${Servidorurl}/user`,{method:'POST',body:JSON.stringify(newtaskdata),headers: { 'Content-Type': 'application/json'}})
 const users=await response.json()
 return users
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

export default { 
  getAllUsers,
  addUser,
  deleteUser,
  updateUser
}