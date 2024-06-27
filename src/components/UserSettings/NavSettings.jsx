import { AppBar, Box, Button, Toolbar } from '@mui/material'

export default function NavSettings({handleSwitchNav,handleNavProfile}) {
   return (
      <Box sx={{mb:'2rem'}}>

         <AppBar sx={{position:'absolute',top:149}}>
            <Toolbar sx={{justifyContent:'center',gap:'2rem'}}>
               <Button onClick={handleSwitchNav}  color="inherit" sx={{fontSize:'1.5rem'}} >Perfil</Button>
               <Button onClick={handleNavProfile}  color="inherit" sx={{fontSize:'1.5rem'}}>Configuración</Button>
            </Toolbar>
         </AppBar>
      </Box>
 
   )
}
