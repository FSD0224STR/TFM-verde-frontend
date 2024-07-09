
import { createContext } from 'react';
import{ useState } from 'react';
import { getEventByIdApi,addInterestedPeopleApi ,deleteInterestedPeopleApi} from '../apiServices/eventsApi';

export const EventContext = createContext();

export const EventContextProvider = ({ children }) => {

   const [listOfInterested,setListOfInterested]=useState([]) 

   const getOneEvent=async (eventId)=>{

      const event= await getEventByIdApi(eventId)

      if(event.error) return {error:event.error}
     
      return  event
      
   }
   
   const addInterestedPeople=async (eventId)=>{

      const response= await addInterestedPeopleApi(eventId)

      if(response.error) return response.error
     
      return  response
      
   }

   const deleteInterestedPeople=async (eventId)=>{

      const response= await deleteInterestedPeopleApi(eventId)

      if(response.error) return response.error
     
      return  response
      
   }

   const eventContextValue = {
      
      listOfInterested,
      setListOfInterested, 
      getOneEvent,
      addInterestedPeople,
      deleteInterestedPeople
              
   }
  
   return (
      <EventContext.Provider value={eventContextValue} >
         {children}
      </EventContext.Provider>
   )
    
}