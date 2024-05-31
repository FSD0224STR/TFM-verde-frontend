import React, { useContext, useEffect, useState } from 'react'
import NavigationMenu from '../components/Menu/NavigationMenu'
import { LocationsComponent } from '../components/Pure/LocationComponent'
import { LocationContext } from '../context/locationContext'

export default function EventsList() {

        const {idLocal,getOneLocation}=useContext(LocationContext) 
        const [locationDatas,setLocationData]=useState('')

        const getLocationData = async () => {
                if (idLocal) {
                        const data = await getOneLocation(idLocal);
                        setLocationData(data);
                
                }
        }
        
        useEffect (()=>{
   
                getLocationData()
        })

        return (
                <>
              
                        <NavigationMenu/>

                        {locationDatas?(

                                <LocationsComponent {...locationDatas} />):
                                (<p>se estan cargando los datos, aqui hay que poner un cargando de MUI</p>)
                        }
                       
                        <div>
                                <p>Estas pintando el id del local donde estas{idLocal}</p>
                                
                                <h1>Lista de eventos</h1>
                        </div>
                </>
        )
}
