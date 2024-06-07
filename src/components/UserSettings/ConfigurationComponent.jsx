import { Box,TextField,Typography } from '@mui/material'
import React from 'react'

export default function ConfigurationComponent({values,setFieldValue,errors,email}) {
   return (
      <Box >
         <Box sx={{ padding: '1rem', lineHeight: '1', mb: '1rem' }}>
            <Typography
               component="p"
               sx={{
                  textAlign: 'left',
                  color: 'primary.main',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  '& .MuiInputBase-input': {
                     color: 'text.secondary',
                  },
               }}
            >
                                      Nombre
            </Typography>

            <TextField
               id="nameRegister"
               type="text"
               label="Email"
               variant="outlined"
               placeholder="tu Email"
               fullWidth
               //   name="name"
               value={values.email} //necesito el value pero no el name para setfield
               onChange={(e) => {
                  setFieldValue('email', e.target.value); //PARA RECOGER VALORES DE TARGET
               }}
               error={!!errors.email}
               helperText={errors.email}
               sx={{
                  '& .MuiInputBase-input': {
                     color: 'text.secondary',
                  },
               }}
            />
         </Box>
      </Box>
   )
}
