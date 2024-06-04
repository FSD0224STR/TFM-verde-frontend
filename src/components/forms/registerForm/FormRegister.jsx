import React, { useState } from 'react';
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
} from '@mui/material';
import './formRegister.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import usersApi from '../../../apiServices/usersApi';
import { main_theme } from '../../../../palette-theme-colors';
import SelectImg from '../../Pure/SelectImg';
import defaultImg from '../../../img/profile.png';
export default function FormRegister() {
   const danceStylesList = [
      { style: 'Salsa', level: 1 },
      { style: 'Salsa Cubana', level: 1 },
      { style: 'Merengue', level: 1 },
      { style: 'Swing', level: 1 },
      { style: 'Bachata', level: 1 },
   ];

   let initialValuesForm = {
      name: '', //este valor es referente al name del input para que formik sepa donde tiene que cambiar con el onchange por eso tiene que ser igual
      subName: '',
      email: '',
      role: 'Leader',
      password: '',
      city: '',
      gender: 'Female',
      age: '',
      imgProfile: defaultImg,
      description: '',
      dancingStyles: danceStylesList,
   };

   const registerSchema = Yup.object().shape({
      name: Yup.string().required('Debes ingrensar un nombre'),
      email: Yup.string().required('Debes ingrensar un email'),
      password: Yup.string().required('Debes ingrensar un password'),
      gender: Yup.string().required('Debes ingrensar un genero'),
      age: Yup.string().required('Debes ingrensar una edad'),
      city: Yup.string().required('Debes ingrensar un ubicacion'),
   });

   const addNewUser = async (newUserData) => {
      const user = await usersApi.addUser(newUserData);
      console.log('esto es response', user);
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
      data.append('upload_preset', 'Preset_React');
      try {
         const response = await fetch(
            'https://api.cloudinary.com/v1_1/dvttkr2ks/image/upload',
            {
               method: 'POST',
               body: data,
            }
         );
         if (!response.ok) {
            throw new Error(`HTTP error status:${response.status}`);
         } else {
            const responseData = await response.json();
            console.log('esto es response', responseData);
            setFieldValue('imgProfile', responseData.secure_url);
         }
      } catch (error) {
         console.log('otro error', error);
      }
   };

   const { handleChange, handleSubmit, setFieldValue, values, errors } =
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
         <Grid maxWidth='100%' container sx={{flexDirection:'column',justifyContent:'center'}} >
                                   
            <Typography variant='h2' textAlign='center' mt='10rem' fontSize='3rem' fontWeight={'bold'}>
                 ¡Bienvenido! 250.000 personas ya se han registrado antes que tú
            </Typography>
        
            <Box
               component="form"
               onSubmit={handleSubmit}
               maxWidth={'90%'}
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
                     <TextField
                        id="passRegister"
                        type="password"
                        label="Contraseña"
                        variant="outlined"
                        fullWidth
                        sx={{
                           '& .MuiInputBase-input': {
                              color: 'text.secondary',
                           },
                        }}
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                     />
                     <Grid item display="flex" justifyContent="center">
                        <Button
                           type="submit"
                           variant="contained"
                           sx={{ mt: '40px', fontSize: '24px' }}
                           size="large"
                        >
                  Enviar
                        </Button>
                     </Grid>
                  </Grid>
               </Grid>
            </Box>
         </Grid>
      </ThemeProvider>
   );
}
