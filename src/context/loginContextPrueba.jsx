import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import usersApi from '../apiServices/usersApi';

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
   const urlLocation = useLocation()
   // console.log('esto es urlLocation',urlLocation.pathname)
   //!revisar como esta actuando el useEfFect
   useEffect(() => {
      console.log('componente siendo montado llamandoa checkToken')
      checkToken()
   },[]);

   const checkToken = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
         navigate('/')
         return
      }
      try {
         const response = await usersApi.getMyprofile();
         
         const auth = localStorage.getItem('auth')
         if (token && !response.error) {
            sessionStorage.setItem('idUser',response._id)
            setIsLoggedIn(true);
            setProfileDetails(response)
            // console.log('esto es CheckLogin response',profileDetails) //TODO PREGUNTAR PORQUE SALE UNDERFINED
            if (auth === 'true') {
               sessionStorage.setItem('idUser',response._id)
               if (urlLocation.pathname === '/') {
                  setProfileDetails(response)
                  navigate('/home')
               }
               setProfileDetails(response)
               return
            } else {
               sessionStorage.setItem('idUser',response._id)
               localStorage.setItem('auth', true)
               navigate('/home')
            }
         } else {
            navigate('/')
         }         
      } catch (error) {
         console.log('esto es el error de la petecion de checkToken',error)
      }
   };

   const login = async (email, password) => {
      const response = await usersApi.login(email, password);

      if (response.error) setError(response.error);
      else {
         const token = response.data;
         const userdetails = response.userDetails;
         localStorage.setItem('access_token', token);
         console.log('Cuales son los datos del usuario logeado', userdetails);
         navigate('/home')
         setProfileDetails(userdetails);
         console.log('esto es login abajo',profileDetails)
      }
      setIsLoggedIn(true);
   };

   const logout = () => {
      console.log('cerrando session')
      localStorage.removeItem('access_token')
      localStorage.setItem('auth',false)
      navigate('/')
   }
   
   const loginContextValue = {
      isLoggedIn,
      error,
      setError,
      login,
      profileDetails,
      setProfileDetails,
      logout,
   };

   return (
      <LoginContextP.Provider value={loginContextValue}>
         {children}
      </LoginContextP.Provider>
   );
};
