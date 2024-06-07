import { Button } from '@mui/material'

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
               color: 'text.primary',
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
