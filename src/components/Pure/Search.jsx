
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
            sx={{ minWidth: 160,bgcolor:'white','& .MuiInputBase-input': {color: 'primary.main'}}}
           
            renderInput={(params) => <TextField    {...params} label={label} />}
            renderOption={(props, option) => (
               <ListItem {...props} key={option} sx={{color: 'primary.main' }}>
                  {option}
               </ListItem>
            )}
         
         />
                        
      </>
                
   )
}