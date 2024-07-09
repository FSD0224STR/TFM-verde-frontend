
import {Box, CircularProgress} from '@mui/material';
import React from 'react';

export const CircularProgressLoading=()=>{

   return(
      <>

         <Box sx={{ display: 'flex',height:'100vh',justifyContent:'center', 
            alignItems:'center'}}>
            <CircularProgress size={130}  sx={{color:'primary.main'}} color="inherit"/>
         </Box>
                        
      </>
                
   )
}

export const CircularProgressLoadingEvent=()=>{

   return(
      <>

         <Box sx={{ display: 'flex',justifyContent:'center', 
            alignItems:'center',marginTop:5}}>
            <CircularProgress size={50}  sx={{color:'primary.main'}} color="inherit"/>
         </Box>
                        
      </>
                
   )
}