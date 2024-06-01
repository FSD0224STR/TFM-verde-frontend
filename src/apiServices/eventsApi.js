const Servidorurl='http://localhost:3000'

/* export const getEventApi=async (eventId)=>{

   const response=await fetch(`${Servidorurl}/events/${eventId}`)
 
   if (!response.ok)   {
              
      return {error: response.status} 
          
   }
      
   return {data: await response.json()} //Me devuelve el evento.Pero según mi planteamiento esta no es necesaria usarla.
} */

export const updateInterestedPeopleApi=async (eventId,userId)=>{

   const response=await fetch(`${Servidorurl}/events/${eventId}/interested/${userId}`,{method:'PATCH'})

   if (!response.ok)   {
             
      return {error: response.status}
         
   }
     
   return {data: await response.json()} //Me devuelve el evento actualizado con la persona añadida
}
