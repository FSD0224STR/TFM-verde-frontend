
import { createContext } from 'react';
import{ useState } from 'react';

export const EventContext = createContext();

export const EventContextProvider = ({ children }) => {

   const [listOfInterested,setListOfInterested]=useState([])

   const eventContextValue = {

      listOfInterested,
      setListOfInterested
              
   }
  
   return (
      <EventContext.Provider value={eventContextValue} >
         {children}
      </EventContext.Provider>
   )
    
}