import React from 'react'
import FormRegister from '../components/forms/registerForm/FormRegister';
import NavBar from '../components/NavBar/NavBar';

export default function Register() {
   return (
      <>

         <NavBar/>
         <div>
            <FormRegister />
         </div>
      </>
   )
}
