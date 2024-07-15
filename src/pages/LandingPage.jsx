import { motion } from 'framer-motion';
import NavBar from '../components/NavBar/NavBar';

import FullPage, {
   FullPageSections,
   FullpageSection,
   FullpageNavigation,
} from '@ap.cx/react-fullpage';
import { useInView } from 'react-intersection-observer';
import { NavLink } from 'react-router-dom';
import { Avatar, Box, Button, Card, Rating, Typography } from '@mui/material';
import UserPrueba from '../components/Pure/UserPrueba';
import landingFondo from '../img/landingFondosm.png';
import mapIcons from './../img/mapIcons.png';
import aniversario from './../img/aniversario.png';
import mejorVendido from './../img/mejor-vendido.png';
import proteger from './../img/proteger.png';
import fondo2 from './../img/fondo2.png';
export default function LandingPage() {

   const [ref, inView] = useInView({
      triggerOnce: true, // La animación se activa una vez
      threshold: 0.1, // El umbral de visibilidad para activar la animación
   });
   const [ref2, inView2] = useInView({
      triggerOnce: true, // La animación se activa una vez
      threshold: 0.1, // El umbral de visibilidad para activar la animación
   });
   const [ref3, inView3] = useInView({
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
   const textVariants2 = {
      hidden: { opacity: 0, x: -100 },
      visible: { opacity: 1, x: 90 },
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
                           sx={{ fontSize: '4rem', fontWeight: 'bold', mt: '15rem', color: 'text.terciary' }}
                        >
                           {' '}
                           Juntos somos más{' '}
                        </Typography>
                        <Typography
                           component="h6"
                           sx={{ fontSize: '2rem', mb: '4rem', color: 'text.terciary' }}
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
                              sx={{ fontSize: '2.5rem', fontWeight: 'bold', mt: '8rem', color: 'text.terciary' }}
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
                              {/* Usuarios, poner imagen de nuestros usuarios */}
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
                                 color: 'text.terciary',
                                 mb: '3rem',
                                 p: '1rem',
                                 ':hover': {
                                    color: 'text.terciary',
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
               <FullpageSection style={{ ...SectionStyle, marginTop: '4rem' }}>
                  <Box
                     sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '2rem',
                        mt: '4rem',
                     }}
                  >
                     <motion.div
                        initial="hidden"
                        animate={inView2 ? 'visible' : 'hidden'}
                        variants={textVariants2}
                        transition={{ duration: 2 }}
                        ref={ref2}
                     >
                        <Box sx={{ maxWidth: '90%' }}>
                           {/* Ejemplo cambio color */}
                           <Typography sx={{ fontSize: '2rem', ml: '4rem', color: 'primary.main' }}>
                              En{' '}
                              <Box
                                 component="span"
                                 sx={{ fontFamily: 'Dancing Script', fontSize: '3rem', color: 'secondary.variante' }}
                              >
                                 MeetDancig
                              </Box>{' '}
                              podrás encontrar los mejores centros de baile ya sea en
                              Madrid o Barcelona.Nos encargarmos de encontrar el centro de
                              baile que mejor encaje contigo y con tus preferencias.
                           </Typography>
                        </Box>
                     </motion.div>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                     <Box sx={{ display: 'flex' }}>
                        <motion.div
                           initial="hidden"
                           animate={inView2 ? 'visible' : 'hidden'}
                           variants={motionVariants}
                           transition={{ duration: 3 }}
                           ref={ref2}
                        >
                           <Box sx={{ mr: '10rem', mt: '8rem' }}>
                              <img src={mapIcons} alt="maps" width="400px" />
                           </Box>
                        </motion.div>
                        <motion.div
                           initial="hidden"
                           animate={inView2 ? 'visible' : 'hidden'}
                           variants={userVariants}
                           transition={{ duration: 2 }}
                           ref={ref2}
                        >
                           <Box>
                              <Box>
                                 <Typography
                                    component="h2"
                                    sx={{
                                       fontSize: '1.5rem',
                                       fontWeight: 'bold',
                                       m: '1rem',
                                       mr: '8rem',
                                       mt: '2rem',
                                       color: 'text.terciary'
                                    }}
                                 >
                                    Algunos centros:
                                 </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', gap: '2rem' }}>
                                 <UserPrueba />
                                 <UserPrueba />
                                 <UserPrueba />
                              </Box>
                           </Box>
                        </motion.div>
                     </Box>
                  </Box>
               </FullpageSection>
               <FullpageSection
                  style={{ ...SectionStyle, margin: '3rem', padding: '0.8rem' }}
               >
                  <motion.div
                     initial="hidden"
                     animate={inView3 ? 'visible' : 'hidden'}
                     variants={motionVariants}
                     transition={{ duration: 3 }}
                     ref={ref3}
                     style={SectionStyle}
                  >
                     <Typography
                        variant={'h2'}
                        sx={{ fontWeight: 'bold', mb: '4rem', color: 'text.terciary' }}
                     >
                        ¿Porque MeetDancing?
                     </Typography>
                     <Box display={'flex'} sx={{ justifyContent: 'space-between' }}>
                        <Box
                           sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              maxWidth: '25%',
                           }}
                        >
                           <img src={aniversario} alt="10 años" width="200px" />
                           <Typography sx={{ fontSize: '1.5rem', textAlign: 'center', color: 'text.terciary' }}>
                              MeetDancing ha ayudado a la gente a ser más social y activa
                              desde hace más de 10 años. Para conocer gente y hacer
                              amigos. Para tener una vida más sana y divertida. Regístrate
                              y busca a los miembros que estén ubicados más cerca de ti.
                           </Typography>
                        </Box>
                        <Box
                           sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              maxWidth: '25%',
                           }}
                        >
                           <img src={mejorVendido} alt="10 años" width="200px" />
                           <Typography sx={{ fontSize: '1.5rem', textAlign: 'center', color: 'text.terciary' }}>
                              MeetDancing funciona muy bien porque todos los perfiles se
                              revisan manualmente. Como tal, la fiabilidad de los miembros
                              es muy alta. Nuestro equipo de empleados monitoriza de cerca
                              el sitio web diariamente.
                           </Typography>
                        </Box>
                        <Box
                           sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              maxWidth: '25%',
                           }}
                        >
                           <img src={proteger} alt="10 años" width="200px" />
                           <Typography
                              sx={{
                                 fontSize: '1.5rem',
                                 textAlign: 'center',
                                 mt: '0.5rem',
                                 color: 'text.terciary'
                              }}
                           >
                              Tu privacidad es lo primero para nosotros. No tienes que
                              rellenar nada que no sea necesario. Tus datos no se venden y
                              todo el sitio web está fuertemente protegido con un
                              certificado SSL.
                           </Typography>
                        </Box>
                     </Box>
                  </motion.div>
               </FullpageSection>
               <FullpageSection
                  style={{
                     backgroundImage: `url(${fondo2})`,
                     backgroundSize: 'cover',
                  }}
               >
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
                     <Typography
                        variant="h2"
                        sx={{
                           fontSize: '5rem',
                           fontWeight: 'bold',
                           mt: '4rem',
                           lineHeight: '8rem',
                           color: 'text.terciary'
                        }}
                     >
                        Sé activo(a) junto con{' '}
                        <Box
                           component={'span'}
                           sx={{
                              color: 'secondary.variante',
                              fontFamily: 'Dancing Script',
                              fontWeight: 'bold',
                              fontSize: '6rem',
                           }}
                        >
                           MeetDancing
                        </Box>{' '}
                     </Typography>
                     <Typography sx={{ fontSize: '2rem', fontWeight: '600', color: 'text.terciary' }}>
                        ¡Encuentra compañía para practicar tu estilo de baile favorito
                        cerca de ti!
                     </Typography>
                     <Button
                        variant="contained"
                        size="large"
                        sx={{
                           px: '8rem',
                           py: '1rem',
                           borderRadius: 4,
                           mt: '4rem',
                           ':hover': { bgcolor: 'secondary.variante' },
                           fontSize: '1.2rem',
                        }}
                     >
                        Registrate
                     </Button>
                  </Box>
               </FullpageSection>
               {/* 
                  //TODO hacer un componente de las reseñas */}
               <FullpageSection style={SectionStyle}>
                  <Typography variant='h2' sx={{ fontSize: '4rem', fontWeight: 'bold', my: '2rem', pt: '2rem', color: 'text.terciary' }}>¿Qué dicen otros de MeetDancig?</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                     <Card
                        sx={{
                           minWidth: '330px',
                           display: 'flex',
                           flexDirection: 'column',
                           gap: '2rem',
                           justifyContent: 'center',
                           alignItems: 'center',
                           p: '2rem',
                        }}
                     >
                        <Rating name="read-only" value={5} readOnly />
                        <Typography
                           sx={{
                              color: 'text.secondary',
                              fontSize: '1.6rem',
                              fontWeight: 'bold',
                           }}
                        >
                           Excelente
                        </Typography>
                        <Typography
                           sx={{ color: 'text.secondary', fontSize: '1.3rem' }}
                        >
                           Muy buen app
                        </Typography>
                        <Box
                           sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              gap: 2,
                           }}
                        >
                           <Avatar
                              sx={{ width: 56, height: 56 }}
                              alt="Remy Sharp"
                              src="https://reqres.in/img/faces/3-image.jpg"
                           />
                           <Typography sx={{ color: 'text.secondary' }}>
                              Emma Wong
                           </Typography>
                        </Box>
                     </Card>
                     <Card
                        sx={{
                           width: '330px',
                           display: 'flex',
                           flexDirection: 'column',
                           gap: '2rem',
                           alignItems: 'center',
                           p: '2rem',
                        }}
                     >
                        <Rating name="read-only" value={3} readOnly />
                        <Typography
                           sx={{
                              color: 'text.secondary',
                              fontSize: '1.6rem',
                              fontWeight: 'bold',
                              textAlign: 'center',
                           }}
                        >
                           Está muy bien
                        </Typography>
                        <Typography
                           sx={{
                              color: 'text.secondary',
                              fontSize: '1.3rem',
                              textAlign: 'center',
                           }}
                        >
                           Tiene muy buena pinta pero no es para mi.
                        </Typography>
                        <Box
                           sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              gap: 2,
                           }}
                        >
                           <Avatar
                              sx={{ width: 56, height: 56 }}
                              alt="Remy Sharp"
                              src="https://reqres.in/img/faces/1-image.jpg"
                           />
                           <Typography sx={{ color: 'text.secondary' }}>
                              George Bluth
                           </Typography>
                        </Box>
                     </Card>
                     <Card
                        sx={{
                           width: '400px',
                           display: 'flex',
                           flexDirection: 'column',
                           gap: '2rem',
                           justifyContent: 'center',
                           alignItems: 'center',
                           p: '2rem',
                        }}
                     >
                        <Rating name="read-only" value={5} readOnly />
                        <Typography
                           sx={{
                              color: 'text.secondary',
                              fontSize: '1.6rem',
                              fontWeight: 'bold',
                           }}
                        >
                           Una idea magnifica
                        </Typography>
                        <Typography
                           sx={{ color: 'text.secondary', fontSize: '1.3rem', textAlign: 'center' }}
                        >
                           Ya era hora de que hubiera un servicio asi, aun esta muy verde
                           y hay poca gente en mi ciudad, pero todo esta diseñado con
                           mucho gusto y es facil de usar.
                        </Typography>
                        <Box
                           sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              gap: 2,
                           }}
                        >
                           <Avatar
                              sx={{ width: 56, height: 56 }}
                              alt="Remy Sharp"
                              src="https://reqres.in/img/faces/6-image.jpg"
                           />
                           <Typography sx={{ color: 'text.secondary' }}>
                              Tracey Ramos
                           </Typography>
                        </Box>
                     </Card>
                  </Box>
                  <Button
                     variant="contained"
                     size="large"
                     sx={{
                        px: '8rem',
                        py: '1rem',
                        borderRadius: 4,
                        mt: '2rem',
                        ':hover': { bgcolor: 'secondary.variante' },
                        fontSize: '1.2rem',
                     }}
                  >
                     Leer más comentarios
                  </Button>
               </FullpageSection>
            </FullPageSections>
         </FullPage>
      </>
   );
}
