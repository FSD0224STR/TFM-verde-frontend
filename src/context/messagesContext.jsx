import { createContext, useContext, useState } from 'react';
import messagesApi from '../apiServices/messagesApi';
import { LoginContextP } from './loginContextPrueba';
import { UserContext } from './userContext';
import { animateScroll as scroll} from 'react-scroll';
export const MessagesContext = createContext();

export default function MessagesContextProvider({ children }) {
   const [openMessage, setOpenMessage] = useState(false);
   const [message, setMessage] = useState('');
   const [messageSend, setSendMessage] = useState([]);
   const [messagesReciver, setMessagesReciver]=useState([]) 
   const { profileDetails} = useContext(LoginContextP)
   const { userDetail } = useContext(UserContext)
    
   const scrollToBottom = () => {
      console.log('ejecutando el scrol')
      scroll.scrollToBottom();
   };
    
   const openConversation = async () => {
      console.log('open conversation')
      const dataMessages = { sender: profileDetails._id, receiver: userDetail._id }
      console.log('esto es idUser',dataMessages)
      const conversation = await messagesApi.getMyConversation(dataMessages)
      if (conversation === false) {
         return setOpenMessage(true)
      } else {
         const myConversation = conversation.mensajes
         setOpenMessage(true)
         setSendMessage(myConversation)
         console.log('esto es conversation en messsagesContext',conversation)
      }
       
   }
    
   const handleSendMessage = async() => {
      if (message.trim() !== '') {
         const newMessage = { sender: profileDetails._id, receiver: userDetail._id, message }
         const addNewMessage = await messagesApi.sendNewMessage(newMessage)
         setSendMessage([...messageSend, { message: addNewMessage,sender:profileDetails._id }]);
         setMessage(' ');
          
      }
   };
    
   // const myConversation = async () => {
   //    const idUsers = { sender: profileDetails._id, receiver: userDetail._id }
   //    const getMessages = await messagesApi.getMyConversation(idUsers)
   //    setSendMessage(getMessages.mensajes)

   // }
    
   const deleteMyConversation = async () => {
      const idUser = profileDetails._id
      const deleteMsg = await messagesApi.deleletConversation(idUser)
      setSendMessage([])
      console.log('estoy elimiandno',deleteMsg)

   }

   const messagesContextValue = {
      openMessage,
      setOpenMessage,
      message,
      setMessage,
      openConversation,
      messageSend,
      handleSendMessage,
      deleteMyConversation,
      scrollToBottom
   };

   return (
      <MessagesContext.Provider value={messagesContextValue}>
         {children}
      </MessagesContext.Provider>
   );
}
