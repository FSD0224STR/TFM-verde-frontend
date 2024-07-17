
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import {getLocationfilteredApi,getOneLocationApi } from '../apiServices/locationApi';
import { useNavigate } from 'react-router-dom';

export const LocationContext = React.createContext();
export const LocationContextProvider = ({ children }) => {
  
   const [city,setCity]=useState('')
   const [date,setDate]=useState('')
   const [typeOfDancing,setTypeOfDancing]=useState('')
   const [locations,setLocations]=useState([])
   const [error, setError] = useState('')
   const [idLocal,setIdLocal]=useState(null)  
   const [locationDatas,setLocationData]=useState({})
   const [eventsFilteredData,setEventsFilteredData]=useState([])
   const [eventsUnFilteredData,  setEventsUnFilteredData]=useState([])
   const [clusterData,setClusterData]=useState({})
   const [dateInput, setDateInput] = useState(dayjs(Date));
   const [button_Events_Clicked, setButton_Events_Clicked] = useState(false);

   const getLocationFiltered= async (city,date,typeOfDancing)=>{
      const locationsFiltered= await getLocationfilteredApi(city,date,typeOfDancing)
     
      if(locationsFiltered.error) {setError(locationsFiltered.error); return error}
      else {
         setLocations(locationsFiltered);
         return true
        
      }
        
   }

   const cleanFilter=  ()=>{
     
      setCity('');
      setDate('');
      setTypeOfDancing('')
      setDateInput(dayjs(Date))

   }
 
   const click_Buttons_Events = ( idLocal ) => {
      setIdLocal(idLocal)  
      setButton_Events_Clicked(true);
      return true
      
   }
   const navigate = useNavigate();
   
   useEffect (()=>{

      if (button_Events_Clicked) {
         navigate(`/location/${idLocal}/events`)

      }
      setButton_Events_Clicked(false)
      
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[button_Events_Clicked])
   
   const getLocationData = async (  idLocal ) => {

      if (idLocal) {
         const local = await getOneLocationApi(idLocal,city,date,typeOfDancing);
         setLocationData(local.data.infoLocation);
         setEventsFilteredData(local.data.filteredEvents)
         setEventsUnFilteredData(local.data.unfilteredEvents)
         
         return true
                
      }
   }

   const getDataForCluster = async (city,date,typeOfDancing) => {
      
      const locations = await  getLocationfilteredApi(city,date,typeOfDancing)
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
               'img':local.photoURL[0]
            }
           
         }

      })

      setClusterData(dataForCluster)
      return true
   
   }

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
      eventsFilteredData,
      eventsUnFilteredData,
      setCity,
      setDate,
      setTypeOfDancing,
      dateInput, 
      setDateInput,
      clusterData,
      button_Events_Clicked,
      setButton_Events_Clicked,
      click_Buttons_Events,
      getDataForCluster,
      cleanFilter
              
   }
  
   return (
      <LocationContext.Provider value={locationContextValue} >
         {children}
      </LocationContext.Provider>
   )
    
}