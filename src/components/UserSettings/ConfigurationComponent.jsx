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

export default function ConfigurationComponent({
   values,
   setFieldValue,
   errors,
   handleChange,
}) {
   const [editPass, setEditPass] = useState(false);
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

   return (
      <Grid 
         sx={{
            flexDirection: 'column',
            alignItems: 'center',
            
         }}
      >
         <Grid  minWidth='210%'sx={{display:'flex',flexDirection:'column'}} ml={'2.7rem'} item xs={12} md={9}>
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
                     <IconButton onClick={()=>{setEditPass(!editPass)}} >
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
               <InputLabel htmlFor="newPassword">Contraseña Actual</InputLabel>
               <OutlinedInput
                  sx={{ color: 'text.secondary' }}
                  id="current_pass"
                  type={showPassword ? 'text' : 'Password'}
                  disabled={!editPass}
                  endAdornment={
                     editPass && 
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
                  name="current_pass"
                  onChange={handleChange}
                  error={!!errors.current_pass}
                  value={values.current_pass}
                  label="Contraseña"
                
               />
               {errors.newPassword ? (
                  <Typography variant="body2" sx={{ color: 'error.main' }}>
                     {errors.newPassword}
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
                  {errors.newPassword ? (
                     <Typography variant="body2" sx={{ color: 'error.main' }}>
                        {errors.newPassword}
                     </Typography>
                  ) : null}
               </FormControl>
               <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="passwordC">Confirma nueva contraseña</InputLabel>
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
                  {errors.passwordC ? (
                     <Typography variant="body2" sx={{ color: 'error.main' }}>
                        {errors.passwordC}
                     </Typography>
                  ) : null}
               </FormControl>
            
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
               >
              Borrar mi Cuenta
               </Button>
            </Box>
            <Grid item   xs={12} md={9} display="flex" justifyContent="center">
               {loading ? (
                  <CircularProgress size={80} sx={{ m: '2rem' }} />
               ) : (
                  <Button
                     type="submit"
                     variant="contained"
                     sx={{ mt: '40px', fontSize: '20px' }}
                     size="large"
                  >
          Guardar Cambios
                  </Button>
               )}
            </Grid>
         </Grid>

      </Grid>
   );
}
