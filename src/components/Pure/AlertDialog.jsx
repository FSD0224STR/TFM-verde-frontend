import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InfoIcon from '@mui/icons-material/Info';
import CheckIcon from '@mui/icons-material/Check';
import ReportIcon from '@mui/icons-material/Report';
import { Alert, CircularProgress, Box } from '@mui/material';

export default function AlertDialog({
   openDialog,
   handleClose,
   handleConfirmSubmit,
   alertStatus,
   handleResetStatus,
   loadingAlert,
}) {
   const alertsUpdateUser = () => {
    
      if (alertStatus.errorUpdate === false) {
         return (
            <DialogContent>
               <CheckIcon fontSize='inherit' />
               <Alert  severity="success"  sx={{fontSize:'1.5rem',textAlign:'center'}}>
            Los cambios se han realizados correctamente
               </Alert>
            </DialogContent>
         );
      } else if (alertStatus.errorUpdate === true) {
         return (
            <DialogContent>
               <ReportIcon fontSize="inherit" />
               <Alert severity="error"  sx={{fontSize:'1.5rem',textAlign:'center'}}>
            No se ha podido realizar los cambios. Intentalo mas tarde
               </Alert>
            </DialogContent>
         );
      } else if (alertStatus.errorPass === false) {
         return (
            <DialogContent>
               <CheckIcon fontSize="inherit" />
               <Alert  severity="success"  sx={{fontSize:'1.5rem',textAlign:'center'}}>
            La contraseña se cambiado correctamente
               </Alert>
            </DialogContent>
         );
      } else {
         return (
            <DialogContent>
               <ReportIcon fontSize="inherit" />
               <Alert  severity="error"  sx={{fontSize:'1.5rem',textAlign:'center'}}>
            no Se ha podido cambiar la contraseña.intentalo mas tarde
               </Alert>
            </DialogContent>
         );
      }
   };
   const checkAlert = Object.keys(alertStatus).length === 0;

   const renderButtons = () => {
      // console.log('render alert',checkAlert)
      if (!checkAlert) {
         return (
            <Button
               sx={{
                  ':hover': { color: 'text.primary', bgcolor: 'error.main' },
               }}
               onClick={handleResetStatus}
            >
          Cerrar
            </Button>
         );
      } else {
         return (
            <>
               <Button
                  sx={{
                     ':hover': { color: 'text.primary', bgcolor: 'error.main' },
                  }}
                  onClick={handleClose}
               >
                      Cancelar
               </Button>
               <Button
                  sx={{
                     ':hover': { color: 'text.primary', bgcolor: 'success.main' },
                  }}
                  onClick={handleConfirmSubmit}
                  autoFocus
               >
                     Confirmar
               </Button>
            </>
         )
      }
   };

   return (
      <>
         <Dialog
            open={openDialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
         >
            {loadingAlert ? (
               <Box
                  sx={{
                     width: 200,
                     height: 200,
                     display: 'flex',
                     justifyContent: 'center',
                     alignItems: 'center',
                  }}
               >
                  <CircularProgress size={80} sx={{ color: 'primary.main' }} />
               </Box>
            ) : (
               <>
                  {!checkAlert ? (
                     alertsUpdateUser()
                  ) : (
                     <>
                        <DialogTitle
                           sx={{ color: 'primary.main', textAlign: 'center' }}
                           id="alert-dialog-title"
                        >
                  ¿Estas seguro que quieres realizar los cambios?
                        </DialogTitle>
                        <DialogContent>
                           <DialogContentText
                              sx={{ textAlign: 'center' }}
                              id="alert-dialog-description"
                           >
                              <InfoIcon sx={{ fontSize: 70 }} />
                           </DialogContentText>
                        </DialogContent>
                     </>
                  )}
               </>
            )}

            <DialogActions>
               { !loadingAlert && renderButtons()  }
            </DialogActions>
         </Dialog>
      </>
   );
}
