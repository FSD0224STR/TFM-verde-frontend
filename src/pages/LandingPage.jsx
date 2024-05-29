import { motion } from 'framer-motion';
import NavBar from '../components/NavBar/NavBar';
import FullPage, {
   FullPageSections,
   FullpageSection,
   FullpageNavigation,
} from '@ap.cx/react-fullpage';
import { useInView } from 'react-intersection-observer';
import landingFondo from '../img/landingFondosm.png';
import mapIcons from './../img/mapIcons.png';
import { Box, Button, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import UserPrueba from '../components/Pure/UserPrueba';
export default function LandingPage() {
   const [ref, inView] = useInView({
      triggerOnce: true, // La animación se activa una vez
      threshold: 0.1, // El umbral de visibilidad para activar la animación
   });

   const SectionStyle = {
      height: '100vh',
      maxWidth: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
   };

   const motionVariants = {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
   };

   const userVariants = {
      hidden: { opacity: 0, x: 100 },
      visible: { opacity: 1, x: 0 },
   };

   const textVariants = {
      hidden: { opacity: 0, x: -100 },
      visible: { opacity: 1, x: 200 },
   };
   return (
      <>
         <FullPage>
            <NavBar />
            <FullPageSections>
               <FullpageSection
                  style={{
                     backgroundImage: `url(${landingFondo})`,
                     backgroundSize: 'cover',
                  }}
               >
                  <motion.div
                     initial="hidden"
                     animate="visible"
                     variants={motionVariants}
                     transition={{ duration: 3 }}
                  >
                     <Box
                        sx={{
                           height: '100vh',
                           width: '100%',
                           display: 'flex',
                           justifyContent: 'center',
                           alignItems: 'center',
                           flexDirection: 'column',
                        }}
                     >
                        <Typography
                           component="h2"
                           sx={{ fontSize: '4rem', fontWeight: 'bold', mt: '15rem' }}
                        >
                           {' '}
                  Juntos somos más{' '}
                        </Typography>
                        <Typography
                           component="h6"
                           sx={{ fontSize: '2rem', mb: '4rem' }}
                        >
                  La página para encontrar pareja de baile en España{' '}
                        </Typography>
                        <Button
                           component={NavLink}
                           to={'/register'}
                           variant="contained"
                           sx={{
                              bgcolor: 'secondary.variante',
                              borderRadius: 4,
                              p: 2,
                              px: 6,
                           }}
                        >
                  Encuentra tu pareja!
                        </Button>
                     </Box>
                  </motion.div>
               </FullpageSection>
               <FullpageSection>
                  <Box
                     sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                        maxWidth: '100%',
                     }}
                  >
                     <motion.div
                        initial="hidden"
                        animate={inView ? 'visible' : 'hidden'}
                        variants={textVariants}
                        transition={{ duration: 2 }}
                        ref={ref}
                     >
                        <Box sx={{ maxWidth: '70%', textAlign: 'center' }}>
                           <Typography
                              component="h2"
                              sx={{ fontSize: '2.5rem', fontWeight: 'bold', mt: '8rem' }}
                           >
                    En España hay mucha gente buscando parejas para practicar
                    diversos Tipos de baile.
                           </Typography>
                        </Box>
                     </motion.div>
                     <motion.div
                        initial="hidden"
                        animate={inView ? 'visible' : 'hidden'}
                        variants={userVariants}
                        transition={{ duration: 2 }}
                        ref={ref}
                     >
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                           <Box
                              sx={{
                                 display: 'flex',
                                 gap: 4,
                                 m: '3rem',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                              }}
                           >
                              <UserPrueba />
                              <UserPrueba />
                              <UserPrueba />
                              <UserPrueba />
                           </Box>
                           <Button
                              component={NavLink}
                              to={'/register'}
                              variant="contained"
                              sx={{
                                 color: 'text.primary',
                                 mb: '3rem',
                                 p: '1rem',
                                 ':hover': {
                                    color: 'text.primary',
                                    bgcolor: 'secondary.variante',
                                    border: 'none',
                                 },
                              }}
                           >
                    ¿Quieres ver mas miembros?
                           </Button>
                        </Box>
                     </motion.div>
                  </Box>
               </FullpageSection>
               <FullpageSection style={{ ...SectionStyle,flexDirection:'row',gap:'2rem' }}>
                  <Box sx={{}}>
                     <img src={mapIcons} alt="maps" width="400px" />
                  </Box>
                  <Box sx={{maxWidth:'50%'}}>
                     <Typography sx={{fontSize:'2rem',ml:'2rem'}}>
                        En <Box component='span' sx={{fontFamily:'Dancing Script',fontSize:'3rem'}}>MeetDancig</Box> podrás encontrar los mejores centros de baile ya
                sea en Madrid o Barcelona.Nos encargarmos de encontrar el centro
                baile que mejor encaje contigo y con tus preferencias.
                     </Typography>

                  </Box>
               </FullpageSection>
            </FullPageSections>
         </FullPage>
      </>
   );
}
