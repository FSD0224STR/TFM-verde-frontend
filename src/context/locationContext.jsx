
import React, { useEffect, useState } from 'react';
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
   const [locationDatas,setLocationData]=useState('')
   const [LocationEventsData,setLocationEventsData]=useState('')
   const [dateInput, setDateInput] = useState(dayjs(Date));

   const getLocationFiltered= async (coordinates,city,date,typeOfDancing)=>{
      const locationsFiltered= await getLocationfilteredApi(coordinates,city,date,typeOfDancing)
      console.log('Resultado del filtrado',locationsFiltered)
      if(locationsFiltered.error) setError(locationsFiltered.error)
      else {
         setLocations(locationsFiltered);
         setCity('');
         setDate('');
         setTypeOfDancing('')
         setDateInput(dayjs(Date))
        
      }
        
   }

   const getOneLocation= async (id)=>{
      const location= await getOneLocationApi(id)

      if(location.error) setError(location.error)

      else {
         setIdLocal(id)
         return  location.data
                   
      }
    
   }
   
   const getLocationData = async () => {

      if (idLocal) {
         const local = await getOneLocation(idLocal);
         setLocationData(local);
         setLocationEventsData(local.events)
                
      }
   }
   
   const locationContextValue = {
      getLocationFiltered,
      coordinates,
      city,
      typeOfDancing,
      locations,
      date,
      getOneLocation,
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