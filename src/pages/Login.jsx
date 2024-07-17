
import '../App.css'
import {SignIn} from '../components/forms/loginForm/SignIn';
import NavBar from '../components/NavBar/NavBar';
import { Box} from '@mui/material';

export default function Login({ children }) {
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
