import { Avatar, Box, Typography } from '@mui/material';
import { useContext } from 'react';
import { LoginContextP } from '../../context/loginContextPrueba';

export default function BoxMessageRemitente({ msg }) {
   const {profileDetails} = useContext(LoginContextP)
   return (
      <>
         <Box display="flex" justifyContent="flex-end">
            <Box
               display="flex"
               m="1rem"
               p="1rem"
               bgcolor="white"
               maxWidth="90%"
               borderRadius={2}
            >
               <Avatar
                  sx={{ width: '40px', height: '40px', mr: '0.3rem', mt: '0.3rem' }}
                  alt="Joao Victor"
                  src={profileDetails.imgProfile}
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
   );
}
