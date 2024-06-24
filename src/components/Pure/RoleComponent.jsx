import { Chip,Stack } from '@mui/material'

export default function RoleComponent({ role }) {
   
   const selectRole = (role) => {
      if (role === 'Leader') {
         return (
            <Chip
               label="Leader"
               color="success"
               size="small"
               sx={{
                  '&.MuiChip-root': { backgroundColor: 'stack.secondary' },
               }}
            />
         )
      } else if (role === 'Follower') {
         
         return (
            <Chip
               label="Follower"
               sx={{ '&.MuiChip-root': { backgroundColor: 'stack.primary' } }}
               size="small"
            />
         )
      } else {
         return (
            <Chip
               label="Switch"
               size="small"
               sx={{
                  '&.MuiChip-root': { backgroundColor: 'stack.terciary' },
               }}
            />
         )
      }
      
   }

   return (
      <Stack direction="row" spacing={1}>
         {selectRole(role)}
      </Stack>
   )
}
