
import { createContext } from 'react';
import{ useState } from 'react';
import { getEventByIdApi,addInterestedPeopleApi ,deleteInterestedPeopleApi} from '../apiServices/eventsApi';
import { useContext } from 'react';
import { LoginContextP } from './loginContextPrueba';
import usersApi, { getEventsUserInfApi } from '../apiServices/usersApi';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const EventContext = createContext();

export const EventContextProvider = ({ children }) => {

   const { profileDetails } = useContext(LoginContextP);
   const [listOfInterested,setListOfInterested]=useState([])
   const [listEventsInterested, setListEventsInterested] = useState([]);
   const [listUpcomingEvents, setListUpcomingEvents] = useState([]);  
   const[eventsInfoList,setEventsInfoList]=useState([])
   const [eventId,setEventId]=useState()
   const [button_interestedEvent_Clicked, setButton_interestedEvent_Clicked] = useState(false);
   const [checkInterestedEvents_Button, setCheckInterestedEvents_Button] = useState(false);
   const [button_findPartner_Clicked, setButton_findPartner_Clicked] = useState(false);
   
   const navigate=useNavigate()

   const click_Find_Partner =  (idEvent) => {
  
      setEventId(idEvent)
      setButton_findPartner_Clicked(true) 
 
   };

   const getProfileList=async (eventId,userId)=>{

      const event= await getEventByIdApi(eventId)

      if(event.error) return {error:event.error}

      const interestedPeople=event.interestedPeople
      const Interested_without_me = interestedPeople.filter(
         (person) => person !== userId
      );

      setListOfInterested(Interested_without_me)

      return  true
      
   }

   const getListEventsUser= async (userId)=>{

      const detailUser = await usersApi.detailByIdUser(userId);            
      const listEvents=detailUser.interestingEvent

      setListEventsInterested(listEvents)
    
      return listEvents
      
   }

   const getAllEventsUser= async ()=>{

      const allEvents = await getEventsUserInfApi();   
      
      if(allEvents.error){

         console.log('que es allEvents en el error',allEvents)
         return {error:allEvents.error}
      } 

      console.log('que es allEvents si todo va bien',allEvents)
      const interestingEvent=allEvents.interestingEvent
      const upcomingEvents=allEvents.upcomingEvents
      
      setListEventsInterested( interestingEvent )
      setListUpcomingEvents(upcomingEvents)
    
      return true
   }
   
   useEffect (()=>{

      if (checkInterestedEvents_Button ) {
         navigate(`/events/${profileDetails._id}`)

      }
      setCheckInterestedEvents_Button(false)
      
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[checkInterestedEvents_Button])

   useEffect (()=>{

      if (button_findPartner_Clicked ) {
         navigate(`/profiles/${eventId}/${profileDetails._id}`)
        
      }
      setButton_findPartner_Clicked(false)
      
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[button_findPartner_Clicked])
   
   const getOneEvent=async (eventId)=>{

      const event= await getEventByIdApi(eventId)

      if(event.error) return event.error
     
      return  event
      
   }

   const addInterestedPeople=async (eventId)=>{

      const response= await addInterestedPeopleApi(eventId)                                                   
      if(response.error) return {error: response.error}
      setButton_interestedEvent_Clicked(true)
      return  response 
      
   }

   const deleteInterestedPeople=async (eventId)=>{

      const response= await deleteInterestedPeopleApi(eventId)
      if(response.error) return {error: response.error}
      setButton_interestedEvent_Clicked(true)
      return  response 
      
   }

   const eventContextValue = {
      
      listOfInterested,
      eventId,
      button_interestedEvent_Clicked,
      eventsInfoList,
      listEventsInterested,
      checkInterestedEvents_Button, 
      button_findPartner_Clicked,
      listUpcomingEvents,
      getListEventsUser,
      setButton_interestedEvent_Clicked,
      setEventId,
      setListOfInterested, 
      getProfileList,
      addInterestedPeople,
      deleteInterestedPeople,
      setButton_findPartner_Clicked,
      click_Find_Partner,
      setCheckInterestedEvents_Button,
      getAllEventsUser
              
   }
  
   return (
      <EventContext.Provider value={eventContextValue} >
         {children}
      </EventContext.Provider>
   )
    
}