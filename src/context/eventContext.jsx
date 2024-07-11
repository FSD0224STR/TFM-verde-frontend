
import { createContext } from 'react';
import{ useState } from 'react';
import { getEventByIdApi,addInterestedPeopleApi ,deleteInterestedPeopleApi} from '../apiServices/eventsApi';
import { useContext } from 'react';
import { LoginContextP } from './loginContextPrueba';
import usersApi from '../apiServices/usersApi';
import { useNavigate } from 'react-router-dom';

export const EventContext = createContext();

export const EventContextProvider = ({ children }) => {

   const { profileDetails } = useContext(LoginContextP);
   const [listOfInterested,setListOfInterested]=useState([])
   const [listEventsInterested, setListEventsInterested] = useState([]); 
   const[eventsInfoList,setEventsInfoList]=useState([])
   const [eventId,setEventId]=useState()
   const [button_interestedEvent_Clicked, setButton_interestedEvent_Clicked] = useState(false);
   const [button_findPartner_Clicked, setButton_findPartner_Clicked] = useState(false);
   const navigate=useNavigate()

   const click_Find_Partner =  (idEvent) => {
  
      setEventId(idEvent)
      navigate('/profiles'); 
      setButton_findPartner_Clicked(true) 
 
   };

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
      return listEvents
      
   }
   
   const getOneEvent=async (eventId)=>{

      const event= await getEventByIdApi(eventId)

      if(event.error) return event.error
     
      return  event
      
   }
 
   const fetchAllEvent = async (listEventsInterested) => {
      const events = await Promise.all(listEventsInterested.map(eventId => getOneEvent(eventId)));
      setEventsInfoList(events)
      return true
   };

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
      getListEventsUser,
      fetchAllEvent,
      setButton_interestedEvent_Clicked,
      setEventId,
      setListOfInterested, 
      getProfileList,
      addInterestedPeople,
      deleteInterestedPeople,
      setButton_findPartner_Clicked,
      button_findPartner_Clicked,
      click_Find_Partner
              
   }
  
   return (
      <EventContext.Provider value={eventContextValue} >
         {children}
      </EventContext.Provider>
   )
    
}