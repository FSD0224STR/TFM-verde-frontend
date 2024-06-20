
import React, { useState } from 'react';
import dayjs from 'dayjs';
import { getLocationfilteredApi,getOneLocationApi } from '../apiServices/locationApi';

export const LocationContext = React.createContext();

export const LocationContextProvider = ({ children }) => {

   const [coordinates,setCoordinates]=useState('')
   const [city,setCity]=useState('')
   const [date,setDate]=useState('')
   const [typeOfDancing,setTypeOfDancing]=useState('')
   const [locations,setLocations]=useState([])
   const [error, setError] = useState('')
   const [idLocal,setIdLocal]=useState('')
   const [locationDatas,setLocationData]=useState({})
   const [LocationEventsData,setLocationEventsData]=useState([])
   const [dateInput, setDateInput] = useState(dayjs(Date));

   const getLocationFiltered= async (coordinates,city,date,typeOfDancing)=>{
      const locationsFiltered= await getLocationfilteredApi(coordinates,city,date,typeOfDancing)
     
      if(locationsFiltered.error) {setError(locationsFiltered.error); return error}
      else {
         setLocations(locationsFiltered);
         setCity('');
         setDate('');
         setTypeOfDancing('')
         setDateInput(dayjs(Date))
         return true
        
      }
        
   }
   
   //Se obtienen tanto los datos del local (setLocationData), como el listado de los eventos (LocationEventsData) de ese idLocal.
   const getLocationData = async () => {

      if (idLocal) {
         const local = await getOneLocationApi(idLocal);
         setLocationData(local.data);
         setLocationEventsData(local.data.events)
         return true
                
      }
   }
   
   const locationContextValue = {
      getLocationFiltered,
      coordinates,
      city,
      typeOfDancing,
      locations,
      date,
      idLocal,
      setIdLocal,
      getLocationData,
      locationDatas,
      LocationEventsData,
      setCity,
      setDate,
      setTypeOfDancing,
      dateInput, 
      setDateInput
              
   }
  
   return (
      <LocationContext.Provider value={locationContextValue} >
         {children}
      </LocationContext.Provider>
   )
    
}