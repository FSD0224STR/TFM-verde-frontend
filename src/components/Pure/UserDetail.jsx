import {
   Card,
   CardMedia,
   CardContent,
   CardActions,
   Button,
   ThemeProvider,
   Box,
   Typography,
   Container,
   Divider,
   Rating,
} from '@mui/material';
import { main_theme } from '../../../palette-theme-colors';
import fotoDefault from '../../assets/fotoDefault.jpg';
import RoleComponent from './RoleComponent';
import RatingDanceStar from './RatingDanceStar';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ComponentMessage from './ComponentMessage';

export default function UserDetail() {
   const [openMessage, setOpenMessage] = useState(false);
   const roleDefault = 'Leader';
   return (
      <ThemeProvider theme={main_theme}>
         <Container sx={{mt: '4rem' }}>
            <Card sx={{ maxWidth: '1200px',minHeight:'700px' }}>
               <CardContent sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                  {openMessage ?
                     <ComponentMessage setOpenMessage={setOpenMessage} /> :
                     (<CardContent sx={{ display: 'flex', flexDirection: 'column', }}>
                        <Typography
                           color="primary.main"
                           mb="1rem"
                           fontSize="1.5rem"
                           fontWeight="600"
                           ml='1rem'
                        >
                           {' '}
                               Nivel según los tipos de baile:
                        </Typography>
                        <CardContent
                           sx={{
                              maxHeight: '200px',
                              display: 'grid',
                              gridTemplateColumns: 'repeat(2, 1fr)',
                              gap:'1rem'
                           }}
                        >
                           <RatingDanceStar />
                        </CardContent>
                        <CardContent sx={{display:'flex',alignItems:'center',flexDirection:'column'}}>
                           <Typography
                              variant="h3"
                              color="primary.main"
                              fontWeight="600"
                              mt="1rem"
                              textAlign='center'
                           >
                        ¿Empezarás la conversación ?
                           </Typography>
                           <Typography
                              variant="body1"
                              color="primary.main"
                              fontWeight="400"
                              mt="1rem"
                           >
                            Alguien debe dar el primer paso, ¿correcto?
                           </Typography>

                           <CardActions sx={{}}>
                              <Button onClick={()=>setOpenMessage(true)} size="large" variant='contained'  sx={{my:'1rem', p:'1rem'}}>Empieza una conversación</Button>
                           </CardActions>
                           <Divider variant='fullWidth' flexItem={true} sx={{ color: 'primary.main', mt: '1rem' }}>o</Divider>
                           <CardActions>
                              <Button size="large" variant='contained' sx={{mt:'2rem',p:'1rem'}}>Invita a Maria a Bailar!</Button>
                           </CardActions>
                        </CardContent>
                     </CardContent>)}
                 
                  <CardContent  sx={{maxWidth:'400px', display:{xs:'none',sm:'block'}}} >
                     <CardMedia
                        sx={{ MaxWidth: '300px', MaxHeight: '300px', margin:'auto'}}
                        component="img"
                        alt="DefaultImg"
                        height="300px"
                        image={fotoDefault}
                     />
                     <Typography
                        color="primary.main"
                        variant="h5"
                        component="div"
                        sx={{ my: '1rem', fontSize: '2rem', fontWeight: 'bold' }}
                     >
                               Maria{' '} 
                        <Box
                           component="span"
                           sx={{ fontSize: '1.2rem', fontWeight: '400' }}
                        >
                          (F/28),Madrid 
                        </Box>
                        <Box>
                           <Box display='flex' flexDirection='row-reverse' justifyContent='left' my='0.5rem'>
                              <Link> <Typography fontSize='1rem' variant='body2' color='text.secondary' mt='0.2rem' ml='1rem'>Reseña</Typography></Link>
                              <Rating name="read-only" value={4} readOnly />
                           </Box>
                           <RoleComponent role={roleDefault} />
                        </Box>
                        
                     </Typography>
                     <Typography
                        variant="h5"
                        fontSize="1.3rem"
                        fontWeight="bold"
                        color="primary.main"
                     >
                         Sobre mi
                     </Typography>
                     <Typography
                        variant="body2"
                        fontSize="1.2rem"
                        color="text.secondary"
                     >
                        Soy una chica de 28 años de madrid y me gustaría encontrar una
                        pareja de baile de bachata con la que practicar y sacar lo mejor
                        de nosotros en esta disciplina.
                     </Typography>
                  </CardContent>
               </CardContent>
            </Card>
         </Container>
      </ThemeProvider>
   );
}
