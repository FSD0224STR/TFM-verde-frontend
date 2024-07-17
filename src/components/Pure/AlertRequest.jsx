import { Alert } from '@mui/material'
import { MessagesContext } from '../../context/messagesContext'
import { useContext } from 'react'
import { UserContext } from '../../context/userContext'

export default function AlertRequest() {
   const { alertRequest } = useContext(MessagesContext)
   const {userDetail} = useContext(UserContext)
   const alertControl = () => {
      if (alertRequest === true) {

         return (
                
            <Alert variant="filled" severity="success" sx={{textAlign:'center',fontSize:'1.2rem'}}>
            Has enviado una invitación correctamente a {userDetail.name}
            </Alert>
         )
      }
      if(alertRequest === false) {
         return (
            <Alert variant="filled" severity="warning"  sx={{textAlign:'center'}}>
                    No se ha podido realizar la invitacion Intentalo más tarde
            </Alert>
         )
      }
   }

   return (
      <div>
         {alertControl()}
      </div>
   )
}
