import { Button } from '@mui/material'
import MapIcon from '@mui/icons-material/Map';

export const ShowMapButton=({name,onClick})=> {
   return (
      <>

         <Button
            onClick={onClick}
         
            sx={{

               size:'xx-large',
               position: 'fixed',
               left:'45%',
               bottom: '35px',
               borderRadius: '50px', 
               padding: '10px 20px', 
               textTransform: 'none', 
               backgroundColor: 'primary.main',
               color: 'white',
               '&:hover': {
                  backgroundColor: 'background.nav',
                  
               },

            }}
         
         >
        
            {name}
            <MapIcon/>
         </Button>
      </>
   );
}

export const RepeatButton=({onClick,name})=>{

   return(
      <>

         <Button
            onClick={onClick}
            size="medium"
            sx={{
             
               padding: '0.5rem',
               mb: '1rem',                 
               bgcolor: 'primary.main',
               color: '#ffff',
               px: '1rem',
               '&:hover': {
                  '& .MuiTypography-root': {
                     color: 'text.secondary',
                  },
                  backgroundColor: 'background.nav',
               },
            }}
         >
            {name}
            
         </Button>
        
      </>
   )
}
