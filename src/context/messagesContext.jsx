import { createContext, useContext, useState } from 'react';
import messagesApi from '../apiServices/messagesApi';
import { LoginContextP } from './loginContextPrueba';
import { UserContext } from './userContext';
import { animateScroll as scroll} from 'react-scroll';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const MessagesContext = createContext();

export default function MessagesContextProvider({ children }) {
   const [openMessage, setOpenMessage] = useState(false);
   const [message, setMessage] = useState('');
   const [messageSend, setSendMessage] = useState([]);
   const [infoConversation, setInfoConversation] = useState();
   const { profileDetails} = useContext(LoginContextP)
   const { userDetail } = useContext(UserContext)

   const navigate = useNavigate()
   useEffect(() => {
      setOpenMessage(false) //asegurarme de que cada vez que se navegue siempre tenga el estado de sendMessage reseteado y actualizado
   }, [navigate]);
    
   const scrollToBottom = () => {
      console.log('ejecutando el scrol')
      scroll.scrollToBottom();
   };
    
   const openConversation = async () => {
      const dataMessages = { sender: profileDetails._id, receiver: userDetail._id }
      const conversation = await messagesApi.getMyConversation(dataMessages)
      if (conversation === false) {
         return setOpenMessage(true)
      } else {
         const myConversation = conversation.mensajes
         setOpenMessage(true)
         setSendMessage(myConversation)
         setInfoConversation(conversation.conversaciones)

      }
    
   }
   const handleSendMessage = async() => {
      if (message.trim() !== '') {
         const newMessage = { sender: profileDetails._id, receiver: userDetail._id, message }
         const addNewMessage = await messagesApi.sendNewMessage(newMessage)
         setSendMessage([...messageSend, { message: addNewMessage, sender: profileDetails._id }]);
         setMessage(' ');
          
      }
   };
    
   // const myConversation = async () => {
   //    const idUsers = { sender: profileDetails._id, receiver: userDetail._id }
   //    const getMessages = await messagesApi.getMyConversation(idUsers)
   //    setSendMessage(getMessages.mensajes)

   // }
    
   const deleteMyConversation = async () => {
      const idConversation = infoConversation._id
      console.log('esto es infoConvertaion',infoConversation)
      const deleteMsg = await messagesApi.deleletConversation(idConversation)
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
      scrollToBottom,
      setSendMessage
   };

   return (
      <MessagesContext.Provider value={messagesContextValue}>
         {children}
      </MessagesContext.Provider>
   );
}
