import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usersApi from '../apiServices/usersApi';
import Home from '../pages/Home';

//Se crea el contexto
export const LoginContextP = React.createContext();

//se crea un componente funcional donde se insertan los contextos.Este componente se encargará de pasar dicha información otros componentes con los que
//se desee interactuar (siempre y cuando sean componentes hijos de este componente LoginContextProvider), por ello se completa el nombre con la palabra provider.
//Aqui se incluye toda la logica, funciones etc.
export const LoginContextProviderP = ({ children }) => {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [error, setError] = useState('');
   const [profileDetails, setProfileDetails] = useState();
   
   const navigate = useNavigate()
   const checkToken = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
         navigate('/')
         return
      }
      try {
         const response = await usersApi.getMyprofile();
         if (token && !response.error) {
            console.log(
               'Vamos a ver cuales son los datos del usuario logeado con ese token',
               response
            );
            setProfileDetails(response)
            console.log('esto es la responde dentro de profileDetails', response)
            setIsLoggedIn(true);
            navigate('/home')
         } else {
            navigate('/')
         }         
      } catch (error) {
         console.log('esto es el error de la petecion de chekToken',error)
      }
   };
   //!revisar como esta actuando el useEfFect
   useEffect(() => {
      checkToken()
   },[]);

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

   const logout = () => {
      console.log('cerrando session')
      localStorage.removeItem('access_token')
      navigate('/')
   }
   const loginContextValue = {
      isLoggedIn,
      error,
      setError,
      login,
      profileDetails,
      logout
   };

   return (
      <LoginContextP.Provider value={loginContextValue}>
         {children}
      </LoginContextP.Provider>
   );
};
