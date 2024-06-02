import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usersApi from '../apiServices/usersApi';

//Se crea el contexto
export const LoginContextP = React.createContext();

//se crea un componente funcional donde se insertan los contextos.Este componente se encargará de pasar dicha información otros componentes con los que
//se desee interactuar (siempre y cuando sean componentes hijos de este componente LoginContextProvider), por ello se completa el nombre con la palabra provider.
//Aqui se incluye toda la logica, funciones etc.
export const LoginContextProviderP = ({ children }) => {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [error, setError] = useState('');
   const navigate = useNavigate();
   const [profileDetails, setProfileDetails] = useState({});

   const checkToken = () => {
      const token = localStorage.getItem('access_token');
      if (token) {
         setIsLoggedIn(true);

         return true;
      }
      return false;
   };

   /* const getMyprofile=async ()=>{  
      const token=localStorage.getItem('access_token')  
       
      if(token) {  
         const response=await usersApi.getMyprofile()  
         if(response.data) {  
            console.log('Vamos a ver cuales son los datos del usuario logeado con ese token',response.data)  
            setIsLoggedIn(true)  
            navigate('/home')  
         }  

      }  
   }    */

   /* //Vamos a hacer una llamada a la Api que nos diga a quien pertenece el token que está guardado y nos devuelva la información de ese usuario.  */
   /* useEffect( ()=>{  */
   /*    getMyprofile()  */

   /* })  */

   const login = async (email, password) => {
      const response = await usersApi.login(email, password);

      if (response.error) setError(response.error);
      else {
         const token = response.data;
         const userdetails = response.userDetails;
         localStorage.setItem('access_token', token);
         console.log('Cuales son los datos del usuario logeado', userdetails);
         navigate('/home');
         setProfileDetails(userdetails);
      }
      setIsLoggedIn(true);
   };

   const loginContextValue = {
      isLoggedIn,
      error,
      setError,
      login,
      profileDetails,
      checkToken,
   };

   return (
      <LoginContextP.Provider value={loginContextValue}>
         {children}
      </LoginContextP.Provider>
   );
};
