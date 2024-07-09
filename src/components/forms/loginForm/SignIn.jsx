import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { main_theme } from '../../../../palette-theme-colors';
import {  ThemeProvider } from '@mui/material/styles'; 

import { Formik, useFormik,ErrorMessage} from 'formik';
import * as Yup from 'yup';

import { useContext } from 'react';

import { Alert, IconButton, InputAdornment } from '@mui/material';
import { LoginContextP} from '../../../context/loginContextPrueba';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

function Copyright(props) {
   return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
         {'Copyright © '}
         <Link color="inherit" href="https://mui.com/">
        MeetDancing
         </Link>{' '}
         {new Date().getFullYear()}
         {'.'}
      </Typography>
   );
}

export  function SignIn() {

   const {login,error,setError} =useContext(LoginContextP)
   const [showPassword, setShowPassword] = useState(false);
   const handleClickShowPassword = () => setShowPassword((show) => !show);
      
   const handleMouseDownPassword = (event) => {
      event.preventDefault();
   };
       
   let initialValuesForm = {
      email: '',
      password: '',
   };

   const LoginSchema = Yup.object().shape({
      email: Yup.string().required('Debes ingrensar un email').matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.(com|es)$/, 'Este correo electrónico no es válido'),
      password: Yup.string().required('Debes ingrensar una contraseña'),
   });

   const { handleChange, handleSubmit, values, errors,touched,handleBlur} =
    useFormik({
       //destructuring del formik
       //primero recibe los valores iniciales
       initialValues: initialValuesForm,
       //SEGUNDA PROPIEDAD Recibe el onSUbmit
       onSubmit:async (values)=>{
          login(values.email,values.password)
       },
       //validacion
       validationSchema: LoginSchema,
          
    });

   return (
      <ThemeProvider theme={main_theme}>
         <Box>
            <Typography variant='h2' sx={{mt:'8rem',fontWeight:'bold',fontFamily:'Dancing Script',textAlign:'center',fontSize:'5rem',color:'text.secondary'}}>Bienvenido nuevamente a MeetDancing</Typography>
         </Box>
         <Grid container component="main" sx={{ height: '100vh', mt: '5rem' }}>
           
            <Grid
       
               item
               xs={false}
               sm={4}
               md={7}
               sx={{
                  backgroundImage: 'url(https://img.freepik.com/foto-gratis/hermosa-joven-bailando-kizomba-su-pareja-hermoso-estado-animo_482257-34717.jpg?t=st=1715259048~exp=1715262648~hmac=6e2fd9c3980a73a0791589480d428ee70b8df616d35ab012b771030a3327fdb4&w=360)',
                  backgroundRepeat: 'no-repeat',
                  backgroundColor: (t) =>
                     t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
               }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
               <Box
                  sx={{
                     my: 8,
                     mx: 4,
                     display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'center',
                  }}
                                             
               >
                  <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                     <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5"   sx={{ color: 'primary.main' }}>
              Iniciar sesión
                  </Typography>

                  <Formik>
                                                
                     <Box component="form" noValidate  sx={{ mt: 1 }}    onSubmit={handleSubmit}>
                        <TextField
                           margin="normal"
                           required
                           fullWidth
                           id="email"
                           label="Correo electrónico"
                           name="email"
                           autoComplete="email"
                           autoFocus
                           variant="outlined"
                           value={values.email}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           error={touched.email && !!errors.email}
                           helperText={touched.email && errors.email}
                                                                  
                           sx={{
                              '& .MuiInputBase-input': {
                                 color: '#000000',
                              }}}
                
                        />
                        <ErrorMessage  name='email' />
                                                               
                        <TextField
           
                           margin="normal"
                           required
                           fullWidth
                           name="password"
                           label="Contraseña"
                           type={showPassword ? 'text' : 'password'}
                           id="password"
                           variant="outlined"
                           autoComplete="current-password"
                           value={values.password}
                           onBlur={handleBlur}
                           onChange={handleChange}
                           error={touched.password && !!errors.password}                                                                                                                             
                           helperText={touched.password && errors.password}

                           sx={{
                              '& .MuiInputBase-input': {
                                 color: '#000000',
                              }}}

                           InputProps={{
                              endAdornment: (
                                 <InputAdornment position="end">
                                    <IconButton
                                       aria-label="toggle password visibility"
                                       onClick={handleClickShowPassword}
                                       onMouseDown={handleMouseDownPassword}
                                    >
                                       {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                 </InputAdornment>
                              ),
                           }}
                              
                        />
                                                      
                        <FormControlLabel
                           control={<Checkbox value="Recuerdame" />}
                           sx={{ '& .MuiTypography-root': { color: 'primary.main' } }}
                           label="Recuerdame"
                        />

                        {error && <Alert sx={{ mb: 2,mt:2 }}  variant="outlined" severity="error" onClose={() => setError('')}>{` ${error}`}</Alert>}
                        <Button
                                                                       
                           type="submit"
                           fullWidth
                           variant="contained"
                           sx={{ mt: 3, mb: 2 }}
                                                                
                        >
                Iniciar sesión
                        </Button>
                        <Grid container>
                           <Grid item xs>
                              <Link 
                                 component={NavLink}
                                 to={'/recoverpass'}
                                 href="#" variant="body2">
                  ¿Olvidaste tu contraseña?

                              </Link>
                           </Grid>
                           <Grid item>
                              <Link 
                                 component={NavLink}
                                 to="/register"
                                 variant="body2">
                                 {'¿No tienes una cuenta? Regístrate'}
                              </Link>
                           </Grid>
                        </Grid>
                        <Copyright sx={{ mt: 5 }} />
                     </Box>
                  </Formik>
               </Box>
                                      
            </Grid>
                               
         </Grid>
                     
      </ThemeProvider>
   );
}
