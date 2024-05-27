import React, { useEffect, useState } from 'react'
import { Search } from '../components/Pure/Search'
import {getLocationfilteredApi} from '../apiServices/locationApi'
import NavBar from '../components/NavBar/NavBar'
import {Button, Grid } from '@mui/material'
import { LocationsComponent } from '../components/Pure/LocationComponent'

//En está pagina se crea un  componente tendrá una función encargada de traer de la BDD todos los datos de los locales.   

// Se creará un Método de filtrado

//Se creará una función de busqueda dentro de los datos extraidos de la base de datos. 

//Renderizamos el listado de valores filtrados de la BDD 

export default function Home() {
        
        const [coordinates,setCoordinates]=useState('')
        const [city,setCity]=useState('')
        const [date,setDate]=useState('')
        const [typeOfDancing,setTypeOfDancing]=useState('')
        const [locations,setLocations]=useState([])
        const [error, setError] = useState('')

        const getLocationFiltered= async (coordinates,city,date,typeOfDancing)=>{

                const locationsFiltered= await getLocationfilteredApi(coordinates,city,date,typeOfDancing)
                console.log('Resultado del filtrado',locationsFiltered)
                /*  setCity('') */
                /*  setDate('') */
                /*  setTypeOfDancing('') */

                if(locationsFiltered.error) setError(locationsFiltered.error)
                else(setLocations(locationsFiltered))

                console.log('que es locations',locations)

                return locationsFiltered
        
        }

        useEffect(() => {
                getLocationFiltered();
        }, [])

        return (
                <>
                        <NavBar></NavBar>

                        <Grid container  sx={{marginBottom:'50px'}} spacing={2} alignItems='center'>
                                <Grid item xs={12} sm={3} >
                                        <Search     value={city}   onChange={e=>setCity(e.currentTarget.value)} placeholder='Filtrar por ciudad' >  </Search>
                                        
                                </Grid>

                                <Grid item xs={12} sm={3} >
                                        <Search value={date} onChange={e=>setDate(e.currentTarget.value)} placeholder='Filtrar por fecha' ></Search> 
                                </Grid>
                             
                                <Grid item xs={12} sm={3} >
                                        <Search value={typeOfDancing}  onChange={e=>setTypeOfDancing(e.currentTarget.value)} placeholder='Filtrar por estilo' ></Search>
                                </Grid>

                                <Grid item xs={12} sm={3}>
                                        <Button sx={{bgcolor: 'background.secondary',
                                                color: 'text.secondary',}}  onClick={() => {getLocationFiltered(coordinates,city,date,typeOfDancing) }}>Filtrar</Button>
                                </Grid>

                        </Grid>

                        <Grid container spacing={3}>

                                {locations.map(local=> <Grid item xs={12} sm={6} key={local._id}> <LocationsComponent key={local._id} {...local}></LocationsComponent> </Grid>)}
                        </Grid>
         
                </>
        )
}
