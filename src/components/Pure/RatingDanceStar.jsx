
import { styled } from '@mui/material/styles';
import { Box, Rating,Typography } from '@mui/material';

export default function RatingDanceStar() {
    
   const GridContainer = styled(Box)({
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '16px', // Ajusta el espacio entre elementos como desees
      width: '200px',
      margin: '0 auto',
   });

   const listDance = [
      {
         name: 'Bachata',
         preferNumber: 2
      },
      {
         name: 'Bolero',
         preferNumber: 4
      },
      {
         name: 'Cumbia',
         preferNumber: 5
      },
      {
         name: 'Salsa',
         preferNumber: 3
      }
   ]

   return (
      <>
         {listDance.map((dance,index) => ( 
           
            <GridContainer key={index}>
               <Box  display='flex' flexDirection='column' alignItems='center'>
                  <Typography component="legend" color='text.secondary' fontWeight='bold'>{dance.name}</Typography>
                  <Rating name="read-only" value={dance.preferNumber} readOnly />
               </Box>
            </GridContainer>
           
         ))}
      </>
   )
}
