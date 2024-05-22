// import userAPI from '../apiServices/usersApi';
import { useContext } from 'react'
import User from '../components/pure/User';
import { Grid,Box, Typography,Paper} from '@mui/material';
import NavBar from '../components/NavBar/NavBar';
import { UserContext } from '../context/userContext';

export default function ProfileList() {

   // const [users, setUsers] = useState([])

   // useEffect(() => {
   //    getUsers()

   // }, []);

   // const getUsers = async () => {
   //    try {
   //       const allUsers = await userAPI.ListOfInterestedUsers();
   //       setUsers(allUsers);
   //    } catch (err) {
   //       alert('Ha ocurrido el siguiente error: ' + err.message);
   //    }
   // }
   
   const {users} = useContext(UserContext)
   
   return (
      <>
         <NavBar/>
         <Paper square={false} sx={{maxWidth:'90%', m:'3rem', pb:'2rem'}}>
            <Typography textAlign="center" variant='h2'  my="3rem" color='text.secondary'>Lista de interesados</Typography>
            <Box width='100%' display='flex' flexDirection='column'justifyContent='center' alignItems='center'>
               <Grid container  maxWidth="92%" justifyContent='center' spacing={4}  >
                  {users.map((user,index) => (
                     <Grid item key={index} display='flex' justifyContent='center'  xs={12} sm={6} md={4} lg={3} >
                        <User
                           userApi={user} />
                     </Grid>
                  ))}
               </Grid>
            </Box>
         </Paper>
      </>
   )
}
