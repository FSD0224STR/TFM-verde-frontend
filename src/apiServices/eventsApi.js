
const VITE_HOSTING_BACKEND=import.meta.env.VITE_HOSTING_BACK

export const getEventByIdApi=async (eventId)=>{

   const response=await fetch(`${VITE_HOSTING_BACKEND}/events/${eventId}`)

   if (!response.ok)   return {error: response.status}
         
   return  await response.json()
}

export const addInterestedPeopleApi= async (eventId)=>{

   const token = localStorage.getItem('access_token');

   const response=await fetch(`${VITE_HOSTING_BACKEND}/events/${eventId}/addUserInterested`,{method:'PATCH', headers: {authorization: `Bearer ${token}` }})
   
   if (!response.ok)  {
      console.log(await response.json() )

      if (response.status===400) return  {error: 'Ya estas interesad@ en este evento'}
      if  (response.status===404) return  {error:'Token inválido o Evento no encontrado'}   
      else if (response.status===500) return  {error:'No se ha podido añadir el interesado'}   

   }
  
   return await response.json()   
}

export const deleteInterestedPeopleApi= async (eventId)=>{
   const token = localStorage.getItem('access_token');
   const response=await fetch(`${VITE_HOSTING_BACKEND}/events/${eventId}/delUserInterested`,{method:'PATCH', headers: {authorization: `Bearer ${token}` }})

   if (!response.ok)  {

      if (response.status===404) return  {error:'Evento o usuario no encontrado'}  
      else if (response.status===500) return   {error:'Error al actualizar el evento'}  
   }
  
   return await response.json()    
}
