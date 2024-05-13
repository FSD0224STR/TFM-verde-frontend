import * as React from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
/* import "./LoginForm.css"; */
import { Formik, useFormik,} from 'formik';
import * as Yup from 'yup';
import userAPI from '../../../apiServices/usersApi';
// import { useNavigate } from "react-router-dom"

//   const navigate = useNavigate()

export default function LoginForm() {
   let initialValuesForm = {
      email: '',
      password: '',
   };

   const LoginSchema = Yup.object().shape({
      email: Yup.string().required('Debes ingrensar un email'),
      password: Yup.string().required('Debes ingrensar un password'),
   });

   const handleSubmitMy = async (data) => {
      //esta es todo lo qeu cambio en el inicio value
      // este handle es mi funcion la que llamo en el form es una funcion propia de formik que accedo al onSubmit
      const token = await userAPI.login(data.email, data.password)  
      console.log('login: ',token);
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
      <div className="login-container">

         <Box
            onSubmit={handleSubmit}
            component="form"
            height={400}
            width={400}
            my={4}
            display="grid"
            alignItems="center"
            justifyItems="center"
            alignContent="center"
            gap={4}
            p={2}
            sx={{ boxShadow:4, borderRadius: '10px',bgcolor:'aliceblue' }}
         >
            <Typography color="primary" variant="h2" align="center" fontWeight="bold">
        Login
            </Typography>
            <Grid
               container
               alignItems="center"
               justifyContent="center"
               justifyItems="space-evenly"
               spacing={2}
               sx={{ width: '100%' }}
            >
               <Grid item xs={12} md={9}>
                  <TextField
                     id="emailLogin"
                     type="email"
                     label="Email"
                     variant="outlined"
                     fullWidth
                     name="email"
                     value={values.email}
                     onChange={handleChange}
                     error={!!errors.email}
                     helperText={errors.email}
                  />
               </Grid>

               <Grid item xs={12} md={9}>
                  <TextField
                     id="passLogin"
                     type="password"
                     label="password"
                     variant="outlined"
                     fullWidth
                     name="password"
                     value={values.password}
                     onChange={handleChange}
                     error={!!errors.password}
                     helperText={errors.password}
                  />
               </Grid>
            </Grid>
            <Button type="submit" variant="contained" >
         Login
            </Button>
            <Typography>Forgot your password?</Typography>
         </Box>
      </div>
   );
}
