
import { createContext } from 'react';
import{ useState } from 'react';
import { getEventByIdApi,addInterestedPeopleApi ,deleteInterestedPeopleApi} from '../apiServices/eventsApi';
import { useContext } from 'react';
import { LoginContextP } from './loginContextPrueba';
import usersApi from '../apiServices/usersApi';

export const EventContext = createContext();

export const EventContextProvider = ({ children }) => {

   const { profileDetails } = useContext(LoginContextP);
   const [listOfInterested,setListOfInterested]=useState([])
   const [listEventsInterested, setListEventsInterested] = useState([]); 
   const[eventsInfoList,setEventsInfoList]=useState([])
   const [eventId,setEventId]=useState()

   const getProfileList=async ()=>{

      const event= await getEventByIdApi(eventId)

      if(event.error) return {error:event.error}

      console.log(event)
      console.log(profileDetails)
      const interestedPeople=event.interestedPeople
      const Interested_without_me = interestedPeople.filter(
         (person) => person !== profileDetails._id
      );

      setListOfInterested(Interested_without_me)

      return  true
      
   }

   const getListEventsUser= async ()=>{

      const userId=profileDetails._id
      const detailUser = await usersApi.detailByIdUser(userId);            
      const listEvents=detailUser.interestingEvent
      setListEventsInterested(listEvents) 
      return true
      
   }
   
   const getOneEvent=async (eventId)=>{

      const event= await getEventByIdApi(eventId)

      if(event.error) return event.error
     
      return  event
      
   }
 
   const fetchAllEvent = async () => {
      const events = await Promise.all(listEventsInterested.map(eventId => getOneEvent(eventId)));
      setEventsInfoList(events)
      return true
   };

   const addInterestedPeople=async (eventId)=>{

      const response= await addInterestedPeopleApi(eventId)
                                                                 
      if(response.error) return {error: response.error}
      
      return  response 
      
   }

   const deleteInterestedPeople=async (eventId)=>{

      const response= await deleteInterestedPeopleApi(eventId)

      if(response.error) return {error: response.error}
   
      return  response 
      
   }

   const eventContextValue = {
      
      listOfInterested,
      eventId,
      setEventId,
      setListOfInterested, 
      getProfileList,
      addInterestedPeople,
      deleteInterestedPeople,
      listEventsInterested,
      getListEventsUser,
      eventsInfoList,
      fetchAllEvent
              
   }
  
   return (
      <EventContext.Provider value={eventContextValue} >
         {children}
      </EventContext.Provider>
   )
    
}