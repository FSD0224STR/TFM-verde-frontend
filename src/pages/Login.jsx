import React from 'react'
import  LoginForm from '../components/forms/loginForm/LoginForm';
import SignIn from '../components/forms/loginForm/SignIn';

export default function Login() {
  return (
    <div>
          <h1>Bienvenido nuevamente a MeetDancing</h1>
          {/* <LoginForm/> */}
           <SignIn/>
    </div>
  )
}
