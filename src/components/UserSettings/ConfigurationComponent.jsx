import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box,TextField,Typography,Grid,InputLabel,FormControl,OutlinedInput,IconButton,InputAdornment,Button } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';

export default function ConfigurationComponent({ values, setFieldValue, errors, email,handleChange }) {
   
   const [showPassword, setShowPassword] = useState(false);
   const [showPasswordC, setShowPasswordC] = useState(false);
   
   const [loading, setLoading] = useState(false);

   const handleClickShowPassword = () => setShowPassword((show) => !show);
   const handleClickShowPasswordC = () => setShowPasswordC((show) => !show);
      
   const handleMouseDownPassword = (event) => {
      event.preventDefault();
   };
   const handleMouseDownPasswordC = (event) => {
      event.preventDefault();
   };

   return (
      <Box sx={{display:'flex', flexDirection:'column',alignItems:'center', maxWidth:'100%',position:'relative'}}>
         
         <Grid  ml={'2rem'}item xs={12} md={9}>
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
               <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: 'text.secondary' }}
               >
                                      Este es el nombre que usarás en MeetDancing. Puede ser tu
                                      nombre verdadero o un alias.
               </Typography>
            </Box>
            
            <FormControl  sx={{mb:'2rem'}} fullWidth variant="outlined" >
               <InputLabel htmlFor="newPassword">Email</InputLabel>
               <OutlinedInput
                  sx={{color:'text.secondary'}}    
                  id="email"
                  type='email'
                  name="email"
                  onChange={handleChange}
                  error={!!errors.email}
                  value={values.email}
                  label="email"
                                       
               />
               {errors.newPassword ? <Typography variant='body2' sx={{color:'error.main'}}>{ errors.newPassword}</Typography> : null}
            </FormControl>
         </Grid>
         <Grid item xs={12} md={9}>
            
            <FormControl  sx={{my:'1rem',mb:'2rem'}} fullWidth variant="outlined" >
               <InputLabel htmlFor="newPassword">Contraseña</InputLabel>
               <OutlinedInput
                  sx={{color:'text.secondary'}}    
                  id="newPassword"
                  type={showPassword ? 'text' : 'Password'}
                  endAdornment={
                     <InputAdornment position="end">
                        <IconButton
                           aria-label="toggle newPassword visibility"
                           onClick={handleClickShowPassword}
                           onMouseDown={handleMouseDownPassword}
                        >
                           {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                     </InputAdornment>
                  }
                  name="newPassword"
                  onChange={handleChange}
                  error={!!errors.newPassword}
                  value={values.newPassword}
                  label="Contraseña"
                                                          
               />
               {errors.newPassword ? <Typography variant='body2' sx={{color:'error.main'}}>{ errors.newPassword}</Typography> : null}
            </FormControl>
            <FormControl  fullWidth variant="outlined" >
               <InputLabel htmlFor="passwordC">Confirma contraseña</InputLabel>
               <OutlinedInput
                  sx={{color:'text.secondary'}}
                  id="passwordC"
                  type={showPasswordC ? 'text' : 'Password'}
                  endAdornment={
                     <InputAdornment position="end">
                        <IconButton
                           aria-label="toggle Password visibility"
                           onClick={handleClickShowPasswordC}
                           onMouseDown={handleMouseDownPasswordC}
                        >
                           {showPasswordC ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                     </InputAdornment>
                  }
                  name="passwordC"
                  onChange={handleChange}
                  error={!!errors.passwordC}
                  value={values.passwordC}
                  label="Confirma contraseña"
               />
               {errors.passwordC ? <Typography variant='body2' sx={{color:'error.main'}}>{ errors.passwordC}</Typography> : null}
            </FormControl>
               
            <Grid item display="flex" justifyContent="center">

               {loading ? <CircularProgress size={80} sx={{m:'2rem'}} /> : <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: '40px', fontSize: '24px' }}
                  size="large"
               >
            Enviar
               </Button>}
            </Grid>
         </Grid>
      </Box>
   )
}
