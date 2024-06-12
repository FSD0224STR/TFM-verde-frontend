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
    
   //    const scrollToBottom = () => {
   //       console.log('ejecutando el scrol')
   //       scroll.scrollToBottom();
   //    };
    
   //    console.log('esto es userDetail en MessagesContex',userDetail)
   //    console.log('esto es profileDetails en MessagesContex',profileDetails)
    
   const openConversation = async() => {
      const dataMessages = { sender: profileDetails._id, receiver: userDetail._id }
      console.log('esto es idUser',dataMessages)
      const conversation = await messagesApi.getMyConversation(dataMessages)
      const myConversation = conversation.mensajes
      setSendMessage(myConversation)
      setOpenMessage(true)
      console.log('esto es conversation en messsagesContext',conversation)
       
   }
    
   const handleSendMessage = async() => {
      if (message.trim() !== '') {
         const newMessage = { sender: profileDetails._id, receiver: userDetail._id, message }
         console.log('esto es el mensaje que estoy enviando',newMessage.message)
         const addNewMessage = await messagesApi.sendNewMessage(newMessage)
         console.log('esto es el mensaje que em ha devuelto la api',addNewMessage)
         setSendMessage([...messageSend, { message: addNewMessage }]);
         setMessage(' ');
         //  myConversation()
          
      }
   };
    
   //    const myConversation = async () => {
   //       const idUsers = { sender: profileDetails._id, receiver: userDetail._id }
   //       const getMessages = await messagesApi.getMyConversation(idUsers)
   //       console.log('esto es mi conversacion', getMessages.mensajes)

   //    }
    
   const deleteMyConversation = async () => {
      const idUser = profileDetails._id
      const deleteMsg = await messagesApi.deleletConversation(idUser)
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
      deleteMyConversation
   };

   return (
      <MessagesContext.Provider value={messagesContextValue}>
         {children}
      </MessagesContext.Provider>
   );
}
