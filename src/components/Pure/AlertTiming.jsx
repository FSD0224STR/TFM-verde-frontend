import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';

export const AlertTiming = ({ success, error,onClose }) => {
   const [open, setOpen] = useState(false);
   const [message, setMessage] = useState('');
   const [severity, setSeverity] = useState('success');

   useEffect(() => {
      if (success) {
         setMessage(success);
         setSeverity('success');
         setOpen(true);
      } else if (error) {
         setMessage(error);
         setSeverity('error');
         setOpen(true);
      }

      if (success || error) {
         const timer = setTimeout(() => {
            setOpen(false);
         }, 1500); 

         return () => clearTimeout(timer); 
      }
   }, [success, error]);

   return (
      <Collapse in={open}>
         <Alert
            onClose={() => {setOpen(false),onClose}}
            severity={severity}
         >
            {message}
         </Alert>
      </Collapse>
   );
};
