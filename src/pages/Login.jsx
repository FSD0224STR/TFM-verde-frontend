import React from 'react'
import  LoginForm from '../components/forms/loginForm/LoginForm';
import {SignIn} from '../components/forms/loginForm/SignIn';
import '../App.css'
import { Footer } from '../components/Footer';

export default function Login() {
   return (
      <div>

         <main>

            <h1>Bienvenido nuevamente a MeetDancing</h1>
            {/* <LoginForm/> */}
            <SignIn/>

         </main>
      
         <footer>
            <Footer/>

         </footer>
          
      </div>
    
   )
}
