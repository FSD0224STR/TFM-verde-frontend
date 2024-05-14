import React from 'react';
import { useTheme, Paper, Typography, Container } from '@mui/material';

import '../App.css'

export const Footer = () => {
   const theme = useTheme();
   return (
      <div
         style={{
            display: 'flex',
            flexDirection: 'row',
            margin: 0,
            padding: 0,
        
         }}
      >
         <Container

            className="footer"
    
            component="main"
            style={{ flex: '1 0 auto', padding: theme.spacing(3) }}
         >
        
         </Container>
         {/* 
      <Paper
        square
        style={{
          padding: theme.spacing(7),
          // marginTop: "auto",
          // backgroundColor: "lightyellow",
          backgroundColor: "lightyellow",
          borderTop: "2px solid red",
          position: "fixed",
          width: "100%",
          bottom: 0,
          color: "white",
          fontSize: "25px",
          textAlign: "center",
        }}
      >
        {/* Your footer content goes here */}
         {/* <Typography variant="body2" color="red" align="center">
          Sticky Footer
        </Typography>
      </Paper>  */}
      </div>
   );
};
