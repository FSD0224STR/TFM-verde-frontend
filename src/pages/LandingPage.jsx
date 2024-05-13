import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import { Container } from '@mui/material';

export default function LandingPage() {
   return (
      <>
         <NavBar />

         <Container sx={{display:'flex' ,textAlign:'center'}}>
            <h1>LandingPage</h1>
         </Container>
     
      </>
   );
}
