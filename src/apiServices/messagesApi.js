
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
   
   console.log('primera llamada',response)
   if (!response.ok) {
      console.log('entrando en error') 
      const error = await response.json()
      console.log('esto es error',error)
      return  error;
   }

   if (response.status === 204) {
      return false
   }

   const myconversation = await response.json();
   console.log('esto es myconversation creada en Appi',myconversation)
   return myconversation;
    
}

const deleletConversation = async (id) => {
   const response = await fetch(`${Servidorurl}/conversation/${id}`,{method:'DELETE'})
   if (!response.ok) {
        
      const error = await response.json()
      console.log('esto es error',error)
      return  error ;
   }
  
   const responseDelete = await response.json();
   console.log('estado de la eliminacion',responseDelete)
   return  responseDelete ;

}

export default {
   sendNewMessage,
   getMyConversation,
   deleletConversation
   
}