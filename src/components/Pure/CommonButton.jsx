import { Button } from '@mui/material'
import MapIcon from '@mui/icons-material/Map';

export const ShowMapButton=({name,onClick})=> {
   return (
      <>

         <Button
            onClick={onClick}
                     
            sx={{
               fontSize: '1em' ,

               height: '65px',
               position: 'fixed',
               left:'45%',
               bottom: '45px',
               borderRadius: '50px', 
               padding: '10px 20px', 
          
               backgroundColor: 'success.main',
               color: 'white',
               '&:hover': {
                  backgroundColor: 'stack.secondary',
                  
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
