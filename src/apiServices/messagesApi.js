
const VITE_HOSTING_BACKEND = import.meta.env.VITE_HOSTING_BACK
const token = localStorage.getItem('access_token');
const sendNewMessage = async (newMessage) => {
    
   const response = await fetch(`${VITE_HOSTING_BACKEND}/conversation`, {
      method: 'POST',
      body: JSON.stringify(newMessage),
      headers: {
         'Content-Type': 'application/json',
         authorization: `Bearer ${token}`
      },
   });
   if (!response.ok) {
        
      const error = await response.json()
      console.log('esto es error',error)
      return  error;
   }
  
   const messageSend = await response.json();
   console.log('esto es el mensaje nuevo',messageSend)
   console.log('esto es messageSend creada en Appi',messageSend.Data.message)
   return  messageSend.Data.message ;
 
}

const getMyConversation = async (idUsers) => {
   const response = await fetch(`${VITE_HOSTING_BACKEND}/conversation/${idUsers.sender}/${idUsers.receiver}`, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         authorization: `Bearer ${token}`
      },
   })
   
   // console.log('primera llamada',response)
   if (!response.ok) {
      console.log('entrando en error') 
      const error = await response.json()
      console.log('esto es error',error)
      return { error};
   }

   if (response.status === 204) {
      return false
   }

   const myconversation = await response.json();
   // console.log('esto es myconversation creada en Appi',myconversation.conversaciones)
   return myconversation.conversaciones;
    
}

const getAllMyconversation = async (myId) => {
   // console.log('esto es my Id',myId)
   const response = await fetch(`${VITE_HOSTING_BACKEND}/conversation/${myId}`, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         authorization: `Bearer ${token}`
      }
   })
   if (!response.ok) {
      const error = await response.json()
      return { error }
   }
   const myAllConversation = await response.json()
   return myAllConversation
}

const deleletConversation = async (id) => {
   const response = await fetch(`${VITE_HOSTING_BACKEND}/conversation/${id}`,{method:'DELETE'})
   if (!response.ok) {
        
      const error = await response.json()
      console.log('esto es error',error)
      return { error } ;
   }
  
   const responseDelete = await response.json();
   console.log('estado de la eliminacion',responseDelete)
   return  responseDelete ;

}

const addRequestCouple = async (dataForRequest) => {
   
   const response = await fetch(`${VITE_HOSTING_BACKEND}/requests`,{
      method: 'POST',
      body: JSON.stringify(dataForRequest),
      headers: {
         'Content-Type': 'application/json',
      },
   });
   if (!response.ok) {
        
      const error = await response.json()
      console.log('esto es error',error)
      return  {error};
   }
   if (response.status === 400) {
      const error = await response.json()
      return {error}
   }
   const responseRequest = await response.json()
   return responseRequest
}

const answerRequest = async (dataForAnswer) => {
   console.log('data for Reqst',dataForAnswer)
   const response = await fetch(`${VITE_HOSTING_BACKEND}/requests/${dataForAnswer.idRequest}`, {
      method: 'PATCH',
      body: JSON.stringify(dataForAnswer),
      headers: {
         'Content-Type': 'application/json',
      },
   });
   if (!response.ok) {
        
      const error = await response.json()
      console.log('esto es error',error)
      return  {error};
   }
   const updateRequest = await response.json()
   return updateRequest
   
} 

const getRequest = async (idRequest) => {
   const response = await fetch(`${VITE_HOSTING_BACKEND}/requests/${idRequest}`, {
      method: 'GET',
   })
   if (!response.ok) {
        
      const error = await response.json()
      console.log('esto es error',error)
      return  {error};
   }
   const myRequest = await response.json()
   return myRequest
   
}

export default {
   sendNewMessage,
   getMyConversation,
   deleletConversation,
   getAllMyconversation,
   addRequestCouple,
   answerRequest,
   getRequest
   
}