
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { styled } from '@mui/material/styles';
import { Box, Rating,Typography } from '@mui/material';

export default function RatingDance() {
    
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

   const StyledRating = styled(Rating)({
      '& .MuiRating-iconFilled': {
         color: '#ff6d75',
      },
      '& .MuiRating-iconHover': {
         color: '#ff3d47',
      },
   });
  
   return (
      <>
         {listDance.map((dance,index) => ( 
            <>
               <GridContainer>
                  <Box key={index} display='flex' flexDirection='column' alignItems='center'>
                     <Typography component="legend" color='text.secondary' fontWeight='bold'>{dance.name}</Typography>
                     <StyledRating
                        name="customized-color"
                        defaultValue={dance.preferNumber}
                        // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        readOnly
                        precision={0.5}
                        icon={<FavoriteIcon fontSize="inherit" />}
                        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                     />
                  </Box>
               </GridContainer>
            </>
         ))}
      </>
   )
}
