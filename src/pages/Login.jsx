import React from 'react'
import '../App.css'
import {SignIn} from '../components/forms/loginForm/SignIn';
import NavBar from '../components/NavBar/NavBar';

export default function Login({children}) {
   
        return (

                <>
                        <NavBar></NavBar>

                        <div>

                                <h1>Bienvenido nuevamente a MeetDancing</h1>
                                
                                <SignIn/>
                        </div>
                        {children}
                        
                </>
    
        )
}
