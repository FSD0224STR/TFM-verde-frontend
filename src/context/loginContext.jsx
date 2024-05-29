
import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom';
import usersApi from '../apiServices/usersApi';

//Se crea el contexto
export const LoginContext = React.createContext()

//se crea un componente funcional donde se insertan los contextos.Este componente se encargará de pasar dicha información otros componentes con los que 
//se desee interactuar (siempre y cuando sean componentes hijos de este componente LoginContextProvider), por ello se completa el nombre con la palabra provider.
//Aqui se incluye toda la logica, funciones etc.

export const LoginContextProvider = ({Children})=>{

        const prueba=()=>{
                console.log('Que es el provider')
        }
        
        const loginContextValue={
                prueba

        }

        return(
      
                <LoginContext.Provider value={loginContextValue}>
                        {Children}
                </LoginContext.Provider>

        )
}