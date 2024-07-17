
const VITE_HOSTING_BACKEND=import.meta.env.VITE_HOSTING_BACK

const uploadImgProfile = async (data) => {
   const response = await fetch(`${VITE_HOSTING_BACKEND}/uploads/photoUser`,
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
   const response = await fetch(`${VITE_HOSTING_BACKEND}/uploads/photoUser/change/${id}`,
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