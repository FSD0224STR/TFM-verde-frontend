
const Servidorurl = 'http://localhost:3000'

// const getConversation = async (idUsers) => {

//    const response = await fetch(`${Servidorurl}/conversation`, {
//       method: 'POST',
//       body: JSON.stringify(idUsers),
//       headers: {
//          'Content-Type': 'application/json',
//       },
//    });
//    if (!response.ok) {
        
//       const error = await response.json()
//       console.log('esto es error',error)
//       return  error;
//    }
    
//    const conversation = await response.json();
//    console.log('esto es conversation creada en Appi',conversation)
//    return  conversation ;
   
// }

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
   console.log('esto esl id del que esta enviando',idUsers.sender)
   console.log('esto esl id de quien esta recibiendo',idUsers.receiver)
   const response = await fetch(`${Servidorurl}/conversation/${idUsers.sender}/${idUsers.receiver}`, {
      method:'GET'  
   })
   if (!response.ok) {
        
      const error = await response.json()
      console.log('esto es error',error)
      return  error;
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
//    getConversation,
   sendNewMessage,
   getMyConversation,
   deleletConversation
   
}