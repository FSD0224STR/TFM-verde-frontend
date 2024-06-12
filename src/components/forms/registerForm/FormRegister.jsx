
import {
   Box,
   Button,
   Grid,
   TextField,
   Typography,
   FormControl,
   FormControlLabel,
   FormLabel,
   Radio,
   RadioGroup,
   Divider,
   ThemeProvider,
   Slider,
   InputLabel,
   InputAdornment,
   IconButton,
   OutlinedInput
} from '@mui/material';
import './formRegister.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import usersApi from '../../../apiServices/usersApi';
import { main_theme } from '../../../../palette-theme-colors';
import SelectImg from '../../Pure/SelectImg';
import defaultImg from '../../../img/profile.png';
import { Password, Visibility, VisibilityOff } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import upload from '../../../apiServices/upload'
export default function FormRegister() {
   const danceStylesList = [
      { style: 'Salsa', level: 1 },
      { style: 'Salsa Cubana', level: 1 },
      { style: 'Merengue', level: 1 },
      { style: 'Swing', level: 1 },
      { style: 'Bachata', level: 1 },
   ];

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

   let initialValuesForm = {
      name: '', //este valor es referente al name del input para que formik sepa donde tiene que cambiar con el onchange por eso tiene que ser igual
      subName: '',
      email: '',
      role: 'Leader',
      newPassword: '',
      passwordC:'',
      city: '',
      gender: 'Female',
      age: '',
      imgProfile: defaultImg,
      description: '',
      dancingStyles: danceStylesList,
   };

   const registerSchema = Yup.object().shape({
      name: Yup.string().required('Debes ingrensar un nombre'),
      email: Yup.string().required('Debes ingrensar un email').email('formato incorrecto de email example@example.com'),
      newPassword: Yup.string().required('Debes ingrensar un contraseña').min(8, 'la contraseña tiene que tener minimo 8 carateres'),
      passwordC: Yup.string().required('Debes Confirmar tu contraseña').oneOf([Yup.ref('newPassword'),null],'la contraseñas no coinciden'),
      gender: Yup.string().required('Debes ingrensar un genero'),
      age: Yup.number('tienes que ingresar un numero').min(18,'tienes que se mayor de 18 años').required('Debes ingrensar una edad'),
      city: Yup.string().required('Debes ingrensar un ubicacion'),
   });

   const addNewUser = async (newUserData) => {
      if (newUserData.imgProfile === defaultImg) {
         setLoading(true)
         const dataUpdate = { ...newUserData, imgProfile: ' ', password: newUserData.newPassword }
         const user = await usersApi.addUser(dataUpdate);
         if (user) {
            setTimeout(() => {
               
               setLoading(false)
            }, 2000);
            
         }
         if (user.error1) {
            setLoading(false)
            setFieldError('email',user.error1) 
         } 
      } else {
         const dataUpdate = { ...newUserData, password: newUserData.newPassword } 
         setLoading(true)
         const user = await usersApi.addUser(dataUpdate);  
         if (user) {
            setTimeout(() => {
               
               setLoading(false)
            }, 2000);
            
         }
         if (user.error1) {
            setLoading(false)
            setFieldError('email',user.error1) 
         }   
      }    
   };

   const handleSliderChange = (index) => (event, newValue) => {
      const newDanceStyles = [...values.dancingStyles];
      newDanceStyles[index].level = newValue;
      setFieldValue('dancingStyles', newDanceStyles);
   };

   const handleSelectImg = async (e) => {
      const file = e.target.files[0];
      const data = new FormData();
      data.append('file', file);

      setLoading(true)
      const imgUser = await upload.uploadImgProfile(data);
         
      if (imgUser.error) {
         console.log('este es el error',imgUser.error)
      } else {
         setLoading(false)

         setFieldValue('imgProfile', imgUser); 
      }

   };

   const { handleChange, handleSubmit, setFieldValue, values, errors,setFieldError} =
    useFormik({
       //destructuring de formik
       //primero recibe los valores iniciales
       initialValues: initialValuesForm,
       //SEGUNDA PROPIEDAD Recibe el onSUbmit
       onSubmit: addNewUser,
       //validacion
       validationSchema: registerSchema,
    });

   function nameSlider() {
      return 'Estilos de baile';
   }

   return (
      <ThemeProvider theme={main_theme}>
         <Grid maxWidth='100%' container sx={{flexDirection:'column',justifyContent:'center',alignContent:'center',alignItems:'center'}} >
                                   
            <Typography variant='h2' textAlign='center' mt='10rem' fontSize='3rem' fontWeight={'bold'}>
                 ¡Bienvenido! 250.000 personas ya se han registrado antes que tú
            </Typography>
        
            <Box
               component="form"
               onSubmit={handleSubmit}
               maxWidth={'70%'}
               m={20}
               display="flex"
               flexDirection="column"
               alignItems="center"
               justifyItems="center"
               alignContent="center"
               gap={4}
               p={2}
               sx={{ borderRadius: '10px', boxShadow: 5 }}
               bgcolor="white"
            >
               <Typography
                  color="primary"
                  variant="h6"
                  fontWeight="bold"
                  sx={{ textAlign: 'rigth', fontSize: '50px', mt: '20px' }}
               >
            Registro
               </Typography>

               <Grid
                  container
                  alignItems="center"
                  justifyContent="center"
                  justifyItems="space-evenly"
                  spacing={3}
                  sx={{ width: '100%', margin: 10 }}
               >
                                                   
                  <SelectImg
                     imgProfile={values.imgProfile}
                     handleSelectImg={handleSelectImg}
                     loading={loading}
                  />
               
                  <Grid item xs={12} md={9}>
                     <Typography
                        component="p"
                        sx={{
                           textAlign: 'left',
                           padding: '10px',
                           color: 'primary.main',
                           fontSize: '20px',
                           fontWeight: 'bold',
                           '& .MuiInputBase-input': {
                              color: 'text.secondary',
                           },
                        }}
                     >
                         ¿Cual es tu nombre?
                     </Typography>
                     <TextField
                        id="nameRegister"
                        type="text"
                        label="Nombre"
                        variant="outlined"
                        placeholder="tu nombre"
                        fullWidth
                        //   name="name"
                        value={values.name} //necesito el value pero no el name para setfield
                        onChange={(e) => {
                           setFieldValue('name', e.target.value); //PARA RECOGER VALORES DE TARGET
                        }}
                        error={!!errors.name}
                        helperText={errors.name}
                        sx={{
                           '& .MuiInputBase-input': {
                              color: 'text.secondary',
                           },
                        }}
                     />
                  </Grid>
                  <Grid item xs={12} md={9}>
                     <Typography
                        component="p"
                        sx={{
                           textAlign: 'left',
                           padding: '10px',
                           color: 'primary.main',
                           fontSize: '20px',
                           fontWeight: 'bold',
                        }}
                     >
                ¿Cual es tu apellido?
                     </Typography>
                     <TextField
                        id="subNameRegister"
                        type="text"
                        label="Apellido"
                        variant="outlined"
                        placeholder="tu apellido"
                        fullWidth
                        name="subName"
                        sx={{
                           '& .MuiInputBase-input': {
                              color: 'text.secondary',
                           },
                        }}
                        value={values.subName} //necesito el value pero no el name apra setfiel
                        onChange={handleChange}
                        error={!!errors.subName}
                        helperText={errors.subName}
                     />
                  </Grid>
                  <Box sx={{display:'flex',alignItems:'center',mt:'3rem',justifyContent:'center'}}>
                     <Box md={5} xs={12} mx='5rem'>
                        <FormControl>
                           <FormLabel
                              sx={{
                                 textAlign: 'left',
                                 fontSize: 20,
                                 color: 'primary.main',
                                 fontWeight: 'bold',
                              }}
                           >
                           Sexo
                           </FormLabel>
                           <RadioGroup
                              row
                              name="gender"
                              value={values.gender}
                              onChange={(e) => {
                                 setFieldValue('gender', e.target.value); //PARA RECOGER VALORES DE TARGET
                              }}
                           >
                              <FormControlLabel
                                 sx={{
                                    '& .MuiTypography-root': {
                                       color: 'text.secondary',
                                       fontSize: '1.5rem',
                                       fontWeight: '600',
                                    },
                                 }}
                                 value="Female"
                                 control={<Radio />}
                                 label="Mujer"
                              />
                              <FormControlLabel
                                 sx={{
                                    '& .MuiTypography-root': {
                                       color: 'text.secondary',
                                       fontSize: '1.5rem',
                                       fontWeight: '600',
                                    },
                                 }}
                                 value="Male"
                                 control={<Radio />}
                                 label="Hombre"
                              />
                           </RadioGroup>
                        </FormControl>
                     </Box>

                     <Box xs={12} md={5}  >
                        <FormControl>
                           <FormLabel
                              sx={{
                                 textAlign: 'left',
                                 fontSize: 20,
                                 color: 'primary.main',
                                 fontWeight: 'bold',
                              }}
                           >
                    Roll
                           </FormLabel>
                           <RadioGroup
                              row
                              name="role"
                              value={values.role}
                              onChange={(e) => {
                                 setFieldValue('role', e.target.value); //PARA RECOGER VALORES DE TARGET
                              }}
                           >
                              <FormControlLabel
                                 sx={{
                                    '& .MuiTypography-root': {
                                       color: 'text.secondary',
                                       fontSize: '1.5rem',
                                       fontWeight: '600',
                                    },
                                 }}
                                 value="Leader"
                                 control={<Radio />}
                                 label="Leader"
                              />
                              <FormControlLabel
                                 sx={{
                                    '& .MuiTypography-root': {
                                       color: 'text.secondary',
                                       fontSize: '1.5rem',
                                       fontWeight: '600',
                                    },
                                 }}
                                 value="Follower"
                                 control={<Radio />}
                                 label="Follower"
                              />
                           </RadioGroup>
                        </FormControl>
                     </Box>
                  </Box>
                
                  <Grid item xs={12} md={9} sx={{ fontSize: '40px' }}>
                     <Typography
                        component="p"
                        sx={{
                           textAlign: 'left',
                           mt: '20px',
                           padding: '10px',
                           color: 'primary.main',
                           fontSize: '20px',
                           fontWeight: 'bold',
                        }}
                     >
                        {' '}
                ¿Cual es tu edad ?
                     </Typography>
                     <TextField
                        id="age"
                        type="text"
                        name="age"
                        label="Edad"
                        variant="outlined"
                        placeholder="Tu edad"
                        fullWidth
                        sx={{
                           fontSize: '10px',
                           fontWeight: 'bold',
                           '& .MuiInputBase-input': {
                              color: 'text.secondary',
                           },
                        }}
                        value={values.age}
                        onChange={handleChange}
                        error={!!errors.age}
                        helperText={errors.age}
                     />
                  </Grid>

                  <Grid item component="div" xs={12} md={9}>
                     <Typography
                        component="p"
                        sx={{
                           textAlign: 'left',
                           padding: '10px',
                           color: 'primary.main',
                           fontSize: '20px',
                           fontWeight: 'bold',
                        }}
                     >
                ¿Donde quieres ir a bailar?
                     </Typography>
                     <TextField
                        id="city"
                        name="city"
                        type="text"
                        label="Ciudad"
                        variant="outlined"
                        placeholder="tu Ciudad"
                        fullWidth
                        sx={{
                           '& .MuiInputBase-input': {
                              color: 'text.secondary',
                           },
                        }}
                        value={values.city}
                        onChange={handleChange}
                        error={!!errors.city}
                        helperText={errors.city}
                     />
                  </Grid>

                  <Grid item xs={12} md={9}>
                     <Divider />
                     <Box component="div">
                        <Typography
                           variant="h6"
                           sx={{
                              color: 'primary.main',
                              fontWeight: 'bold',
                              textAlign: 'left',
                              margin: '10px',
                           }}
                        >
                  3.Hablanos un poco mas de ti.
                        </Typography>
                        <TextField
                           label="Descripción"
                           name="description"
                           multiline
                           rows={4}
                           fullWidth
                           sx={{
                              mb: '20px',
                              '& .MuiInputBase-input': {
                                 color: 'text.secondary',
                              },
                           }}
                           placeholder="maximo 300 caracteres"
                           value={values.description}
                           error={!!errors.description}
                           helperText={errors.description}
                           onChange={handleChange}
                        />
                     </Box>
                     <Typography
                        variant="h6"
                        sx={{
                           color: 'primary.main',
                           fontWeight: 'bold',
                           textAlign: 'left',
                           margin: '10px',
                        }}
                     >
                4.Tipos de baile según tu nivel{' '}
                        <Box
                           component="span"
                           sx={{ fontWeight: '400', fontSize: '1rem' }}
                        >
                  (nivel iniciante:1)
                        </Box>
                     </Typography>
                     {danceStylesList.map((styleItem, index) => (
                        <Box ml="1.2rem" mb="0.5rem" key={styleItem.style}>
                           <Typography
                              sx={{ color: 'text.secondary', fontSize: '1.2rem' }}
                           >
                              {styleItem.style}
                           </Typography>
                           <Slider
                              aria-label={styleItem.style}
                              defaultValue={1}
                              getAriaValueText={nameSlider}
                              valueLabelDisplay="auto"
                              shiftStep={5}
                              step={1}
                              marks
                              min={1}
                              max={5}
                              sx={{ maxWidth: '90%' }}
                              name="danceStyles"
                              value={values.dancingStyles[index].level}
                              onChange={handleSliderChange(index)}
                           />
                        </Box>
                     ))}
                     <Divider sx={{ m: '1rem' }} />
                     <Typography
                        color="primary"
                        variant="h6"
                        align="left"
                        fontWeight="bold"
                        margin="10px"
                     >
                5.Casi terminamos. ¿Cómo quieres iniciar sesión?
                     </Typography>

                     <TextField
                        id="emailRegister"
                        type="email"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        sx={{
                           '& .MuiInputBase-input': {
                              color: 'text.secondary',
                           },
                        }}
                     />
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
               </Grid>
            </Box>
         </Grid>
      </ThemeProvider>
   );
}
