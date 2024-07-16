import {Card,CardMedia, CardContent,Typography,Button, Box} from '@mui/material';

import RoleComponent from './RoleComponent';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/userContext';
import { useEffect } from 'react';
import unavailableimage from '../../img/unavailable-image.jpg'

export default function User({ userApi }) {
   const { getUserDetail,getOneUser} = useContext(UserContext);
   const[userInfo,setUserInfo]=useState({})
    
   const { 
      _id,
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
   } = userInfo

   const getUser=async ()=>{
      const user=await getOneUser(userApi)
      setUserInfo(user)
  
   }
   useEffect( ()=>{

      getUser()

   },[])
   return (
      
      <Card
         sx={{
            transitionDuration: '2s',
            minWidth: 300,
            position:'relative',
            minHeight: 500,
            boxShadow: '5',
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
                     color:'white'
                  }}
               >
                  {name} {subName}
               </Typography>
               <Typography
                  sx={{
                     fontSize: '1.1rem',
                     fontWeight: 'bold',
                     color:'white'
                  }}
               >
              ({gender === 'Male' ? 'M' : 'F'}/{age}){city}
               </Typography>
            </Box>
            <Box position="static">
               <CardMedia
                  component="img"
                  title="Profile picture"
                  /*    {photoURL[0] ? (photoURL[0]):( unavailableimage)} */
                  src={imgProfile ? String(imgProfile) : (unavailableimage)}
                  sx={{
                     width: '100%',
                     height: '300px', 
                     objectFit: 'cover',
                  }}
               />
            </Box>
         </Box>
         <CardContent
            sx={{
               overflow: 'hidden',
               maxHeight: '8rem',
               textOverflow: 'ellipsis'
               
            }}
         >
            <RoleComponent role={role} />
            <Typography variant="body" color="text.secondary" fontSize="1.2rem">
               {description}
            </Typography>
         </CardContent>
         <Box
            display="flex"
            sx={{ width: '100%', justifyContent: 'center', padding: '0.5rem',position:'absolute'}}
         >
            
            <Button
               onClick={() => getUserDetail(_id)}
               size="medium"
               sx={{
                  position: 'relative',
                  padding: '0.5rem',
                  mb: '1rem',
                  maxWidth: '90%',
                  bgcolor: 'primary.main',
                  color: 'white',
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
       
         </Box>
      </Card>
      
   );
}
