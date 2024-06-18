const Servidorurl = 'http://localhost:3000';

const getAllUsers = async () => {
   //Esta funcion hace lo mismo que la de ListOfInterestedUsers, esta se puede eliminar.
   const token = localStorage.getItem('access_token');
   const response = await fetch(`${Servidorurl}/users`, {
      headers: { 'authorization:': `Bearer ${token}` },
   });
   const users = await response.json();
   return users;
};

const detailByIdUser = async (id) => {
   // console.log('entrado en la llamda de la api con su id',id)
   const response = await fetch(`${Servidorurl}/users/${id}`);
   const user = await response.json();
   // console.log('esta es la respues de la api',user)
   return user; /* .user */ //? hay quew revisar lo que se estta devolviendo //Yirka:he modificado aqui
};

const addUser = async (newUserData) => {
   const response = await fetch(`${Servidorurl}/users/register`, {
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
   const response = await fetch(`${Servidorurl}/login`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
   });
   const user = await response.json();
   return user;
};

export const deleteUser = async (id) => {
   const response = await fetch(`${Servidorurl}/user/${id}`, {
      method: 'DELETE',
   });
   const deleteUser = await response.json();
   return deleteUser;
};

export const updateUser = async (id, modifiedData) => {
   console.log('esto es id en la api', id);
   console.log('esto es modifiedData la api', modifiedData);
   const token = localStorage.getItem('access_token');
   const response = await fetch(`${Servidorurl}/users/${id}`, {
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

const login = async (email, password) => {
   const response = await fetch(`${Servidorurl}/users/login`, {
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
      const response = await fetch(`${Servidorurl}/users/myinfo`, {
         method: 'GET',
         headers: { authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
         const error = await response.json();
         return { error: error };
      }
      const data = await response.json();
      console.log('esto es la la respuesta del back de getmYprofile', data);
      return data; //LO que me devuelve el backend es toda la información de usuario.
   } catch (error) {
      return { error: 'Problema de conexion' };
   }
};

const getOneUserApi=async(userId)=>{ //Tengo que eliminar esta función y aplicar detailByIdUser, es la misma ruta
   
   const response=await fetch(`${Servidorurl}/users/${userId}`)
  
   if (!response.ok)   return { error: await response.json() }
  
   const user=await response.json()
   return user
}
export default { 
   getAllUsers,
   addUser,
   deleteUser,
   loginUser,
   login,
   detailByIdUser,
   getMyprofile,
   getOneUserApi,
   updateUser,
};
