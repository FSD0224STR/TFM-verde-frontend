
import React, { useState } from 'react';
import dayjs from 'dayjs';
import { getAllLocation, getLocationfilteredApi,getOneLocationApi } from '../apiServices/locationApi';
import { useEffect } from 'react';
import {useNavigate } from 'react-router-dom';

export const LocationContext = React.createContext();

export const LocationContextProvider = ({ children }) => {
  
   const [city,setCity]=useState('')
   const [date,setDate]=useState('')
   const [typeOfDancing,setTypeOfDancing]=useState('')
   const [locations,setLocations]=useState([])
   const [error, setError] = useState('')
   const [idLocal,setIdLocal]=useState('')
   const [locationDatas,setLocationData]=useState({})
   const [LocationEventsData,setLocationEventsData]=useState([])
   const [clusterData,setClusterData]=useState({})
   const [dateInput, setDateInput] = useState(dayjs(Date));

   const getLocationFiltered= async (city,date,typeOfDancing)=>{
      const locationsFiltered= await getLocationfilteredApi(city,date,typeOfDancing)
     
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

   const getDataForCluster = async () => {
      
      const locations = await getAllLocation();
      if(locations.error) {setError(locations.error); return error}

      const dataForCluster=locations.map(local=>{

         return {
        
            'type': 'Feature',
            'geometry': {
               'type': 'Point',
               'coordinates': [
                  local.coordinates['lng'],  local.coordinates['lat']
               ]
            },
            'properties': {
               'name': local.name,
               'address':local.address,
               '_id':local._id,
               'events':local.events,
               'img':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt_fcdW_dwM-vM7XKx-dQyEpkN4RUTwhrSPQ&s'
            }
           
         }

      })

      setClusterData(dataForCluster)
   
   }
  
   useEffect(() => {

      getDataForCluster()
      /* console.log('Estas entrando en el useEffect para obtener los datos del cluster del mapa') */
   },[])
   
   const locationContextValue = {
      getLocationFiltered,

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
      setDateInput,
      clusterData
              
   }
  
   return (
      <LocationContext.Provider value={locationContextValue} >
         {children}
      </LocationContext.Provider>
   )
    
}