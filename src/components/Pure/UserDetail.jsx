import {
   Grid,
   Paper,
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
} from '@mui/material';
import { main_theme } from '../../../palette-theme-colors';
import fotoDefault from '../../assets/fotoDefault.jpg';
import RatingDance from './RatingDance';
import RoleComponent from './RoleComponent';

export default function UserDetail() {
   const roleDefault = 'Leader'
   return (
      <ThemeProvider theme={main_theme}>
         <Container sx={{ mt: '4rem' }}>
            <Card sx={{ maxWidth: '800px' }}>
               <CardContent sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                  <CardContent sx={{display:'flex', flexDirection:'column'}}>
                     <Typography color="primary.main" mb="1rem" fontSize="1.5rem" fontWeight='600'>
                        {' '}
                Tipos de Bailes según preferencia:
                     </Typography>
                     <CardContent sx={{maxHeight:'200px',display:'grid',gridTemplateColumns: 'repeat(2, 1fr)',}}>
                        <RatingDance /> 
                     </CardContent>
                     <CardContent>
                        <Typography variant='h3'color='primary.main' fontWeight='600' mt='1rem'>
                             ¿Empezarás la conversación ?
                        </Typography>
                        <Typography variant='body1'color='primary.main' fontWeight='400' mt='1rem'>
                               Alguien debe dar el primer paso, ¿correcto?
                        </Typography>
                               
                        <CardActions>
                           <Button size="small">Empieza una conversación</Button>
                 
                        </CardActions>
                        <Divider sx={{ color: 'primary.main', mt: '2rem' }}>o</Divider>
                        <CardActions>
                           <Button size="small">Choca los Cinco</Button>
                        </CardActions>
                     </CardContent>
                  </CardContent>
                  <CardContent sx={{ maxWidth: '300px' }}>
                     <CardMedia
                        sx={{ MaxWidth: '300px' }}
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
                Maria 
                        <RoleComponent role={roleDefault} />
                     </Typography>
                     <Typography variant='h5' fontSize='1.3rem' fontWeight='bold' color="primary.main">Sobre mi</Typography>
                     <Typography
                        variant="body2"
                        fontSize="1.2rem"
                        color="text.secondary"
                     >
                Soy una chica de 28 años de madrid y me gustaría encontrar una
                pareja de baile de bachata con la que practicar y sacar lo mejor
                de nosotros en esta disciplina
                     </Typography>
                  </CardContent>
               </CardContent>
            </Card>
         </Container>
      </ThemeProvider>
   );
}
