import  { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InfoIcon from '@mui/icons-material/Info';
import CheckIcon from '@mui/icons-material/Check';
import { Alert } from '@mui/material';

export default function AlertDialog({ openDialog, handleClose, handleConfirmSubmit,alertStatus,handleResetStatus }) {
    
   const alertsUpdateUser = () => {
      if (alertStatus) {
         return (
            <DialogContent>
               <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            Los cambios se han realizados correctamente 
               </Alert>
            </DialogContent>

         )
      } else {
         return (
            <DialogContent>
               <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
            No se ha podido realizar los cambios. Intentalo mas tarde
               </Alert>
            </DialogContent>
         )
      }
   }

   return (
      <>

         <Dialog
            open={openDialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
         >
            {alertStatus === true || false ?
               alertsUpdateUser() :
               <>
                  <DialogTitle sx={{color:'primary.main',textAlign:'center'}} id="alert-dialog-title">
            ¿Estas seguro que quieres realizar los cambios?
                  </DialogTitle>
                  <DialogContent>
                     <DialogContentText sx={{textAlign:'center'}} id="alert-dialog-description">
                        <InfoIcon sx={{ fontSize: 70 }} />
                       
                     </DialogContentText>
                  </DialogContent>
               </>} 
            <DialogActions>
               {alertStatus === true || false ?
                  <Button sx={{ ':hover': { color: 'text.primary', bgcolor: 'error.main' } }} onClick={handleResetStatus}>Cerrar</Button> : 
                  <>
                     <Button sx={{':hover':{color:'text.primary',bgcolor:'error.main'}}} onClick={handleClose}>Cancelar</Button>
                     <Button sx={{':hover':{color:'text.primary',bgcolor:'success.main'}}} onClick={handleConfirmSubmit} autoFocus>
                     Confirmar
                     </Button>
                  </>
               }
            </DialogActions>
         </Dialog>
      </>
   )
}
