import React from 'react'
import {
   Avatar,
   Box,
   Typography,
} from '@mui/material';
import AvatarMaria from '../../assets/1.jpg';

export default function BoxMessageDestinatario({msg}) {
   return (
      <>
         <Box display='flex'>
            <Box display='flex'ml='1.5rem' mb='0.5rem'  p='1rem' maxWidth='90%' bgcolor="white" borderRadius={2}>
               <Avatar
                  sx={{ width: '40px', height: '40px' }}
                  alt="Maria Sanchez"
                  src={AvatarMaria}
               />
               <Typography
                  color="text.secondary"
                  sx={{ fontSize: '1rem', fontWeight: '600', ml: '1rem',wordBreak:'break-word', overflowWrap: 'break-word',whiteSpace: 'normal'}}
               >
                  {msg}
        
               </Typography>
            </Box>
         </Box>
      </>
   )
}
