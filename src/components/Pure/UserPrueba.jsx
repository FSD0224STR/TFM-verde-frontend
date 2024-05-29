import {
   Card,
   CardMedia,
   CardContent,
   Typography,
   CardActions,
   Button,
   Box,
   Chip,
   Stack,
} from '@mui/material';
// import { useNavigate } from 'react-router-dom';
import RoleComponent from './RoleComponent';

export default function UserPrueba() {
   return (
      <div>
         <Card
            sx={{
               transitionDuration: '2s',
               maxWidth: 250,
               minWidth: 250,
               maxHeight: 600,
               boxShadow: '5',
               position: 'relative',
               '&:hover': {
                  transition: ' all 1s ease-in-out',
                  transform: 'scale(1.05)',
               },
            }}
         >
            <Box sx={{ position: 'relative' }}>
               <Box
                  component="div"
                  sx={{ position: 'absolute', top: '80%', ml: '0.5rem' }}
               >
                  <Typography
                     variant="h5"
                     sx={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                     }}
                  >
              Piter Anguila
                  </Typography>
                  <Typography
                     sx={{
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                     }}
                  >
              (M/28)Madrid
                  </Typography>
               </Box>
               <Box position="static">
                  <CardMedia
                     component="img"
                     title="Profile picture"
                     src="https://reqres.in/img/faces/5-image.jpg"
                     sx={{
                        width: '100%',
                        height: '300px', // Set the desired height
                        objectFit: 'cover', // Adjust the object fit as needed
                     }}
                  />
               </Box>
            </Box>
            <CardContent
               sx={{
                  overflow: 'hidden',
                  maxHeight: '8rem', // Altura para 3 líneas de texto max
               }}
            >
               <RoleComponent role={'Follower'} />
               <Typography variant="body" color="text.secondary" fontSize="1.2rem">
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas atque
                     explicabo, rerum harum, maxime dicta soluta debitis, excepturi vitae
                     alias perspiciatis fuga expedita iure laboriosam nisi voluptate
                     magni ut veniam.
               </Typography>
            </CardContent>
            <Box
               display="flex"
               sx={{ width: '100%', justifyContent: 'center', padding: '0.5rem' }}
            >
               {/* <CardActions>
                  <Button
                     size="medium"
                     sx={{
                        position: 'relative',
                        padding: '0.5rem',
                        mb: '1rem',
                        maxWidth: '100%',
                        width: '100%',
                        bgcolor: 'primary.main',
                        color: 'text.primary',
                        display: 'flex',
                        alignItems: 'center',
                        px: '1rem',
                        '&:hover': {
                           '& .MuiTypography-root': {
                              color: 'text.secondary',
                           },
                           backgroundColor: 'background.nav',
                        },
                     }}
                  >
              Perfil completo
                  </Button>
               </CardActions> */}
            </Box>
         </Card>
      </div>
   );
}
