import * as React from 'react';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { buttons_theme } from '../../palette-theme-colors';

export default function EventCard() {
 
   return (
      <Box 

         height={300}
         width={400}

         my={4}
         display="flex"
         alignItems="center"
         gap={4}
         p={2}
         sx={{ backgroundColor:'#ffffff',    border: '5px solid red' }}
      >
         <FormGroup>
            <FormControlLabel  
               control={
                  <Switch 
                     /* checked={checked}
                     onChange={handleChange} */
                     sx={{
                        '& .Mui-checked': {
                           color: 'red',
                        },
                        '& .Mui-checked + .MuiSwitch-track': {
                           color: 'red',
                        },
                     }}
                  />
               }
               label="Toggle Switch"
               sx={{
                  color: 'text.primary',
                  '& .MuiFormControlLabel-label': {
                     fontSize: '1.2rem',
                  },
               }}
            />
         </FormGroup>
       
      This Box uses MUI System props for quick customization.
      </Box>
   );
}