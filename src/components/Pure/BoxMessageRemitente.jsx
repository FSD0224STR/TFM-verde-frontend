
import {
   Avatar,
   Box,
   Typography,
} from '@mui/material';

export default function BoxMessageRemitente({msg}) {
   return (
      <>
         <Box display='flex' justifyContent='flex-end' >
            <Box display='flex' m='1rem'  p='1rem' bgcolor="white" width="60%" borderRadius={2}>
               <Avatar
                  sx={{ width: '40px', height: '40px', mr: '0.3rem', mt: '0.3rem' }}
                  alt="Joao Victor"
                  src="https://reqres.in/img/faces/8-image.jpg"
               />
               <Typography
                  color="text.secondary"
                  sx={{ fontSize: '1rem', fontWeight: '600', ml: '1rem' }}
               >
                  {msg}
        
               </Typography>
            </Box>
         </Box>
      </>
   )
}
