
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usersApi from '../apiServices/usersApi';

//Se crea el contexto
export const LoginContextP = React.createContext();
    
//se crea un componente funcional donde se insertan los contextos.Este componente se encargará de pasar dicha información otros componentes con los que 
//se desee interactuar (siempre y cuando sean componentes hijos de este componente LoginContextProvider), por ello se completa el nombre con la palabra provider.
//Aqui se incluye toda la logica, funciones etc.
export const LoginContextProviderP = ({ children }) => {
    
        const [isLoggedIn,setIsLoggedIn]=useState(false)
        const [error, setError] = useState('');
        const navigate=useNavigate()
    
        const login=async(email,password)=>{

                const response=await usersApi.login(email,password)

                if (response.error) {
                    
                        setError(response.error)  
                        console.log('que es response de la función login del conxtexto',response)}
                else{
            
                        const token=response.data
                        localStorage.setItem('access_token',token)
                        navigate('/home')
                }
                setIsLoggedIn(true)
        }
    
        const loginContextValue={

                isLoggedIn,
                error,
                setError,
                login,

        }
  
        return (
                < LoginContextP.Provider value={loginContextValue} >
                        {children}
                </ LoginContextP.Provider>
        )
    
}