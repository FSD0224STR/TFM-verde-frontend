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
} from '@mui/material';
import './formRegister.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import usersApi from '../../../apiServices/usersApi';
import { main_theme } from '../../../../palette-theme-colors';
export default function FormRegister() {
   const defaultImg = 'http://via.placeholder.com/200';
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
   };

   // const registerSchema = Yup.object().shape({
   //   name: Yup.string().required("Debes ingrensar un nombre"),
   //   email: Yup.string().required("Debes ingrensar un email"),
   //   password: Yup.string().required("Debes ingrensar un password"),
   //   gener: Yup.string().required("Debes ingrensar un genero"),
   //   age: Yup.string().required("Debes ingrensar una edad"),
   //   city: Yup.string().required("Debes ingrensar un ubicacion"),
   // });

   // const addNewUser = (data) => {
   //   console.log("entrando en el el submit");
   //   console.log(data);

   // };
   const addNewUser = async (newUserData) => {
      const user = await usersApi.addUser(newUserData);
      console.log('esto es response', user);
   };

   const { handleChange, handleSubmit, setFieldValue, values, errors } =
    useFormik({
       //destructuring de formik
       //primero recibe los valores iniciales
       initialValues: initialValuesForm,
       //SEGUNDA PROPIEDAD Recibe el onSUbmit
       onSubmit: addNewUser,
       //validacion
       // validationSchema: registerSchema,
    });
   return (
      <ThemeProvider theme={main_theme}>
         <div className="form-container">
            <h1 className="title-register">
          ¡Bienvenido! 250.000 personas ya se han registrado antes que tú
            </h1>
            <Box
               component="form"
               onSubmit={handleSubmit}
               height={1800}
               width={1000}
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
                  <Box>
                     <Typography
                        variant="h6"
                        sx={{
                           color: 'primary.main',
                           fontWeight: 'bold',
                           textAlign: 'left',
                           margin: '10px',
                        }}
                     >
                1.Seleccione una foto para tu perfil
                     </Typography>
                     <img
                        style={{
                           maxWidth: '200px',
                           maxHeight: '200px',
                           padding: '10px',
                        }}
                        src={values.imgProfile}
                     ></img>
                     <Grid item xs={12}>
                        <Button
                           variant="contained"
                           sx={{ position: 'relative', mb: '40px' }}
                        >
                           <input
                              style={{
                                 position: 'absolute',
                                 top: 0,
                                 left: 0,
                                 width: '100%',
                                 height: '100%',
                                 opacity: 0,
                                 cursor: 'pointer',
                              }}
                              name="imgProfile"
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                 setFieldValue('imgProfile', e.target.files[0]); //PARA RECOGER VALORES DE TARGET
                                 if (e.target.files[0]) {
                                    const reader = new FileReader();
                                    reader.onload = function (e) {
                                       setFieldValue('imgProfile', e.target.result); //PARA RECOGER VALORES DE TARGET
                                    };
                                    reader.readAsDataURL(e.target.files[0]);
                                 } else {
                                    setFieldValue('imgProfile', defaultImg);
                                 }
                              }}
                           />
                  Seleccionar foto
                        </Button>
                     </Grid>
                  </Box>
                  <Grid
                     container
                     alignItems="center"
                     justifyContent="flex-end"
                     margin={2}
                  >
                     <Grid item xs={12} md={5}>
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
                                 sx={{ '& .MuiTypography-root': {
                                    color: 'text.secondary',
                                    fontSize: '1.5rem',
                                    fontWeight:'600'
                                 },}}
                                 value="Female"
                                 control={<Radio />}
                                 label="Female"
                              />
                              <FormControlLabel
                                 sx={{ '& .MuiTypography-root': {
                                    color: 'text.secondary',
                                    fontSize: '1.5rem',
                                    fontWeight:'600'
                                 },}}
                                 value="Male"
                                 control={<Radio />}
                                 label="Male"
                              />
                           </RadioGroup>
                        </FormControl>
                     </Grid>

                     <Grid item xs={12} md={5}>
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
                                 sx={{ '& .MuiTypography-root': {
                                    color: 'text.secondary',
                                    fontSize: '1.5rem',
                                    fontWeight:'600'
                                 },}}
                                 value="Leader"
                                 control={<Radio />}
                                 label="Leader"
                              />
                              <FormControlLabel
                                 sx={{ '& .MuiTypography-root': {
                                    color: 'text.secondary',
                                    fontSize: '1.5rem',
                                    fontWeight:'600'
                                 },}}
                                 value="Follower"
                                 control={<Radio />}
                                 label="Follower"
                              />
                           </RadioGroup>
                        </FormControl>
                     </Grid>
                  </Grid>
                  <Grid item xs={12} md={9} sx={{ fontSize: '40px' }}>
                     <Divider />
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
                        label="Apellidos"
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
                     <Divider />
                     <Typography
                        color="primary"
                        variant="h6"
                        align="left"
                        fontWeight="bold"
                        margin="10px"
                     >
                4.Casi terminamos. ¿Cómo quieres iniciar sesión?
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
                     <Grid item display="flex" justifyContent='center'>
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
         </div>
      </ThemeProvider>
   );
}
