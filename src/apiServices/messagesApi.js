
const Servidorurl = 'http://localhost:3000'

const sendNewMessage = async (newMessage) => {
    
   const response = await fetch(`${Servidorurl}/conversation`, {
      method: 'POST',
      body: JSON.stringify(newMessage),
      headers: {
         'Content-Type': 'application/json',
      },
   });
   if (!response.ok) {
        
      const error = await response.json()
      console.log('esto es error',error)
      return  error;
   }
  
   const messageSend = await response.json();
   console.log('esto es messageSend creada en Appi',messageSend.Data.message)
   return  messageSend.Data.message ;
 
}

const getMyConversation = async (idUsers) => {
   const response = await fetch(`${Servidorurl}/conversation/${idUsers.sender}/${idUsers.receiver}`, {
      method:'GET'  
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
   console.log('esto es my Id',myId)
   const response = await fetch(`${Servidorurl}/conversation/${myId}`)
   if (!response.ok) {
      const error = await response.json()
      return { error }
   }
   const myAllConversation = await response.json()
   return myAllConversation
}

const deleletConversation = async (id) => {
   const response = await fetch(`${Servidorurl}/conversation/${id}`,{method:'DELETE'})
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
   
   const response = await fetch(`${Servidorurl}/requests`,{
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
   console.log('esto es la respuesta request',responseRequest)

}

export default {
   sendNewMessage,
   getMyConversation,
   deleletConversation,
   getAllMyconversation,
   addRequestCouple
   
}