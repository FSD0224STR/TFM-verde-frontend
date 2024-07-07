import React from 'react';
import { Divider, Typography, Box } from '@mui/material';

export const DividerWithText = ({ text }) => {
   return (
      <Box sx={{ display: 'flex', alignItems: 'center', width: '90%' }}>
         <Divider sx={{ flexGrow: 1}} />
         <Typography variant="h4" sx={{ color: 'primary.main', px: 2 }}>
            {text}
         </Typography>
         <Divider sx={{ flexGrow: 1 }} />
      </Box>
   );
};