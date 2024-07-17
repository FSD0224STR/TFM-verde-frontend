
import { Avatar } from '@mui/material';

export default function AvatarComponentEvent({imgProfile}) {
   
   return (

      <Avatar src={imgProfile} sx={{ width: 60, height: 60, bgcolor: ' background.avatar' }} />
  
   )
}
