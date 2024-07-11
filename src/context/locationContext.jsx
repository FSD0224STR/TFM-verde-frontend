
import React, { useState } from 'react';
import dayjs from 'dayjs';
import {getLocationfilteredApi,getOneLocationApi } from '../apiServices/locationApi';

export const LocationContext = React.createContext();
export const LocationContextProvider = ({ children }) => {
  
   const [city,setCity]=useState('')
   const [date,setDate]=useState('')
   const [typeOfDancing,setTypeOfDancing]=useState('')
   const [locations,setLocations]=useState([])
   const [error, setError] = useState('')
   const [idLocal,setIdLocal]=useState('')  
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
   
   const getLocationData = async (  /*idLocal ,city,date,typeOfDancing   */) => {

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
               'img':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt_fcdW_dwM-vM7XKx-dQyEpkN4RUTwhrSPQ&s'
            }
           
         }

      })

      setClusterData(dataForCluster)
      return true
   
   }

   /*   import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MyComponent = () => {
  // Obtener parámetros de la URL usando useParams
  const { id } = useParams();
  
  // Definir una variable de estado
  const [data, setData] = useState(null);

  // Definir una función asíncrona que use ambos valores
  const fetchData = async (id, stateValue) => {
    try {
      const response = await fetch(`https://api.example.com/data/${id}?query=${stateValue}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Llamar a la función asíncrona cuando el componente se monte o cuando cambien los valores
  useEffect(() => {
    if (id) {
      fetchData(id, 'someStateValue');
    }
  }, [id]);

  return (
    <div>
      <h1>Data for ID: {id}</h1>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MyComponent; */

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
      cleanFilter,
              
   }
  
   return (
      <LocationContext.Provider value={locationContextValue} >
         {children}
      </LocationContext.Provider>
   )
    
}