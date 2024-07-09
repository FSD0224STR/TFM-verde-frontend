
import {Box, CircularProgress} from '@mui/material';
import React from 'react';

export const CircularProgressLoading=()=>{

   return(
      <>

         <Box sx={{ display: 'flex',height:'100vh',justifyContent:'center', //crear componente
            alignItems:'center'}}>
            <CircularProgress size={130}  sx={{color:'primary.main'}} color="inherit"/>
         </Box>
                        
      </>
                
   )
}