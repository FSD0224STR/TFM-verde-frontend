import React, { useState } from 'react'
import { Search } from '../components/Pure/Search'
import {getLocationfilteredApi} from '../apiServices/locationApi'

//En está pagina se crea un  componente tendrá una función encargada de traer de la BDD todos los datos de los locales.   

// Se creará un Método de filtrado

//Se creará una función de busqueda dentro de los datos extraidos de la base de datos. 

//Renderizamos el listado de valores filtrados de la BDD 

const getLocationFiltered= async (coordinates,city,date,typeOfDancing)=>{

        const data= await getLocationfilteredApi(coordinates,city,date,typeOfDancing)
        console.log('filtrado por ciudad: ',data)

}

export default function Home() {
        
        const [coordinates,setCoordinates]=useState('')
        const [city,setCity]=useState('Barcelona')
        const [date,setDate]=useState('')
        const [typeOfDancing,setTypeOfDancing]=useState('Bachata')

        return (
                <>
                        <h1>Pagina principal inmediatamente depúes de que se logea el usuario</h1>
                        <Search onC ={getLocationFiltered(coordinates,city,date,typeOfDancing)}></Search> 
         
                </>
        )
}
