import {
   Card,
   CardMedia,
   CardContent,
   Button,
   Box,
   Typography,
   Container,
   Rating,
   TextField,
   FormControl,
   FormControlLabel,
   FormLabel,
   Radio,
   RadioGroup,
   InputLabel,
   Select,
   MenuItem,
   IconButton,
   Tooltip,
   Alert,
} from '@mui/material';
import RoleComponent from '../Pure/RoleComponent';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { LoginContextP } from '../../context/loginContextPrueba';
import * as Yup from 'yup';
import usersApi from '../../apiServices/usersApi';
import { useFormik } from 'formik';
import SliderRating from '../Pure/SliderRating';
import profileDefault from '../../img/profile.png';
import dataAge from '../../utils/dataAge';
import EditIcon from '@mui/icons-material/Edit';
import ConfigurationComponent from './ConfigurationComponent';
import CancelIcon from '@mui/icons-material/Cancel';
import AlertDialog from '../Pure/AlertDialog';
import upload from '../../apiServices/upload';
import CircularProgress from '@mui/material/CircularProgress';
import { UserContext } from '../../context/userContext';

export default function UserSettings({ navProfile }) {

   const {editPass,setEditPass} = useContext(UserContext)

   const [openDialog, setOpenDialog] = useState(false);
   const [alertStatus, setAlertStatus] = useState({});
   const [loading, setLoading] = useState(false);
   const [loadingAlert, setLoadingAlert] = useState(false);
   const [alertImg,setAlertImg] = useState(null)

   const handleClickOpen = () => {
      setOpenDialog(true);
   };

   const handleClose = () => {
      setOpenDialog(false);
   };

   const handleResetStatus = () => {
      setAlertStatus({});
      setOpenDialog(false);
      setEditPass(false)
      setFieldValue('newPassword','')
      setFieldValue('ConfirmPassword', '')
      
   };

   //? interceptando el envio de formulario en onsubmit del form para gestior la respuesta del alert
   const handleSubmitFormik = () => {
      setOpenDialog(true);
   };

   const handleConfirmSubmit = () => {
      
      handleSubmit();
   };

   const navigate = useNavigate();

   const { profileDetails, setProfileDetails } = useContext(LoginContextP);
   const {
      name,
      subName,
      description,
      gender,
      role,
      city,
      status,
      rating,
      age,
      imgProfile,
      dancingStyles,
      email,
      _id,
   } = profileDetails;

   const optionsRoll = [
      { label: 'Follower' },
      { label: 'Leader' },
      { label: 'Switch' },
   ];

   let initialValuesForm = {
      name: name,
      subName: subName,
      role: role,
      city: city,
      gender: gender,
      age: age,
      imgProfile: imgProfile,
      description: description,
      dancingStyles: dancingStyles,
      current_pass: '12345678',
      newPassword: '',
      ConfirmPassword: '',
      email: email,
      id: _id,
      isDisabled: !editPass
   };

   const registerSchema = Yup.object().shape({
      isDisabled:  Yup.boolean(),
      name: Yup.string().required('Debes ingrensar un nombre'),
      email: Yup.string().required('Debes ingrensar un email').email('formato incorrecto de email example@example.com'),
      current_pass: Yup.string().when('isDisabled', {
         is: false,
         then: ()=> Yup.string().required('Debes ingrensar una contraseña nueva').min(8, 'la contraseña tiene que tener minimo 8 carateres')}),
      newPassword: Yup.string().when('isDisabled', {
         is: false,
         then: ()=> Yup.string().required('Debes ingrensar una contraseña nueva').min(8, 'la contraseña tiene que tener minimo 8 carateres')}),
      ConfirmPassword: Yup.string().when('isDisabled', {
         is: false,
         then: () => Yup.string().oneOf([Yup.ref('newPassword'),null],'la contraseñas no coinciden')
      }),
      gender: Yup.string().required('Debes ingrensar un genero'),
      age: Yup.number('tienes que ingresar un numero').min(18, 'tienes que se mayor de 18 años').required('Debes ingrensar una edad'),
      city: Yup.string().required('Debes ingrensar un ubicacion'),
   });

   const ControllerUpdateSettings = (dataUpdateUser) => {
      const checkPass = dataUpdateUser.newPassword !== '' && dataUpdateUser.ConfirmPassword !== ''
      if (checkPass) {
         
         return  changeMyPass(dataUpdateUser)
      }
      updateUserSettings(dataUpdateUser)
   }

   const changeMyPass = async (dataUpdateUser) => {
     
      setLoadingAlert(true);
      const newData = {
         password: dataUpdateUser.newPassword,
         id: dataUpdateUser.id,
      };
      const data = await usersApi.changeMyPass(newData);
      if (data.error) {
         console.log('esto es el error', data.error);
         const dataAlert = { errorPass: true };
         setAlertStatus(dataAlert);
         // setFieldError(data.error);
         setLoadingAlert(false);
         return;
      } else {
         const dataAlert = { errorPass: false };
         setAlertStatus(dataAlert);

         setLoadingAlert(false);
         return;
      }
      
   }

   const updateUserSettings = async (dataUpdateUser) => {
      
      setLoadingAlert(true);
      const id = dataUpdateUser.id;
      const user = await usersApi.updateUser(id, dataUpdateUser);
      if (user.error) {
         const dataAlert = { errorUpdate: true };
         setAlertStatus(dataAlert);
         // setFieldError(user.error);
         setLoadingAlert(false);
      } else {
         const dataAlert = { errorUpdate: false };
         setAlertStatus(dataAlert);
         setProfileDetails(user.data);
         setLoadingAlert(false);
      }
   };

   const handleSelectImg = async (e) => {
      const file = e.target.files[0];
      const data = new FormData();
      data.append('file', file);
      const id = values.id; // obtener el id del usuasrio del los values de formik
      setLoading(true);
      const imgUser = await upload.changeImgProfile(data, id);

      console.log('Que es imgUser', imgUser);

      if (imgUser.error) {
         console.log('este es el error', imgUser.error);
         setLoading(false);
         setAlertImg(false)
         setTimeout(() => {
            setAlertImg(null)
         }, 3000);
      } else {
         setLoading(false);
         setAlertImg(true)
         setTimeout(() => {
            setAlertImg(null)
         }, 3000);
         setProfileDetails({ ...profileDetails, imgProfile: imgUser });
      }
   };

   const handleSliderChange = (index) => (event, newValue) => {
      const newDanceStyles = [...values.dancingStyles];
      newDanceStyles[index].level = newValue;
      setFieldValue('dancingStyles', newDanceStyles);
   };

   const {
      handleChange,
      handleSubmit,
      setFieldValue,
      values,
      errors,
      setFieldError,
   } = useFormik({
      initialValues: initialValuesForm,
      onSubmit: ControllerUpdateSettings,
      validationSchema: registerSchema,

   });

   return (
      <>
         <Container sx={{ my: '4rem', minHeight: '100%', maxWidth: '100%' }}>
            {alertImg &&
               <Alert variant="filled" severity="success" sx={{ textAlign: 'center', width: '400px', m: '1rem' }}>
                        Imagen Cambiada Correctamente
               </Alert>   }
            {
               alertImg === false &&
               <Alert variant="filled" severity="warning" sx={{ textAlign: 'center', width: '400px', m: '1rem' }}>
                       Imagen con un tamaño superiror a 5mb
               </Alert>
         
            }
       
            <Card
               sx={{
                  maxWidth: '100%',
                  display: 'flex',
                  p: '1rem',
                  position: 'relative',
               }}
            >
               <Box sx={{ position: 'absolute', right: 0, top: 5 }}>
                  <Tooltip title="Volver">
                     <IconButton onClick={() => navigate('/home')}>
                        <CancelIcon
                           color="primary"
                           sx={{ mr: '0.5rem', fontSize: '2rem' }}
                        />
                     </IconButton>
                  </Tooltip>
               </Box>
               <CardContent
                  sx={{
                     position: 'relative',
                     display: 'flex',
                     flexDirection: 'row-reverse',
                  }}
               >
                  {navProfile ? (
                     <ConfigurationComponent
                        values={values}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        handleChange={handleChange}
                        handleClickOpen={handleClickOpen}
                        loading={loading}
                        setFieldError={setFieldError}
                     />
                  ) : (
                     <Box
                        component="form"
                        onSubmit={handleSubmitFormik}
                        sx={{ ml: '1rem' }}
                     >
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
                        <CardContent>
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

                           <Box
                              sx={{
                                 display: 'flex',
                                 alignItems: 'center',
                                 mt: '3rem',
                                 justifyContent: 'center',
                              }}
                           >
                              <Box md={5} xs={12} mx="0.5rem">
                                 <FormControl>
                                    <FormLabel
                                       sx={{
                                          textAlign: 'left',
                                          fontSize: 20,
                                          color: 'primary.main',
                                          fontWeight: 'bold',
                                          mb: '1rem',
                                       }}
                                    >
                          ¿Eres un hombre o una mujer?
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
                                                fontSize: '1.2rem',
                                                fontWeight: '600',
                                                mx: '0.5rem',
                                                my: '0.5rem',
                                             },
                                          }}
                                          value="Female"
                                          control={<Radio />}
                                          label="Mujer"
                                       />
                                       <FormControlLabel
                                          sx={{
                                             '.MuiTypography-root': {
                                                color: 'text.secondary',
                                                fontSize: '1.2rem',
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

                              <Box xs={12} md={5} sx={{ ml: '1rem' }}>
                                 <Typography
                                    sx={{
                                       textAlign: 'left',
                                       fontSize: 20,
                                       color: 'primary.main',
                                       fontWeight: 'bold',
                                       my: '0.5rem',
                                    }}
                                 >
                        ¿Que roll quieres realizar?
                                 </Typography>
                                 <FormControl
                                    sx={{
                                       width: 250,
                                       mt: '0.4rem',
                                       color: 'text.secondary',
                                    }}
                                 >
                                    <InputLabel id="demo-simple-select-label">
                          Roll
                                    </InputLabel>
                                    <Select
                                       sx={{ color: 'text.secondary' }}
                                       labelId="OptionRoll"
                                       id="OptionRollSelect"
                                       name="role"
                                       value={values.role}
                                       label="Roll"
                                       onChange={handleChange}
                                    >
                                       {optionsRoll.map((option) => (
                                          <MenuItem
                                             key={option.label}
                                             sx={{ color: 'text.secondary' }}
                                             value={option.label}
                                          >
                                             {option.label}
                                          </MenuItem>
                                       ))}
                                    </Select>
                                 </FormControl>
                              </Box>
                           </Box>
                           <CardContent sx={{ display: 'flex', gap: 9 }}>
                              <Box>
                                 <Typography
                                    sx={{
                                       textAlign: 'left',
                                       fontSize: 20,
                                       color: 'primary.main',
                                       fontWeight: 'bold',
                                       my: '1rem',
                                    }}
                                 >
                        ¿En dónde quieres bailar?
                                 </Typography>

                                 <TextField
                                    id="cityUser"
                                    type="text"
                                    label="Ciudad"
                                    variant="outlined"
                                    placeholder="Ciudad"
                                    //   name="name"
                                    value={values.city} //necesito el value pero no el name para setfield
                                    onChange={(e) => {
                                       setFieldValue('city', e.target.value); //PARA RECOGER VALORES DE TARGET
                                    }}
                                    error={!!errors.city}
                                    helperText={errors.city}
                                    sx={{
                                       '& .MuiInputBase-input': {
                                          color: 'text.secondary',
                                       },
                                    }}
                                 />
                              </Box>

                              <Box display="flex" sx={{ flexDirection: 'column' }}>
                                 <Typography
                                    sx={{
                                       textAlign: 'left',
                                       fontSize: 20,
                                       color: 'primary.main',
                                       fontWeight: 'bold',
                                       mt: '1rem',
                                    }}
                                 >
                        ¿Cual es tu edad?
                                 </Typography>
                                 <FormControl
                                    sx={{ width: 250, color: 'text.secondary', mt: '1rem' }}
                                 >
                                    <InputLabel id="demo-simple-select-label">
                          Age
                                    </InputLabel>
                                    <Select
                                       sx={{ color: 'text.secondary' }}
                                       labelId="age-label"
                                       id="age-select"
                                       name="age"
                                       value={values.age}
                                       label="Age"
                                       onChange={handleChange}
                                    >
                                       {dataAge().map((num) => (
                                          <MenuItem
                                             key={num.number}
                                             sx={{ color: 'text.secondary' }}
                                             value={num.number}
                                          >
                                             {num.number}
                                          </MenuItem>
                                       ))}
                                    </Select>
                                 </FormControl>
                              </Box>
                           </CardContent>
                        </CardContent>
                        <CardContent>
                           <Typography
                              color="primary.main"
                              fontSize="1.5rem"
                              fontWeight="600"
                           >
                    Nivel según los tipos de baile:
                           </Typography>
                           <Typography
                              component="span"
                              variant="body2"
                              sx={{ color: 'text.secondary', mb: '1rem' }}
                           >
                    principiante: 1 || avanzado: 5
                           </Typography>
                           <Box
                              sx={{
                                 maxHeight: '200px',
                                 display: 'grid',
                                 gridTemplateColumns: 'repeat(2, 1fr)',
                                 gap: '2rem',
                              }}
                           >
                              <SliderRating
                                 handleSliderChange={handleSliderChange}
                                 values={values}
                                 dancingStyles={dancingStyles}
                              />
                           </Box>
                        </CardContent>
                        <Box component="div" sx={{ mt: '5rem', ml: '1rem' }}>
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

                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                           <Button
                              sx={{
                                 ':hover': { bgcolor: 'secondary.variante' },
                                 fontSize: '1.5rem',
                              }}
                              onClick={handleClickOpen}
                              variant="contained"
                           >
                    Guardar Cambios
                           </Button>
                        </Box>
                     </Box>
                  )}

                  {/* //!de aqui para abajo es la parte izquierda del componente */}
                  <CardContent
                     sx={{
                        bgcolor: '#d1ebdc',
                        maxWidth: '400px',
                        height: '100%',
                        display: { xs: 'none', sm: 'block' },
                     }}
                  >
                     <Box sx={{ position: 'relative' }}>
                        {loading ? (
                           <Box
                              sx={{
                                 display: 'flex',
                                 justifyContent: 'center',
                                 alignContent: 'center',
                                 m: '6rem',
                              }}
                           >
                              {' '}
                              <CircularProgress size={80} />{' '}
                           </Box>
                        ) : (
                           <>
                              {' '}
                              <CardMedia
                                 sx={{
                                    MaxWidth: '300px',
                                    MaxHeight: '300px',
                                    margin: 'auto',
                                    position: 'relative',
                                 }}
                                 component="img"
                                 alt="Foto Perfil"
                                 height="300px"
                                 src={!imgProfile ? profileDefault : imgProfile}
                              />
                              <Box sx={{ position: 'absolute', top: 265, left: 0 }}>
                                 <Button
                                    variant="outlined"
                                    endIcon={<EditIcon />}
                                    sx={{
                                       border: 'none',
                                       color: 'text.terciary',
                                       position: 'relative',
                                       mb: '5rem',
                                    }}
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
                                       onChange={handleSelectImg}
                                    />
                        Modificar foto
                                 </Button>
                              </Box>
                           </>
                        )}
                     </Box>
                     <Box>
                        <Typography
                           color="primary.main"
                           variant="h5"
                           component="div"
                           sx={{
                              mt: '1rem',
                              fontSize: '2rem',
                              fontWeight: 'bold',
                           }}
                        >
                           {name} {subName}
                        </Typography>
                     </Box>
                     <Box
                        component="span"
                        sx={{
                           fontSize: '1.5rem',
                           fontWeight: 'bold',
                           color: 'secondary.variante',
                        }}
                     >
                ({gender === 'Male' ? 'M' : 'F'}/{age}) {city}
                     </Box>
                     <Box>
                        
                        <RoleComponent role={role} />
                     </Box>

                     <Typography
                        variant="h5"
                        fontSize="1.3rem"
                        fontWeight="bold"
                        color="primary.main"
                     >
                Sobre mi
                     </Typography>
                     <Typography
                        variant="body2"
                        fontSize="1.2rem"
                        color="text.secondary"
                        sx={{ overflowWrap: 'break-word' }}
                     >
                        {description}
                     </Typography>
                  </CardContent>
               </CardContent>
               <AlertDialog
                  openDialog={openDialog}
                  handleClose={handleClose}
                  handleResetStatus={handleResetStatus}
                  handleConfirmSubmit={handleConfirmSubmit}
                  alertStatus={alertStatus}
                  loadingAlert={loadingAlert}
               />
            </Card>
         </Container>
      </>
   );
}
