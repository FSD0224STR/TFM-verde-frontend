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
   IconButton,
   Tooltip
} from '@mui/material';
import { main_theme } from '../../../palette-theme-colors';
import RoleComponent from './RoleComponent';
import RatingDanceStar from './RatingDanceStar';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import ComponentMessage from './ComponentMessage';
import CancelIcon from '@mui/icons-material/Cancel';
import { MessagesContext } from '../../context/messagesContext';

export default function ComponentUserDetail({ userDetail }) {

   const {openMessage,openConversation,setOpenMessage} = useContext(MessagesContext)

   const navigate = useNavigate()

   const {
      name,
      subName,
      description,
      gender,
      role,
      city,
      status,
      rating,
      age,
      imgProfile,
      dancingStyles
   } = userDetail

   return (
      <ThemeProvider theme={main_theme}>
         <Container sx={{my: '4rem' }}>
            <Card sx={{ maxWidth: '1200px', minHeight: '700px' }}>
             
               <CardContent sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
          
                  {openMessage ?
                     <ComponentMessage setOpenMessage={setOpenMessage} /> :
                     <>
                        <Box sx={{ position: 'absolute' }}>
                           <Tooltip title="Volver a perfiles interesados">
                              <IconButton onClick={() => navigate(-1)}>
                                 <CancelIcon
                                    color="primary"
                                    sx={{ mr: '0.5rem', fontSize: '2rem' }}
                                 />
                              </IconButton>
                           </Tooltip>
                        </Box>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', }}>
                           <Typography
                              color="primary.main"
                              mb="1rem"
                              fontSize="1.5rem"
                              fontWeight="600"
                              ml='1rem'
                           >
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
                              <RatingDanceStar dancingStyles={dancingStyles} />
                           </CardContent>
                           <CardContent sx={{display:'flex',alignItems:'center',flexDirection:'column'}}>
                              <Typography
                                 variant="h3"
                                 color="primary.main"
                                 fontWeight="600"
                                 mt="1rem"
                                 textAlign='center'
                                 fontSize='2.7rem'
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
                                 <Button onClick={openConversation} size="large" variant='contained'  sx={{my:'1rem', p:'1rem'}}>Empieza una conversación</Button>
                              </CardActions>
                              <Divider variant='fullWidth' flexItem={true} sx={{ color: 'primary.main', mt: '1rem' }}>o</Divider>
                              <CardActions>
                                 <Button size="large" variant='contained' sx={{ mt: '2rem', p: '1rem' }}>Invita a {name} a Bailar!</Button>
                              </CardActions>
                           </CardContent>
                        </CardContent>
                     </>}
                 
                  <CardContent  sx={{maxWidth:'400px', display:{xs:'none',sm:'block'},mr:'3.5rem'}} >
                     <CardMedia
                        sx={{ MaxWidth: '300px', MaxHeight: '300px', margin:'auto'}}
                        component="img"
                        alt="Foto Perfil"
                        height="300px"
                        src={!imgProfile? 'https://via.placeholder.com/250'  : imgProfile}
                     />
                     <Typography
                        color="primary.main"
                        variant="h5"
                        component="div"
                        sx={{ my: '1rem',mr:'0.5rem', fontSize: '2rem', fontWeight: 'bold' }}
                     >
                        {name}{' '}{subName}
                     </Typography>
                     <Box
                        component="span"
                        sx={{ fontSize: '1.2rem', fontWeight: 'bold',color:'secondary.variante' }}
                     >
                          ({gender === 'Male' ? 'M' : 'F'}/{age}){city}
                     </Box>
                     <Box>
                        <Box display='flex' flexDirection='row-reverse' justifyContent='left' my='0.5rem'>
                           <Link> <Typography fontSize='1rem' variant='body2' color='text.secondary' mt='0.2rem' ml='1rem'>Reseña</Typography></Link>
                           <Rating name="read-only" value={4} readOnly />
                        </Box>
                        <RoleComponent role={role} />
                     </Box>
                  
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
                        sx={{ overflowWrap: 'break-word' }}
                     >
                        {description}
                     </Typography>
                  </CardContent>
               </CardContent>
            </Card>
         </Container>
      </ThemeProvider>
   );
}
