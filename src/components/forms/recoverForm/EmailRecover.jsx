import { Box, TextField, Typography, Button, CircularProgress, Alert } from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import usersApi from '../../../apiServices/usersApi';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export default function EmailRecover() {
   const [loading, setLoading] = useState(false);
   const [errorSendEmail, setErrorSendEmail] = useState(null);
    
   const navigate = useNavigate()

   const handleRecoverPass = async (data) => {
      setLoading(true)
      const recoveryPass = await usersApi.recoverMypass(data)
      console.log('error en email',recoveryPass.error)
      if (recoveryPass.error) {
         setLoading(false)
         setErrorSendEmail(true)
         setTimeout(() => {
            setErrorSendEmail(null)
         }, 2000);
         return
      } 
      setLoading(false)
      setErrorSendEmail(false)
      setTimeout(() => {
         navigate('/')
      }, 5000);
        
      console.log( 'recoverymypas',recoveryPass)
   };

   let initialValue = {
      email: '',
   };
   const recoverSchema = Yup.object().shape({
      email: Yup.string()
         .required('Debes ingrensar un email')
         .matches(
            /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.(com|es)$/,
            'Este correo electrónico no es válido'
         ),
   });

   const { handleChange, handleSubmit, errors, values } = useFormik({
      initialValues: initialValue,
      validationSchema: recoverSchema,
      onSubmit: handleRecoverPass,
   });
   return (
      <Box
         component={'form'}
         onSubmit={handleSubmit}
         sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '90%',
            height: '100vh',
         }}
      >
         <Box width={'50%'} sx={{ mb: '5rem' }}>
            <Typography
               variant="h3"
               sx={{ fontWeight: 'bold', textAlign: 'center', mb: '5rem',color:'text.terciary' }}
            >
          ¡Upsss! ¿Se te ha olvidado tu contraseña?{' '}
            </Typography>
            <Typography sx={{color:'text.terciary'}} fontSize={'1.5rem'} textAlign={'center'}>
          Escribe tu dirección de e-mail. En unos cuantos minutos recibirás un
          enlace que puedes usar para crear una nueva contraseña
            </Typography>
         </Box>
         <Box>
            <Box
               sx={{
                  width: '500px',
                  minHeight: '300px',
                  bgcolor: 'white',
                  p: '1rem',
                  borderRadius: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
               }}
            >
               <Typography
                  sx={{ fontSize: '1.5rem', fontWeight: 'bold', mb: '1rem',color:'primary.main' }}
               >
            Email
               </Typography>
               <TextField
                  id="emailRecover"
                  type="email"
                  label="Tu direccion de Email"
                  variant="filled"
                  fullWidth
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  //    helperText={errors.email}
                  sx={{
                     '& .MuiInputBase-input': {
                        color: 'text.secondary',
                        bgcolor: 'white',
                        fontSize: '1.2rem',
                     },
                  }}
               />
               <Typography sx={{ color: 'error.main', fontWeight: 'bold' }}>
                  {errors.email}
               </Typography>
               {loading ?
                  <Box sx={{
                     display: 'flex', justifyContent: 'center',
                     alignItems: 'center'
                  }}>
                     <CircularProgress size={80} sx={{ color: 'primary.main  ' ,mt:'1rem'}} />
                  </Box>
                  :
                  errorSendEmail === false || errorSendEmail === true ? null :
                     <Button
                        type="submit"
                        variant="contained"
                        sx={{
                           mt: '40px',
                           fontSize: '24px',
                           ':hover': {
                              bgcolor: 'secondary.variante',
                           },
                        }}
                        size="large"
                        fullWidth
                     >
            Enviar
                     </Button>
                       
               }
               { errorSendEmail === false &&
                  <Alert variant="filled" severity="success" sx={{mt:'1rem'}}>
                te hemos enviado el enlace a tu correo electrónico
                  </Alert>     }
               { errorSendEmail === true &&
                       
                  <Alert variant="filled" severity="error" sx={{mt:'1rem'}}>
                Usuario no encontrado con este email. porfavor compruebe el email y vuelva intentar
                  </Alert>
           
               }
            </Box>
         </Box>
      </Box>
   );
}
