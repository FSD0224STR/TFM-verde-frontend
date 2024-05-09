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


import { Formik, useFormik,} from "formik";
import * as Yup from "yup";
import userAPI from '../../../apiServices/usersApi';



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


export default function SignIn() {
  let initialValuesForm = {
    email: "",
    password: "",
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required("Debes ingrensar un email"),
    password: Yup.string().required("Debes ingrensar un password"),
  });

  const handleSubmitMy = async (data) => {
    //esta es todo lo qeu cambio en el inicio value
      // este handle es mi funcion la que llamo en el form es una funcion propia de formik que accedo al onSubmit
    const token = await userAPI.login(data.email, data.password)  
    console.log("login: ",token);
    localStorage.setItem('access_token', token)
  };

  const { handleChange, handleSubmit, values, errors } =
    useFormik({
      //destructuring de formik
      //primero recibe los valores iniciales
      initialValues: initialValuesForm,
      //SEGUNDA PROPIEDAD Recibe el onSUbmit
      onSubmit: handleSubmitMy,
      //validacion
      validationSchema: LoginSchema,
    });

  return (
    <ThemeProvider theme={main_theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
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

            onSubmit={handleSubmit}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5"   sx={{ color: 'primary.main' }}>
              Iniciar sesión
            </Typography>
            <Box component="form" noValidate  sx={{ mt: 1 }}>
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
              error={!!errors.email}
              helperText={errors.email}
              sx={{
                '& .MuiInputBase-input': {
                  color: '#000000',
                }}}
                
              />
              <TextField
           
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                variant="outlined"
                autoComplete="current-password"
                value={values.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                sx={{
                  '& .MuiInputBase-input': {
                    color: '#000000',
                  }}}
              />
              <FormControlLabel
                control={<Checkbox value="Recuerdame" />}
                sx={{ '& .MuiTypography-root': { color: 'primary.main' } }}
                label="Recuerdame"
              />
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
                  <Link href="#" variant="body2">
                  ¿Olvidaste tu contraseña?

                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"¿No tienes una cuenta? Regístrate"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}