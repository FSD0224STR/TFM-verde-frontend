import userAPI from '../apiServices/usersApi';
import { useState,useEffect } from 'react'
import User from '../components/pure/User';
import { Grid,Box, Typography } from '@mui/material';
export default function ProfileList() {

   const [users, setUsers] = useState([])

   useEffect(() => {
      console.log('entrando en el useEffect')
      getUsers()

   }, []);

   const getUsers = () => {
      userAPI.ListOfInterestedUsers()
         .then(allUsers => setUsers(allUsers))
         .catch(err => alert('Ha ocurrido el siguiente error: ' + err.message))
   }

   return (
      <Box width='100%' display='flex' flexDirection='column' alignContent='center'justifyContent='center' alignItems='center' margin='1rem'>
         <Typography textAlign="center" variant='h2' mb="1rem">Lista de interesados</Typography>
         <Grid container display='flex' maxWidth="90%" alignContent='center' spacing={2} columnSpacing={1} ml='2rem'>
            {users.map((user) => (
               <Grid item  key={user.id}  xs={12} sm={6} md={4} lg={3} >
                  <User
                     userApi={user} />
               </Grid>

            ))}
         </Grid>
      </Box>
   )
}
