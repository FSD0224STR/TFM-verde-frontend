
const VITE_HOSTING_BACKEND = import.meta.env.VITE_HOSTING_BACK
const token = localStorage.getItem('access_token');
const getAllUsers = async () => {

   const token = localStorage.getItem('access_token');
   const response = await fetch(`${VITE_HOSTING_BACKEND}/users`, {
      headers: { 'authorization:': `Bearer ${token}` },
   });
   const users = await response.json();
   return users;
};

const detailByIdUser = async (id) => {

   const response = await fetch(`${VITE_HOSTING_BACKEND}/users/${id}`);
   const user = await response.json();
   return user;
};

const addUser = async (newUserData) => {
   const response = await fetch(`${VITE_HOSTING_BACKEND}/users/register`, {
      method: 'POST',
      body: JSON.stringify(newUserData),
      headers: {
         'Content-Type': 'application/json',
      },
   });
   if (!response.ok) {
      if (response.status == 403)
         return {
            error1:
               'Este email ya existe,si has olvidado tu contraseña puedes recuperarla',
         };
   }
   const users = await response.json();
   return users;
};

const loginUser = async (data) => {
   const response = await fetch(`${VITE_HOSTING_BACKEND}/users/login`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
   });
   const user = await response.json();
   return user;
};
export const deleteUser = async (id) => {
   // console.log('esto es id de delete',id)
   const response = await fetch(`${VITE_HOSTING_BACKEND}/users/${id}`, {
      method: 'DELETE',
      headers: { 'authorization': `Bearer ${token}` }
   });
   if (!response.ok) return { error: await response.json() };
   const deleteUser = await response.json();
   return { data: deleteUser }
};

export const updateUser = async (id, modifiedData) => {

   const token = localStorage.getItem('access_token');
   const response = await fetch(`${VITE_HOSTING_BACKEND}/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(modifiedData),
      headers: {
         'Content-Type': 'application/json',
         authorization: `Bearer ${token}`,
      },
   });

   if (!response.ok) return { error: await response.json() };

   const user = await response.json();
   return { data: user };
};

const changeMyPass = async (newData) => {
  
   const token = localStorage.getItem('access_token');
   const response = await fetch(`${VITE_HOSTING_BACKEND}/users/${newData.id}`, {
      method: 'PATCH',
      body: JSON.stringify(newData),
      headers: {
         'Content-Type': 'application/json',
         authorization: `Bearer ${token}`,
      },
   });
   if (!response.ok || response.status === 401 || response.status === 400) return { error: await response.json() };
   const data = await response.json();
   return { dataReceiver: 'contraseña cambiada correctamente' };
}

const login = async (email, password) => {
   const response = await fetch(`${VITE_HOSTING_BACKEND}/users/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
   });

   if (!response.ok) {
      if (response.status == 403)
         return {
            error:
               'La contraseña es incorrecta, por favor inserte contraseña correcta.',
         };
      if (response.status == 404)
         return {
            error: 'El usuario no está registrado, por favor registrarse. ',
         };
   }

   const info = await response.json();
   return { data: info.token, userDetails: info.userDetails };
};

const getMyprofile = async () => {
   const token = localStorage.getItem('access_token');

   if (!token) {
      return { error: 'No token found' };
   }
   try {
      const response = await fetch(`${VITE_HOSTING_BACKEND}/users/myinfo`, {
         method: 'GET',
         headers: { authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
         const error = await response.json();
         return { error: error };
      }
      const data = await response.json();

      return data;
   } catch (error) {
      return { error: 'Problema de conexion' };
   }
};

const recoverMypass = async (data) => {
   const response = await fetch(`${VITE_HOSTING_BACKEND}/users/forgotPassword`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
   })
   if (!response.ok) {
      const error = await response.json();
      return { error };
   }
   const info = await response.json()
   return info
}

const resetPassword = async (data) => {
   const response = await fetch(`${VITE_HOSTING_BACKEND}/users/reset-password/${data.token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
   })
   if (!response.ok) {
      const error = await response.json();
      return { error };
   }
   const resultPass = await response.json()
   return resultPass
}

export const getEventsUserInfApi = async () => {

   const token = localStorage.getItem('access_token'); 

   const response = await fetch(`${VITE_HOSTING_BACKEND}/users/events/interested`, {
   
      headers: { authorization: `Bearer ${token}` },
   }); 

   if (!response.ok) {
      const error = await response.json();
      return { error };
   }
   const allUserEvents= await response.json()
   return allUserEvents;
 
};
export default {
   getAllUsers,
   addUser,
   deleteUser,
   loginUser,
   login,
   detailByIdUser,
   getMyprofile,
   updateUser,
   changeMyPass,
   recoverMypass,
   resetPassword,
 
};
