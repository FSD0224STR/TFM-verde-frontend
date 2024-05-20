import {
   Avatar,
   Box,
   Typography,
   TextField,
   Button,
   IconButton,
} from '@mui/material';
import React from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

export default function ComponentMessage({ setOpenMessage }) {
    
   //    const handleCloseMessage = () => {
   //       setOpenMessage(false)
   //    }

   return (
      <Box
         component="section"
         bgcolor="#b3e6e2"
         border={1}
         borderColor="primary.main"
         sx={{
            width: '736px',
            minHeight: '640px',
            display: 'flex',
            mt: '1rem',
            flexDirection: 'column',
         }}
      >
         <Box width="100%" display="flex" p={1}>
            <Box display="flex" flexGrow={1}>
               <Avatar
                  sx={{ width: '40px', height: '40px' }}
                  alt="Maria Sanchez"
                  src="../../assets/1.jpg"
               />

               <Typography
                  color="primary.main"
                  variant="h6"
                  sx={{ flexGrow: 1 }}
                  ml="1rem"
               >
            Maria Sanchez
               </Typography>
            </Box>
            <Box display="flex" minWidth="auto">
               <IconButton onClick={()=>setOpenMessage(false)}>
                  <CancelIcon
                     color="primary"
                     sx={{ mr: '0.5rem', fontSize: '2rem' }}
                  />
               </IconButton>
               <IconButton>
                  <DeleteIcon color="primary" sx={{ fontSize: '2rem' }} />
               </IconButton>
            </Box>
         </Box>
         <Box flexGrow={1}>
            <p>hola</p>
         </Box>
         <Box display="flex" m="1rem">
            <Avatar
               sx={{ width: '40px', height: '40px', mr: '1rem', mt: '0.3rem' }}
               alt="Joao Victor"
               src="https://reqres.in/img/faces/8-image.jpg"
            />
            <TextField
               id="outlined-textarea"
               label="Ecribe un mensaje"
               placeholder="escribe un mensaje "
               multiline
               fullWidth
               sx={{ mr: '1rem', width: '100%' }}
            />
            <Button
               sx={{ px: '2rem', py: '1rem' }}
               variant="contained"
               endIcon={<SendIcon />}
            >
          Send
            </Button>
         </Box>
      </Box>
   );
}
