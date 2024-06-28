import React from 'react'
import '../App.css'
import {SignIn} from '../components/forms/loginForm/SignIn';
import NavBar from '../components/NavBar/NavBar';
import { Box,Typography } from '@mui/material';

export default function Login({children}) {
   
   return (

      <>
         <NavBar></NavBar>

         <Box> 
            <SignIn/>
         </Box>
         {children}
                        
      </>
    
   )
}
