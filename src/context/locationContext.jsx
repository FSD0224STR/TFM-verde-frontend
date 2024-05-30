
import React, { useEffect, useState } from 'react';
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

        const getLocationFiltered= async (coordinates,city,date,typeOfDancing)=>{
                const locationsFiltered= await getLocationfilteredApi(coordinates,city,date,typeOfDancing)
                console.log('Resultado del filtrado',locationsFiltered)
                if(locationsFiltered.error) setError(locationsFiltered.error)
                else {
                        setLocations(locationsFiltered);
                        setCity('');
                        setDate('');
                        setTypeOfDancing('')
                }
        
        }

        const getOneLocation= async (id)=>{
                const location= await getOneLocationApi(id)
                console.log('ver datos del local encontrado con la funcion getOneLocation del contexto de location',location.data)

                if(location.error) setError(location.error)

                else {
                        setIdLocal(id)
                        return  location.data
                   
                }
    
        }

        useEffect(() => {
                getLocationFiltered();
        }, [])

        const locationContextValue = {
                getLocationFiltered,
                coordinates,
                city,
                typeOfDancing,
                locations,
                date,
                getOneLocation,
                idLocal,
                setIdLocal
              
        }
  
        return (
                <LocationContext.Provider value={locationContextValue} >
                        {children}
                </LocationContext.Provider>
        )
    
}