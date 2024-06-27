
import { Autocomplete, ListItem, TextField } from '@mui/material';
import React from 'react';

export const Search=({ label,value,options,onChange})=>{

   return(
      <>

         <Autocomplete

            freeSolo
            value={value}
            onChange={onChange}
            options={options} 
            sx={{borderRadius:'50px' , minWidth: 150,bgcolor:'primary.main', '& .MuiInputBase-input': {color: 'white'} }}
           
            renderInput={(params) => <TextField    {...params} label={label} 

               InputLabelProps={{
                  style: { color: 'white' }, 
               }}
               sx={{
                  '& .MuiOutlinedInput-root': {
                     '& fieldset': {
                        borderColor: 'transparent', 
                     },
                     '&:hover fieldset': {
                        borderColor: 'transparent', 
                     },
                     '&.Mui-focused fieldset': {
                        borderColor: 'transparent',
                     },
                  },
               }}
            
            />}
            renderOption={(props, option) => (
               <ListItem {...props} key={option} sx={{color: 'primary.main' }}>
                  {option}
               </ListItem>
            )}
         
         />
                        
      </>
                
   )
}