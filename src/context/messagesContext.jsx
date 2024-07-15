import { createContext, useContext, useRef, useState } from 'react';
import messagesApi from '../apiServices/messagesApi';
import { LoginContextP } from './loginContextPrueba';
import { UserContext } from './userContext';
import { useEffect } from 'react';
import { Await, useNavigate } from 'react-router-dom';

export const MessagesContext = createContext();

export default function MessagesContextProvider({ children }) {
   const [openMessage, setOpenMessage] = useState(false);
   const [openChat, setOpenChat] = useState(false);
   const [loadingChat, setLoadingChat] = useState(false);
   const [error, setError] = useState('');
   const [message, setMessage] = useState('');
   const [messageSend, setSendMessage] = useState([]);
   const [allConversation, setallConversation] = useState([]);
   const [infoConversation, setInfoConversation] = useState({});
   const [alertRequest, setAlertRequest] = useState(null);
   const [responseInvitation, setResponseInvitation] = useState('');
   const { profileDetails } = useContext(LoginContextP);
   const { userDetail } = useContext(UserContext);
   const [alertStatusDelete, setAlertStatusDelete] = useState(null);
   const [invitationMessage, setInvitationMessage] = useState(false);
   const [sendEventForCouple, setSendEventForCouple] = useState({});
   const [buttonReceiver, setbuttonReceiver] = useState(false);
   const navigate = useNavigate();

   useEffect(() => {
      setOpenMessage(false); //asegurarme de que cada vez que se navegue siempre tenga el estado de sendMessage reseteado y actualizado
      setSendMessage([]);
   }, [navigate]);

   const openConversation = async (idUsers) => {
      // console.log('recibiend idUser',idUsers)
      setLoadingChat(true);
      const conversation = await messagesApi.getMyConversation(idUsers);
      console.log('esto es conversation', conversation);
      if (conversation === false) {
         setLoadingChat(false);
         setOpenMessage(true);
         return;
      } else if (conversation.error) {
         setLoadingChat(false);
         setError(conversation.error);
      } else {
         setOpenMessage(true);
         const myConversation = conversation.idMensage;
         // console.log('esto es my Conversation',myConversation)
         setSendMessage(myConversation);
         setInfoConversation(conversation);
         setLoadingChat(false);
      }
      
   };

   // console.log('idRequest',idRequest)
   // console.log('esto es infoConversation',infoConversation)

   const getListMessages = async () => {
      // const idUser = sessionStorage.getItem('idUser')
      const idUser = profileDetails._id;
      const allChats = await messagesApi.getAllMyconversation(idUser);
      // console.log('todas las conversaciones en contexto', allChats)
      if (allChats.error) return setError(allChats.error);
      setallConversation(allChats);
      navigate('/messages');
   };

   const handleSendMessage = async () => {
      if (message.trim() !== '') {
         const newMessage = {
            sender: profileDetails._id,
            receiver: userDetail._id,
            message,
         };
         const addNewMessage = await messagesApi.sendNewMessage(newMessage);
         // console.log('esto es addNewMessage', addNewMessage);
         setSendMessage([
            ...messageSend,
            { message: addNewMessage, sender: profileDetails._id, type: 'message' },
         ]);
         setMessage('');
      }
   };

   const deleteMyConversation = async () => {
      const idConversation = infoConversation._id;
      // console.log('esto es infoConvertaion', infoConversation);
      const deleteMsg = await messagesApi.deleletConversation(idConversation);
      if (deleteMsg.error) {
         setError(deleteMsg.error);
         setAlertStatusDelete(false);
      }
      console.log('eliminando');
      setAlertStatusDelete(true);
      setSendMessage([]);
      getListMessages();
      setOpenMessage(false);
      // setIdRequest('')
      setInvitationMessage(false)
      setResponseInvitation('')
   };

   const resetBoxMessage = () => {
      setSendMessage([]);
      setOpenMessage(false);
      setResponseInvitation('')
      setInvitationMessage(false)
      
   };

   const handleRequestCouple = async (dataForRequest) => {
      const dataWithIdEvent = {
         ...dataForRequest,
         idEvent: sendEventForCouple._id,
         event: sendEventForCouple,
      };

      console.log('esto es dataforrequest', dataWithIdEvent);
  
      const response = await messagesApi.addRequestCouple(dataWithIdEvent);

      console.log('response request', response.data.request._id);
      console.log(' response.message.message', response.message.message)
      if (response.success) {
         setAlertRequest(true)
         setTimeout(() => {
            setAlertRequest(null)
         }, 4000);

         setInvitationMessage(true);
         setSendMessage((prevMessages) => [
            ...prevMessages,
            {
               message: response.data.message.message,
               sender: profileDetails._id,
               type: 'request',
               idRequest: { status: 'Pending', _id: response.data.request._id },
            },
         ]);
         return;
      }
      setAlertRequest(false)
      setTimeout(() => {
         setAlertRequest(null)
      }, 4000);
   };

   const hanldeAnswerRequest = async (data) => {
      console.log('data recibida para answer',data)
      const dataForAnswer = { ...data,idUser1: profileDetails._id, idUser2: userDetail._id, idEvent: sendEventForCouple._id ? sendEventForCouple._id : data.idEvent}
      const idUsers = {sender:profileDetails._id,receiver:userDetail._id}
      console.log('dataforAnswer',dataForAnswer)
      const response = await messagesApi.answerRequest(dataForAnswer)  
      console.log('esto es la respuesta de Answer', response)
      if (response.error) setError(response.error)
      if (response.data.status === 'Accepted') {
         setResponseInvitation('Accepted')
      
      } else if(response.data.status === 'Declined') {
         setResponseInvitation('Declined')
      
      } else {
         setResponseInvitation('Cancelled')
      
      }
      setTimeout(() => {
         setInvitationMessage(false)  
         setResponseInvitation('')
         openConversation(idUsers)
      }, 2000);
      
   }
   
   //localizar request en chat 
   const invitationMessageRef = useRef(null);
   const scrollToInvitationMessage = () => {
      console.log('ejecuntando scroll')
      invitationMessageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

   };

   const messagesContextValue = {
      openMessage,
      setOpenMessage,
      message,
      setMessage,
      openConversation,
      messageSend,
      handleSendMessage,
      deleteMyConversation,
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
      infoConversation,
      setSendEventForCouple,
      responseInvitation,
      setResponseInvitation,
      setInvitationMessage,
      hanldeAnswerRequest,
      scrollToInvitationMessage,
      invitationMessageRef,
      buttonReceiver,
      setbuttonReceiver,
      alertRequest,
      resetBoxMessage,
   };

   return (
      <MessagesContext.Provider value={messagesContextValue}>
         {children}
      </MessagesContext.Provider>
   );
}
