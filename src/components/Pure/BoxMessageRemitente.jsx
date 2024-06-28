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
               bgcolor='#7BE6A8'
               maxWidth="90%"
               borderRadius={2}
            >
               <Avatar
                  sx={{ width: '40px', height: '40px', mr: '0.3rem', mt: '0.3rem' }}
                  alt="Joao Victor"
                  src={profileDetails.imgProfile}
               />
               <Typography
                  color="text.main"
                  sx={{ color:'text.terciary', fontSize: '1.3rem', fontWeight: '600', ml: '1rem',wordBreak:'break-word', overflowWrap: 'break-word',whiteSpace: 'normal',mt:'0.4rem'}}
               >
                  {msg}
               </Typography>
            </Box>
         </Box>
      </>
   );
}
