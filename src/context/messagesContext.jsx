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
   const [openChat, setOpenChat] = useState(false);
   const [loadingChat,setLoadingChat] = useState(false)
   const [error,setError] = useState('')
   const [message, setMessage] = useState('');
   const [messageSend, setSendMessage] = useState([]);
   const [allConversation,setallConversation] = useState([])
   const [infoConversation, setInfoConversation] = useState({});
   const { profileDetails} = useContext(LoginContextP)
   const { userDetail } = useContext(UserContext)
   const [alertStatusDelete, setAlertStatusDelete] = useState(null)
   const [invitationMessage, setInvitationMessage] = useState(false);

   const navigate = useNavigate()
   useEffect(() => {
      setOpenMessage(false) //asegurarme de que cada vez que se navegue siempre tenga el estado de sendMessage reseteado y actualizado
   }, [navigate]);
    
   const scrollToBottom = () => {
      console.log('ejecutando el scrol')
      scroll.scrollToBottom();
   };
   
   const openConversation = async (idUsers) => {
      setLoadingChat(true)
      const conversation = await messagesApi.getMyConversation(idUsers)
      console.log('esto es conversation',conversation)
      console.log('esto es loadngi en context',loadingChat)
      if (conversation === false) {
         setLoadingChat(false)
         setOpenMessage(true)
         return
      } else if (conversation.error) {
         setLoadingChat(false)
         setError(conversation.error)
      } else {
         setOpenMessage(true)
         const myConversation = conversation.idMensage
         // console.log('esto es my Conversation',myConversation)
         setSendMessage(myConversation)
         setInfoConversation(conversation)
         setLoadingChat(false)

      }

   }

   // console.log('esto es infoConversation',infoConversation)

   const getListMessages = async () => {
      // const idUser = sessionStorage.getItem('idUser')
      const idUser = profileDetails._id
      const allChats = await messagesApi.getAllMyconversation(idUser)
      // console.log('todas las conversaciones en contexto', allChats)
      if (allChats.error) return setError(allChats.error)
      setallConversation(allChats)
      navigate('/messages')
   }

   const handleSendMessage = async() => {
      if (message.trim() !== '') {
         const newMessage = { sender: profileDetails._id, receiver: userDetail._id, message }
         const addNewMessage = await messagesApi.sendNewMessage(newMessage)
         console.log('esto es addNewMessage',addNewMessage)
         setSendMessage([...messageSend, { message: addNewMessage, sender: profileDetails._id }]);
         setMessage(' ');
          
      }
   };
    
   const deleteMyConversation = async () => {
      const idConversation = infoConversation._id
      console.log('esto es infoConvertaion',infoConversation)
      const deleteMsg = await messagesApi.deleletConversation(idConversation)
      if (deleteMsg.error) {
         setError(deleteMsg.error)
         setAlertStatusDelete(false)
      }
      console.log('eliminando')
      setAlertStatusDelete(true)
      setSendMessage([])
      getListMessages()

   }

   const ControlInvitacion = () => {
      if (invitationMessage) {
         return alert('ya has enviado un invitacion');
      } else {
         setInvitationMessage(true);
      }
   };

   const handleRequestCouple = async (dataForRequest) => {
      const response = await messagesApi.addRequestCouple(dataForRequest)
      ControlInvitacion()
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
      setSendMessage,
      getListMessages,
      allConversation,
      openChat,
      setOpenChat,
      loadingChat,
      alertStatusDelete,
      setAlertStatusDelete,
      handleRequestCouple,
      invitationMessage,
      infoConversation

   };

   return (
      <MessagesContext.Provider value={messagesContextValue}>
         {children}
      </MessagesContext.Provider>
   );
}
