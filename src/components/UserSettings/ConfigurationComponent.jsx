import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
   Box,
   TextField,
   Typography,
   Grid,
   InputLabel,
   FormControl,
   OutlinedInput,
   IconButton,
   InputAdornment,
   Button,
   Tooltip
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { deleteUser } from '../../apiServices/usersApi';
import { useNavigate } from 'react-router-dom';
import { LoginContextP } from '../../context/loginContextPrueba';
import AlertDelete from './AlertDelete';

export default function ConfigurationComponent({
   values,
   setFieldValue,
   errors,
   handleChange,
   handleClickOpen,
   loading,
   setFieldError
}) {
  
   const { editPass, setEditPass } = useContext(UserContext)
   const {profileDetails} = useContext(LoginContextP)
   const [showPassword, setShowPassword] = useState(false);
   const [showPasswordC, setShowPasswordC] = useState(false);
   const [showPassworNew, setShowPassworNew] = useState(false);
   const [openAlertDelete, setOpenAlertDelete] = useState(false);
   const [loadingDelete, setLoadingDelete] = useState(false);
   const [answerDelete, setAnswerDelete] = useState(null);

   const handleOpenAlertDelete = () => {
      setOpenAlertDelete(true);
   };

   const handleCloseAlertDelete = () => {
      setOpenAlertDelete(false);
   };
   const handleClickShowPassword = () => setShowPassword((show) => !show);
   const handleClickShowPasswordC = () => setShowPasswordC((show) => !show);
   const handleClickShowPasswordNew = () => setShowPassworNew((show) => !show);
   const navigate = useNavigate()
   const handleMouseDownPassword = (event) => {
      event.preventDefault();
   };
   const handleMouseDownPasswordC = (event) => {
      event.preventDefault();
   };
   const handleMouseDownPassworNew = (event) => {
      event.preventDefault();
   };
   const checkFieldPass = () => {
      const filter = values.current_pass && values.newPassword && values.ConfirmPassword
      const error = Object.keys(errors).length
      if (filter && error === 0) {
         return true
      }return false
   }

   const deleteMyAccount = async () => {
      setLoadingDelete(true)
      const response = await deleteUser(profileDetails._id)
      if (response.data) {
         setLoadingDelete(false)
         setAnswerDelete(true)
         localStorage.removeItem('access_token')
      } else {
         setLoadingDelete(false)
         setAnswerDelete(false)
      }
   }

   return (
      <Grid 
         sx={{
            flexDirection: 'column',
            alignItems: 'center',
            
         }}
      >
         <AlertDelete deleteMyAccount={deleteMyAccount} handleCloseAlertDelete={handleCloseAlertDelete} openAlertDelete={openAlertDelete} loadingDelete={loadingDelete} answerDelete={answerDelete} />
         <Grid  minWidth='210%'sx={{display:'flex',flexDirection:'column',mt:'2rem'}} ml={'2.7rem'} item xs={12} md={9}>
            <Box sx={{  lineHeight: '1', mb: '1rem' }}>
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
            Email
               </Typography>
               <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: 'text.secondary' }}
               >
            Los usuarios no podran ver tu Email
               </Typography>
            </Box>

            <FormControl sx={{ mb: '2rem' }} fullWidth variant="outlined">
               <InputLabel htmlFor="newPassword">Email</InputLabel>
               <OutlinedInput
                  sx={{ color: 'text.secondary' }}
                  id="email"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  error={!!errors.email}
                  value={values.email}
                  label="email"
               />
               {errors.email ? (
                  <Typography variant="body2" sx={{ color: 'error.main' }}>
                     {errors.email}
                  </Typography>
               ) : null}
            </FormControl>
            <Box >
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
           Modificar Contraseña
                  <Tooltip title="Editar">
                     <IconButton onClick={() => {
                        const newEditPass = !editPass;
                        setEditPass(newEditPass)
                        setFieldValue('isDisabled', !newEditPass)
                        if (newEditPass) {
                           setFieldValue('current_pass', '');
                           
                        } else {
                           setFieldError('current_pass','')
                           setFieldValue('newPassword', '') 
                           setFieldValue('ConfirmPassword', '') 
                           setFieldValue('current_pass', '12345678') 
                           
                        }
                     }} >
                        <EditIcon
                           color="primary"
                           sx={{ fontSize: '1.5rem',ml:'0.5rem',pb:'0.2rem' }}
                        />
                     </IconButton>
                  </Tooltip>
               </Typography>
            </Box>
            <FormControl
               sx={{ my: '1rem', mb: '2rem' }}
               fullWidth
               variant="outlined"
            >
               <InputLabel htmlFor="current_pass">Contraseña Actual</InputLabel>
               <OutlinedInput
                  sx={{ color: 'text.secondary' }}
                  id="current_pass"
                  type={showPassword ? 'text' : 'Password'}
                  disabled={!editPass}
                  endAdornment={
                     editPass && 
                     <InputAdornment position="end">
                        <IconButton
                           aria-label="toggle current_pass visibility"
                           onClick={handleClickShowPassword}
                           onMouseDown={handleMouseDownPassword}
                        >
                           {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                     </InputAdornment>
                  }
                  name="current_pass"
                  onChange={handleChange}
                  error={!!errors.current_pass}
                  value={values.current_pass}
                  label="Contraseña actual"
                  
               />
               {errors.current_pass ? (
                  <Typography variant="body2" sx={{ color: 'error.main' }}>
                     {errors.current_pass}
                  </Typography>
               ) : null}
            </FormControl>

            {editPass && <>
            
               <FormControl
                  sx={{ my: '1rem', mb: '2rem' }}
                  fullWidth
                  variant="outlined"
               >
                  <InputLabel htmlFor="newPassword">Nueva Contraseña </InputLabel>
                  <OutlinedInput
                     disabled={!editPass}
                     sx={{ color: 'text.secondary' }}
                     id="newPassword"
                     type={showPassworNew ? 'text' : 'Password'}
                     endAdornment={
                        <InputAdornment position="end">
                           <IconButton
                              aria-label="toggle newPassword visibility"
                              onClick={handleClickShowPasswordNew}
                              onMouseDown={handleMouseDownPassworNew}
                           >
                              {showPassworNew ? <VisibilityOff /> : <Visibility />}
                           </IconButton>
                        </InputAdornment>
                     }
                     name="newPassword"
                     onChange={handleChange}
                     error={!!errors.newPassword}
                     value={values.newPassword}
                     label="Nueva Contraseña"
                  />
                  {errors.newPassword ? (
                     <Typography variant="body2" sx={{ color: 'error.main' }}>
                        {errors.newPassword}
                     </Typography>
                  ) : null}
               </FormControl>
               <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="ConfirmPassword">Confirma contraseña</InputLabel>
                  <OutlinedInput
                     disabled={!editPass}
                     sx={{ color: 'text.secondary' }}
                     id="ConfirmPassword"
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
                     name="ConfirmPassword"
                     onChange={handleChange}
                     error={!!errors.ConfirmPassword}
                     value={values.ConfirmPassword}
                     label="Confirma contraseña"
                  />
                  {errors.ConfirmPassword ? (
                     <Typography variant="body2" sx={{ color: 'error.main' }}>
                        {errors.ConfirmPassword}
                     </Typography>
                  ) : null}
               </FormControl>
               <Box sx={{display:'flex',width:'100%',justifyContent:'center',mt:'1rem',}}>
                  <Button onClick={handleClickOpen} variant='contained' disabled={checkFieldPass() ? false : true} sx={{':hover':{bgcolor:'secondary.variante'}}}>Modificar Contraseña</Button>
               </Box>
            
            </> }

            <Box>
               <Box sx={{my:'1rem',mt:'2rem',bgcolor:'#d1ebdc',p:'1rem'}}>
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
            Mi Cuenta
                  </Typography>
                  <Typography sx={{color:'secondary.variante'}}>Miembro desde</Typography>
                  <Typography
                     component="span"
                     variant="body2"
                     sx={{ color: 'text.secondary' }}
                  >
            22/06/24
                  </Typography>
               </Box>
               <Button
                  variant="outlined"
                  sx={{ mt: '40px', fontSize: '20px',color:'error.main',':hover':{color:'text.primary',bgcolor:'error.main'} }}
                  size="large"
                  fullWidth
                  disabled={editPass}
                  onClick={handleOpenAlertDelete}
               >
              Borrar mi Cuenta
               </Button>
            </Box>
            <Grid item   xs={12} md={9} display="flex" justifyContent="center">
               {loading ? (
                  <CircularProgress size={80} sx={{ m: '2rem' }} />
               ) : (
                  <Button
                     onClick={handleClickOpen}
                     type="submit"
                     variant="contained"
                     sx={{ mt: '40px', fontSize: '20px' ,':hover':{bgcolor:'secondary.variante'},':disabled':{opacity:0}}}
                     size="large"
                     disabled={editPass}
                      
                  >
          Guardar Cambios
                  </Button>
               )}
            </Grid>
         </Grid>

      </Grid>
   );
}
