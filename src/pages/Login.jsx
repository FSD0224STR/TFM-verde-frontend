import React from 'react'
import '../App.css'
import {SignIn} from '../components/forms/loginForm/SignIn';

import NavBar from '../components/NavBar/NavBar';

export default function Login() {
        return (
                <>
                        <NavBar/>
                        <div>
                                <main>

                                        <h1>Bienvenido nuevamente a MeetDancing</h1>
                                     
                                        <SignIn/>

                                </main>
                  
                        </div>
                </>
    
        )
}
