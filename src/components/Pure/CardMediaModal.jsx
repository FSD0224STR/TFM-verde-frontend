import React, { useState } from 'react';
import { Card, CardMedia, Modal, Backdrop, Fade } from '@mui/material';

export const CarMediaModal = () => {
   const [open, setOpen] = useState(false);

   const handleOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   return (
      <div>
         <Card>
            {/* Envuelve la CardMedia en un componente clickable */}
            <div onClick={handleOpen}>
               <CardMedia
                  component="img"
                  height="50%"
                  image="https://goandance-images.imgix.net/events/cartel-full/6619-taller-de-bachata-en-xen-dance-space-molins-de-rei-20231231130807.jpg?disabled=&w=590"
                  alt="Imagen"
               />
            </div>
         </Card>

         {/* Modal que se muestra al hacer clic en la imagen */}
         <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            backdropComponent={Backdrop}
            backdropProps={{
               timeout: 5,
            }}
         >
            <Fade in={open}>
               <div>
                  <img src="https://goandance-images.imgix.net/events/cartel-full/6619-taller-de-bachata-en-xen-dance-space-molins-de-rei-20231231130807.jpg?disabled=&w=590" alt="Imagen" />
               </div>
            </Fade>
         </Modal>
      </div>
   );
};
