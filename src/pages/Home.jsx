import NavigationMenu from '../components/Menu/NavigationMenu';
import { Search } from '../components/Pure/Search'
import {getLocationfilteredApi} from '../apiServices/locationApi'

import {Button, Grid } from '@mui/material'
import { LocationsComponent } from '../components/Pure/LocationComponent'
import { useState,useEffect } from 'react';

export default function Home() {
        
        const [coordinates,setCoordinates]=useState('')
        const [city,setCity]=useState('')
        const [date,setDate]=useState('')
        const [typeOfDancing,setTypeOfDancing]=useState('')
        const [locations,setLocations]=useState([])
        const [error, setError] = useState('')

        console.log('que es tyofdancing',typeOfDancing)

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

        useEffect(() => {
                getLocationFiltered();
        }, [])

        return (
                <>
                        <NavigationMenu/>

                        <Grid container  sx={{marginBottom:'50px'}} spacing={2} alignItems='center'>
                                <Grid item xs={12} sm={3} >
                                        <Search     filterBy={city}   onChange={e=>setCity(e.currentTarget.value)} placeholder='Filtrar por ciudad' >  </Search>
                                        
                                </Grid>

                                <Grid item xs={12} sm={3} >
                                        <Search filterBy={date} onChange={e=>setDate(e.currentTarget.value)} placeholder='Filtrar por fecha' ></Search> 
                                </Grid>
                             
                                <Grid item xs={12} sm={3} >
                                        <Search filterBy={typeOfDancing}  onChange={e=>setTypeOfDancing(e.currentTarget.value)} placeholder='Filtrar por estilo' ></Search>
                                </Grid>

                                <Grid item xs={12} sm={3}>
                                        <Button sx={{bgcolor: 'background.secondary',
                                                color: 'text.secondary',}}  onClick={() => {getLocationFiltered(coordinates,city,date,typeOfDancing)/* , setCity(''),setDate(''),setTypeOfDancing('')  */}}>Filtrar</Button>
                                </Grid>

                        </Grid>

                        <Grid container spacing={3}>

                                {locations.map(local=> <Grid item xs={12} sm={6} key={local._id}> <LocationsComponent  {...local}></LocationsComponent> </Grid>)}
                        </Grid>
         
                </>
        )
}
