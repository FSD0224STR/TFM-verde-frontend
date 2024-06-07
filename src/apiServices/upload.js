const Servidorurl = 'http://localhost:3000'

const uploadImgProfile = async (data) => {
   const response = await fetch(`${Servidorurl}/uploads/photoUser`,
      {
         method: 'POST',
         body: data,
      });
 
   if (!response.ok) {
      const error = await response.json()
      return {error}
       
   } else {
      const responseData = await response.json();
      return responseData
   }
}

export default {
   uploadImgProfile
}