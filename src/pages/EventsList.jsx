import React from 'react'
import EventCard from '../components/EventsCard'

import './EventsCard.css'
import LocationFiltered from '../components/LocationsFiltered'
export default function EventsList() {
   return (
      <div>
         <h1>Lista de eventos</h1>

         <LocationFiltered/>

         <div  className='eventCard'>
            <EventCard/>

            <EventCard/>

            <EventCard/>
 
         </div>
  
      </div>
   )
}
