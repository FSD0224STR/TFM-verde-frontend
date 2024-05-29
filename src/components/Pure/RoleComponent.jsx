import { Chip,Stack } from '@mui/material'

export default function RoleComponent({role}) {
   return (
      <Stack direction="row" spacing={1}>
         {role === 'Leader' ? (
            <Chip
               label="Leader"
               color="success"
               size="small"
               sx={{
                  '&.MuiChip-root': { backgroundColor: 'stack.secondary' },
               }}
            />
         ) : (
            <Chip
               label="Follower"
               sx={{ '&.MuiChip-root': { backgroundColor: 'stack.primary' } }}
               size="small"
            />
         )}
      </Stack>
   )
}
