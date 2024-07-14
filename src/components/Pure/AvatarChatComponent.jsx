
import { Avatar, Badge, styled } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { WebSocketsContext } from '../../context/websocketsContext';

export default function AvatarChatComponent({ member }) {
   const { userConnected } = useContext(WebSocketsContext)
   //comporbacion de los ids  conectados
   const status = userConnected.some(id => id === member._id)

   console.log('userconect en avatar', userConnected)
   const StyledBadge = styled(Badge)(({ theme }) => ({
      '& .MuiBadge-badge': {
         backgroundColor: '#44b700',
         color: '#44b700',
         boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
         '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
         },
      },
      '@keyframes ripple': {
         '0%': {
            transform: 'scale(.8)',
            opacity: 1,
         },
         '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
         },
      },
   }));

   return (

      <StyledBadge
         overlap="circular"
         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
         variant="dot"
         invisible={!status}
      >
         <Avatar src={member.imgProfile} sx={{ width: 70, height: 70, bgcolor: ' background.avatar' }} />
      </StyledBadge>
   )
}
