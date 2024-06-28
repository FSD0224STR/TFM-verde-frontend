import { Box,Typography,Slider } from '@mui/material'
import React from 'react'

export default function SliderRating({handleSliderChange,values,dancingStyles}) {
   function nameSlider() {
      return 'Estilos de baile';
   }
   return (
      <>
         {dancingStyles.map((styleItem, index) => (
            <Box  mb="0.5rem" key={styleItem.style}>
               <Typography
                  sx={{ color: 'text.secondary', fontSize: '1.2rem' }}
               >
                  {styleItem.style}
               </Typography>
               <Slider
                  aria-label={styleItem.style}
                  defaultValue={1}
                  getAriaValueText={nameSlider}
                  valueLabelDisplay="auto"
                  shiftStep={5}
                  step={1}
                  marks
                  min={1}
                  max={5}
                  sx={{ maxWidth: '100%' }}
                  name="danceStyles"
                
                  value={values.dancingStyles[index].level}
                  onChange={handleSliderChange(index)}
               />
            </Box>
         ))}
      
      </>
   )
}
