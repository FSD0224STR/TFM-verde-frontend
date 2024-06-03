
const Servidorurl='http://localhost:3000'

export const queryParamsDynamic=  (coordinates,city,date,typeOfDancing)=>{
   const queryParams = new URLSearchParams()
        
   coordinates? queryParams.append('coordinates',`${coordinates}`):null
        
   city? queryParams.append('city',`${city}`):null

   date? queryParams.append('date',`${date}`):null

   typeOfDancing? queryParams.append('typeOfDancing',`${typeOfDancing}`):null

   return queryParams

}

export const getLocationfilteredApi=async(coordinates,city,date,typeOfDancing)=>{

   const queryParamsdone=queryParamsDynamic(coordinates,city,date,typeOfDancing)
           
   const response =await fetch(`${Servidorurl}/locations/?${queryParamsdone.toString()}`)

   if(!response.ok){

      return {error: `Este es el error al filtrar: ${response.status}`}

   }
   const Locationfiltered= await response.json()
                
   return  Locationfiltered

}

export const getOneLocationApi=async (id)=>{

   const response=await fetch(`${Servidorurl}/locations/${id}`)

   if (!response.ok)   {
             
      return {error: response.statusText}
           
   }
       
   return {data: await response.json()}
}