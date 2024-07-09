import { createContext, useContext, useRef, useState } from 'react';
import messagesApi from '../apiServices/messagesApi';
import { LoginContextP } from './loginContextPrueba';
import { UserContext } from './userContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
   const [idRequest, setIdRequest] = useState({});
   const [infoRequest,setInfoRequest] = useState('')
   const { profileDetails } = useContext(LoginContextP);
   const { userDetail } = useContext(UserContext);
   const [alertStatusDelete, setAlertStatusDelete] = useState(null);
   const [invitationMessage, setInvitationMessage] = useState(false);
   const [sendEventForCouple, setSendEventForCouple] = useState('');
   const [responseInvitation, setResponseInvitation] = useState(null);
   const [buttonReceiver, setbuttonReceiver] = useState(false);
   const navigate = useNavigate();

   useEffect(() => {
      setOpenMessage(false); //asegurarme de que cada vez que se navegue siempre tenga el estado de sendMessage reseteado y actualizado
      setSendMessage([]);
   }, [navigate]);

   const openConversation = async (idUsers) => {
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
         console.log('esto es addNewMessage', addNewMessage);
         setSendMessage([
            ...messageSend,
            { message: addNewMessage, sender: profileDetails._id, type: 'message' },
         ]);
         setMessage('');
      }
   };

   const deleteMyConversation = async () => {
      const idConversation = infoConversation._id;
      console.log('esto es infoConvertaion', infoConversation);
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
      setIdRequest('')
      setInvitationMessage(false)
      setResponseInvitation(null)
   };

   const resetBoxMessage = () => {
      setSendMessage([]);
      setOpenMessage(false);
      setIdRequest('')
      
   };

   // const ControlInvitacion = () => {

   //    if (invitationMessage) {
   //       return alert('ya has enviado un invitacion');
   //    } else {
   //       setInvitationMessage(true);
   //    }
   // };

   const handleRequestCouple = async (dataForRequest) => {
      const dataWithIdEvent = {
         ...dataForRequest,
         idEvent: sendEventForCouple._id,
         event: sendEventForCouple,
      };
      console.log('esto es dataforrequest', dataWithIdEvent);
      const response = await messagesApi.addRequestCouple(dataWithIdEvent);
      console.log('response request', response);
      if (response.success) {
         setInvitationMessage(true);
         setSendMessage([
            ...messageSend,
            {
               message: response.message.message,
               sender: profileDetails._id,
               type: 'request',
               idRequest:{status:'Pending',_id:''}
            },
         ]);
         return;
      }
      return alert('no se ha podido realizar la solicitur intentalo mas tarde');
      // ControlInvitacion()
   };

   const hanldeAnswerRequest =  async(data) => {
      const dataForAnswer = {...data,idUser1:profileDetails._id,idUser2:userDetail._id,idEvent: sendEventForCouple._id}
      const response = await messagesApi.answerRequest(dataForAnswer)  
      console.log('esto es la respuesta de Answer', response)
      if (response.error) setError(response.error)
      if (response.data.status === 'Accepted') {
         setResponseInvitation(true)

      } else {
         setResponseInvitation(false)
      }
   }

   // const checkRequest = async () => {
   //    if (messageSend.length === 0) return
   //    const response = await messagesApi.getRequest(idRequest)
   //    // console.log('esto es mi requeste', response.data)
   //    const sender = response.data.sender
   //    const status = response.data.status
   //    // console.log('status,sender', sender, status)
   //    // console.log('condicion', sender !== profileDetails._id && status === 'Pending')

   //    if (response.error) {
   //       setError(response.error)
   //       return
   //    } 
   //    setInfoRequest(response.data.status)
   //    response.data.status ? setInvitationMessage(true) : setInvitationMessage(false)
   //    if (sender !== profileDetails._id && status === 'Pending')setbuttonReceiver(true)
   //    if (response.data.status === 'Accepted') setResponseInvitation(true)
   //    if (response.data.status === 'Declined') setResponseInvitation(false)
   // } 
   
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
      // checkRequest,
      scrollToInvitationMessage,
      invitationMessageRef,
      buttonReceiver,
      setbuttonReceiver,
      infoRequest,
      setIdRequest,
      resetBoxMessage
   };

   return (
      <MessagesContext.Provider value={messagesContextValue}>
         {children}
      </MessagesContext.Provider>
   );
}
