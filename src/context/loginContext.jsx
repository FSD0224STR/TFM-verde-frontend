
import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom';
import usersApi from '../apiServices/usersApi';

//Se crea el contexto
export const LoginContext=React.createContext()

//se crea un componente funcional donde se insertan los contextos.Este componente se encargará de pasar dicha información otros componentes con los que 
//se desee interactuar (siempre y cuando sean componentes hijos de este componente LoginContextProvider), por ello se completa el nombre con la palabra provider.
//Aqui se incluye toda la logica, funciones etc.

export const LoginContextProvider=({Children})=>{
            
        const [isLoggedIn,setIsLoggedIn]=useState(false)
        const [error, setError] = useState('');
        const navigate=useNavigate()
        
        //Este es el objeto que contendrá todas aquellas funciones, variebles, objetos etc, que el contexto irá pasando a otros componentes hijos.
        
        const login=async(email,password)=>{

                const response=await usersApi.login(email,password)

                if (response.error) setError(response.error)
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

        return(

        //El value puede contener funciones, variables, objetos etc
                <LoginContext.Provider value={loginContextValue}>
                        {Children}
                </LoginContext.Provider>

        )
}