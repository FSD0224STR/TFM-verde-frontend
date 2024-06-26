
import { createContext } from 'react';
import{ useState } from 'react';
import { getEventByIdApi } from '../apiServices/eventsApi';

export const EventContext = createContext();

export const EventContextProvider = ({ children }) => {

   const [listOfInterested,setListOfInterested]=useState([])

   const getOneEvent=async (idEvent)=>{

      const event= await getEventByIdApi(idEvent)

      if(event.error) return {error:event.error}
     
      return  event
      
   }
   
   const eventContextValue = {

      listOfInterested,
      setListOfInterested,
      getOneEvent
              
   }
  
   return (
      <EventContext.Provider value={eventContextValue} >
         {children}
      </EventContext.Provider>
   )
    
}