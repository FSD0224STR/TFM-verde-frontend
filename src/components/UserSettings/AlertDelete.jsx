import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import { Alert, Box, CircularProgress } from '@mui/material';
import { CircularProgressLoading } from '../Pure/Loading';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from 'react-router-dom';
const Transition = React.forwardRef(function Transition(props, ref) {
   return <Slide direction="up" ref={ref} {...props} />;
});
export default function AlertDelete({
   deleteMyAccount,
   handleCloseAlertDelete,
   openAlertDelete,
   loadingDelete,
   answerDelete,
}) {
   const navigate = useNavigate()
   return (
      <React.Fragment>
         <Dialog
            open={openAlertDelete}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseAlertDelete}
            aria-describedby="alert-dialog-slide-description"
         >
            <DialogTitle sx={{ textAlign: 'center' }}>
               {'Estas seguro que quieres eliminar tu Cuenta en MeetDancing ?'}
            </DialogTitle>
            <DialogContent>
               <Box display={'flex'} sx={{ justifyContent: 'center' }}>
                  <NewReleasesIcon sx={{ fontSize: 80, color: 'red' }} />
               </Box>
               <DialogContentText
                  id="alert-dialog-slide-description"
                  sx={{ fontSize: '1.3rem', textAlign: 'center' }}
               >
            Al eliminar tu Cuenta perderás toda la informacion de tu usuario de
            manera permanente.
               </DialogContentText>
            </DialogContent>
            <DialogActions
               sx={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}
            >
               {loadingDelete ? (
                  <CircularProgress/>
               ) :
                  (
                     <>
                        {answerDelete === true && (
                           <Box sx={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
                              <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
              Se ha eliminado tu cuenta correctamente
                              </Alert>
                              <Button
                                 sx={{
                                    ':hover': { color: 'text.terciary', bgcolor: 'error.main' },
                                 }}
                                 onClick={()=>navigate('/')}
                              >
                Salir
                              </Button>
                           </Box>
                        )}
                        {answerDelete === false && (
                           <>
                              <Alert severity="info">No se ha podido eliminar tu usario intentalo más tarde</Alert>
                              <Button
                                 sx={{
                                    ':hover': { color: 'text.terciary', bgcolor: 'error.main' },
                                 }}
                                 onClick={handleCloseAlertDelete}
                              >
                Cancelar
                              </Button>
                           </>
                        )}
                        {answerDelete === null && (
                       
                           <>
                         
                              <Button
                                 sx={{
                                    ':hover': { color: 'text.terciary', bgcolor: 'success.main' },
                                 }}
                                 onClick={deleteMyAccount}
                              >
                Aceptar
                              </Button>
                              <Button
                                 sx={{
                                    ':hover': { color: 'text.terciary', bgcolor: 'error.main' },
                                 }}
                                 onClick={handleCloseAlertDelete}
                              >
                Cancelar
                              </Button>
                           </>  
                        )
                        }        
                     </>
                  )}
   
            </DialogActions>
         </Dialog>
      </React.Fragment>
   );
}
