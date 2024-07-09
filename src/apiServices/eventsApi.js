
const VITE_HOSTING_BACKEND=import.meta.env.VITE_HOSTING_BACK

export const getEventByIdApi=async (eventId)=>{

   const response=await fetch(`${VITE_HOSTING_BACKEND}/events/${eventId}`)

   if (!response.ok)   return {error: response.status}
         
   return  await response.json()
}

export const addInterestedPeopleApi= async (eventId)=>{

   const token = localStorage.getItem('access_token');

   const response=await fetch(`${VITE_HOSTING_BACKEND}/events/${eventId}/addUserInterested`,{method:'PATCH', headers: { 'authorization:': `Bearer ${token}` }})
   
   if (!response.ok)  {

      if (response.error.status==400) return {error:true} //Esto indica que el usuario ya está inscrito a este evento. //Creo que aqui lo que me devuelve es el mensaje del resolve del middleware. 
      else if (response.error.status==404) return {error:'Problema de token, es inválido o no se ha proporcionado'}

   }

   const data=await response.json()   
   return data //Me devuelve el los datos del evento. //Creo que aqui lo que me devuelve es el mensaje del resolve del middleware. 
}

export const deleteInterestedPeopleApi= async (eventId)=>{
   const token = localStorage.getItem('access_token');
   const response=await fetch(`${VITE_HOSTING_BACKEND}/events/${eventId}/deleteInterestedPeople`,{method:'PATCH', headers: { 'authorization:': `Bearer ${token}` }})

   if (!response.ok)  {

      if (response.error.status==400) return {error:true} //Esto indica que el usuario ya está inscrito a este evento. 
      else if (response.error.status==404) return {error:'Problema de token, es inválido o no se ha proporcionado'}

   }

   const data=await response.json()   
   return data //Me devuelve el los datos del evento, con el usuario eliminado de interestedPeople. 
}
