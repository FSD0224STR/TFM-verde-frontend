import React from 'react'
import '../App.css'
import {SignIn} from '../components/forms/loginForm/SignIn';
import NavBar from '../components/NavBar/NavBar';
import { Box } from '@mui/material';
/* import { useState } from 'react';
import { CircularProgressLoading } from '../components/Pure/Loading'
import { useEffect } from 'react'; */

export default function Login({children}) {
   /*  const [loading,setLoading]=useState(false)

   useEffect (()=>{

      console.log('Que es children',children)
      
      setLoading(true)

      if (children) {
         setLoading(false)
         return 
        
      } 
      
   },[]) */
   return (

      <>
         <NavBar/>

         <Box> 
            <SignIn/>
         </Box>
         {children}
                        
      </>
    
   )
}
