import {
   Box,
   Typography,
   Button,
   InputLabel,
   FormControl,
   OutlinedInput,
   InputAdornment,
   IconButton,
   Alert,
   CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import usersApi from '../../../apiServices/usersApi';
import { Link, useNavigate } from 'react-router-dom';

export default function PassRecoverForm({tokenRecoveryparams}) {
   const [showPassword, setShowPassword] = useState(false);
   const [showPasswordC, setShowPasswordC] = useState(false);
   const [loading, setloading] = useState(false)
   const [errorChangePass,setErrorChangePass] = useState(null)

   const handleClickShowPassword = () => setShowPassword((show) => !show);
   const handleClickShowPasswordC = () => setShowPasswordC((show) => !show);

   const handleMouseDownPassword = (event) => {
      event.preventDefault();
   };
   const handleMouseDownPasswordC = (event) => {
      event.preventDefault();
   };
   const navigate = useNavigate()

   let initialValue = {
      newPassword: '',
      passwordC: '',
   };
   const recoverSchema = Yup.object().shape({
      newPassword: Yup.string().required('Debes ingrensar un contraseña').min(8, 'la contraseña tiene que tener minimo 8 carateres'),
      passwordC: Yup.string().required('Debes Confirmar tu contraseña').oneOf([Yup.ref('newPassword'),null],'la contraseñas no coinciden'),
   });

   const handleRecoverMypass = async (data) => {
      setloading(true)
      const dataWithToken = {...data,token:tokenRecoveryparams}
      const response = await usersApi.resetPassword(dataWithToken)
 
      if (response.error) {
         setloading(false)
         return setErrorChangePass(true)
      }
      setloading(false)
      setErrorChangePass(false)
      setFieldValue('newPassword','')
      setFieldValue('passwordC','')
      setTimeout(() => {
         navigate('/')
      }, 5000);
   }
    
   const { handleChange, handleSubmit, errors, values,setFieldValue } = useFormik({
      initialValues: initialValue,
      validationSchema: recoverSchema,
      onSubmit: handleRecoverMypass,
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
               sx={{ fontWeight: 'bold', textAlign: 'center', mb: '5rem',color:'primary.main' }}
            >
          No te preocupes. ¡Podrás conectarte en un abrir y cerrar de ojos!{' '}
            </Typography>
            <Typography sx={{color:'primary.main'}} fontSize={'1.5rem'} textAlign={'center'}>
          A continuación crea una nueva contraseña y serás capaz de conectarte
          nuevamente. Por favor, no uses caracteres extraños, solamente letras y
          números.
            </Typography>
         </Box>
         <Box>
            <Box
               sx={{
                  width: '500px',
                  minHeight: '400px',
                  bgcolor: 'white',
                  p: '1rem',
                  borderRadius: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
               }}
            >
               {loading ?
                  <Box sx={{
                     display: 'flex', justifyContent: 'center',
                     alignItems: 'center'
                  }}>
                     <CircularProgress size={80} sx={{ color: 'primary.main  ' }} />
                  </Box>
                  : 
                  <>
                     <Typography
                        sx={{
                           fontSize: '1.5rem',
                           fontWeight: 'bold',
                           mb: '1rem',
                           color: 'primary.main',
                        }}
                     >
                       Restablecer Contraseña
                     </Typography>
                     <FormControl
                        sx={{ my: '1rem', mb: '2rem' }}
                        fullWidth
                        variant="outlined"
                     >
                        <InputLabel htmlFor="newPassword"> Nueva Contraseña</InputLabel>
                        <OutlinedInput
                           sx={{ color: 'text.secondary' }}
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
                
                        <Typography variant="body2" sx={{ color: 'error.main' }}>
                           {errors.newPassword}
                        </Typography>
                       
                     </FormControl>
                     <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="passwordC">Confirma contraseña</InputLabel>
                        <OutlinedInput
                           sx={{ color: 'text.secondary' }}
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
               
                        <Typography variant="body2" sx={{ color: 'error.main' }}>
                           {errors.passwordC}
                        </Typography>
             
                     </FormControl>
                     <Typography sx={{ color: 'error.main', fontWeight: 'bold' }}>
                        {errors.email}
                     </Typography>
                     {errorChangePass === false || errorChangePass === true ? null :
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
                        </Button>}
                         
                  </>
               }
               { errorChangePass === false &&
                  <Alert variant="filled" severity="success" sx={{mt:'1rem'}}>
  Tu contraseña se ha restablecido correctamente.Redirigiendo al inicio de Sesión
                  </Alert>     }
               { errorChangePass === true &&
                       
                  <Alert variant="filled" severity="error" sx={{mt:'1rem'}}>
  Enlace Expirado, vuelva a solicitar la restauración <Link to={'/recoverpass'}>aqui</Link>
                  </Alert>
           
               }
              
            </Box>
         </Box>
      </Box>
   );
}
