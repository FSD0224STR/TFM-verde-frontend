import React from 'react'
import EventCard from '../components/EventsCard'

import './EventsCard.css'
import LocationFiltered from '../components/LocationsFiltered'
import NavBar from '../components/NavBar/NavBar'
import { Footer } from '../components/Footer'
export default function EventsList() {
   return (

      <>
         <NavBar/> {/* Aqui aplicaré un contexto */}
      
         <div>

            <main> 

               <h1>Lista de eventos</h1>

               <LocationFiltered/>

               <div  className='eventCard'>
                  <EventCard/>

                  <EventCard/>

                  <EventCard/>
 
               </div>

            </main>

            {/* <footer>
               <Footer/>

            </footer> */}
  
         </div>
      </>
   )
}
