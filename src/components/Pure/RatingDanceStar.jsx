
import { styled } from '@mui/material/styles';
import { Box, Rating,Typography } from '@mui/material';

export default function RatingDanceStar({dancingStyles}) {
    
   const GridContainer = styled(Box)({
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '16px', // Ajusta el espacio entre elementos como desees
      width: '200px',
      margin: '0 auto',
   });

   return (
      <>
         {dancingStyles.map((dance,index) => ( 
           
            <GridContainer key={index}>
               <Box  display='flex' flexDirection='column' alignItems='center'>
                  <Typography component="legend" color='text.secondary' fontWeight='bold'>{dance.style}</Typography>
                  <Rating name="read-only" value={dance.level} readOnly />
               </Box>
            </GridContainer>
   
         ))}
      </>
   )
}
