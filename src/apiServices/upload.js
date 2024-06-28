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
      console.log('Que es responsedata',responseData)
      return responseData.data
   }
}

const changeImgProfile = async (data, id) => {
   const response = await fetch(`${Servidorurl}/uploads/photoUser/change/${id}`,
      {
         method: 'POST',
         body: data,
      });
   if (!response.ok) {
      const error = await response.json()
      return {error}
          
   } else {
      const responseData = await response.json();
      console.log('Que es responsedata',responseData)
      return responseData.data
   }
}

export default {
   uploadImgProfile,
   changeImgProfile
}