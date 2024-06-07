import { AppBar, Box, Button, Toolbar } from '@mui/material'

export default function NavSettings({handleSwitchNav,handleNavProfile}) {
   return (
      <Box sx={{mb:'2rem'}}>

         <AppBar sx={{position:'absolute',top:97}}>
            <Toolbar sx={{justifyContent:'center',gap:'2rem'}}>
               <Button onClick={handleSwitchNav}  color="inherit">Perfil</Button>
               <Button onClick={handleNavProfile}  color="inherit">Configuaración</Button>
            </Toolbar>
         </AppBar>
      </Box>
 
   )
}
