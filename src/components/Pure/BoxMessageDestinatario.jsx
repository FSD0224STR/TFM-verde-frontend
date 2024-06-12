import  { useContext } from 'react'
import {
   Avatar,
   Box,
   Typography,
} from '@mui/material';
import { UserContext } from '../../context/userContext';

export default function BoxMessageDestinatario({msg}) {
   const { userDetail } = useContext(UserContext)
   return (
      <>
         <Box display='flex'>
            <Box display='flex'ml='1.5rem' mb='0.5rem'  p='1rem' maxWidth='90%' bgcolor="white" borderRadius={2}>
               <Avatar
                  sx={{ width: '40px', height: '40px' }}
                  alt="Maria Sanchez"
                  src={userDetail.imgProfile}
               />
               <Typography
                  color="text.secondary"
                  sx={{ fontSize: '1.3rem', fontWeight: '600', ml: '1rem',wordBreak:'break-word', overflowWrap: 'break-word',whiteSpace: 'normal',mt:'0.4rem'}}
               >
                  {msg}
        
               </Typography>
            </Box>
         </Box>
      </>
   )
}
