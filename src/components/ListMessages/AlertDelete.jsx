import  { useContext, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InfoIcon from '@mui/icons-material/Info';
import CheckIcon from '@mui/icons-material/Check';
import { Alert } from '@mui/material';

export default function AlertDelete({alertStatusDelete,openAlert,handleClose,handleResetStatus,deleteMyConversation}) {

   const alertsUpdateUser = () => {
      if (alertStatusDelete) {
         return (
            <DialogContent>
               <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            Se ha elimando correctamente la conversación
               </Alert>
            </DialogContent>

         )
      } else {
         return (
            <DialogContent>
               <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
            No se ha podido la Conversación
               </Alert>
            </DialogContent>
         )
      }
   }

   return (
      <>

         <Dialog
            open={openAlert}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
         >
            {alertStatusDelete === true || false ?
               alertsUpdateUser() :
               <>
                  <DialogTitle sx={{color:'primary.main',textAlign:'center'}} id="alert-dialog-title">
            ¿Estas seguro que quieres eliminar esta conversación?
                  </DialogTitle>
                  <DialogContent>
                     <DialogContentText sx={{textAlign:'center'}} id="alert-dialog-description">
                        <InfoIcon sx={{ fontSize: 70 }} />
                       
                     </DialogContentText>
                  </DialogContent>
               </>} 
            <DialogActions>
               {alertStatusDelete === true || false ?
                  
                  <Button sx={{ ':hover': { color: 'text.primary', bgcolor: 'error.main' } }} onClick={handleResetStatus}>Cerrar</Button>
                  
                  : 
                  <>
                     <Button sx={{':hover':{color:'text.primary',bgcolor:'error.main'}}} onClick={handleClose}>Cancelar</Button>
                     <Button sx={{':hover':{color:'text.primary',bgcolor:'success.main'}}} onClick={deleteMyConversation} autoFocus>
                     Confirmar
                     </Button>
                  </>
               }
            </DialogActions>
         </Dialog>
      </>
   )
}
