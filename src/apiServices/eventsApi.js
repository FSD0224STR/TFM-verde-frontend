const Servidorurl='http://localhost:3000'

export const updateInterestedPeopleApi=async (eventId,userId)=>{

   const response=await fetch(`${Servidorurl}/events/${eventId}/interested/${userId}`,{method:'PATCH'})

   if (!response.ok)   {
             
      return {error: response.status}
         
   }
     
   return {data: await response.json()} //Me devuelve el evento actualizado con la persona añadida
}

export const updateEventApi=async (eventId,modifiedData)=>{

   const response=await fetch(`${Servidorurl}/events/${eventId}`,{method:'PUT',body:JSON.stringify(modifiedData),headers: { 'Content-Type': 'application/json'}})

   if (!response.ok)   return {error: response.status}
         
   return {data: await response.json()} 
}

export const getEventByIdApi=async (eventId)=>{

   const response=await fetch(`${Servidorurl}/events/${eventId}`)

   if (!response.ok)   return {error: response.status}
         
   return  await response.json()
}
