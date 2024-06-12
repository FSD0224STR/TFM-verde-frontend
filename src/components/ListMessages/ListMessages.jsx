
import { Grid, Typography } from '@mui/material'

export default function ListMessages() {
   return (
       
      <Grid container sx={{bgcolor:'white',maxWidth:'90%',minHeight:'100vh',m:'4rem',borderRadius:2}}>
         <Grid  item xs={12} md={4} sx={{bgcolor:'#ddeced',color:'primary.main',borderRadius:2}}>
            <Typography>Listado de chats</Typography>
         </Grid>
         <Grid item  xs={12} md={8} sx={{}} >
           
         </Grid>
      </Grid>
   )
}
