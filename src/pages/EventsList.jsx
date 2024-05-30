import React, { useContext, useEffect, useState } from 'react'
import NavigationMenu from '../components/Menu/NavigationMenu'
import { LocationsComponent } from '../components/Pure/LocationComponent'
import { LocationContext } from '../context/locationContext'

export default function EventsList() {

        const {idLocal,getOneLocation}=useContext(LocationContext) 
        const [locationDatas,setLocationData]=useState('')

        useEffect (()=>{

                const getLocationData =async () => {
        
                        const locationData = await getOneLocation(idLocal)
                        setLocationData(locationData)
                }
                getLocationData()

        },[idLocal,getOneLocation])
        
        return (
                <>
              
                        <NavigationMenu/>
                        <LocationsComponent />
                        <div>
                                <p>Estas pintando el id del local donde estas{idLocal}</p>
                                
                                <h1>Lista de eventos</h1>
                        </div>
                </>
        )
}
