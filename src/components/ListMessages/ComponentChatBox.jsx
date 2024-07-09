import {
   Divider,
   ListItemButton,
   Avatar,
   Box,
   Typography,
} from '@mui/material';
import { Fragment, useContext } from 'react';
import { LoginContextP } from '../../context/loginContextPrueba';
import { MessagesContext } from '../../context/messagesContext';
import { UserContext } from '../../context/userContext';
import AvatarChatComponent from '../Pure/AvatarChatComponent';

export default function ComponentChatBox({ members, lastmessage }) {
   const { profileDetails } = useContext(LoginContextP);
   const { setUserDetail } = useContext(UserContext);
   const { openConversation } = useContext(MessagesContext);
   const myUserid = () => {
      if (profileDetails) return profileDetails._id;
   };
   // console.log('esto es lastmessage',lastmessage)
   // const member = members.filter((member) => myUserid !== member._id)
   // console.log('esto es memberID', member)
   // const idUsers = { sender: profileDetails._id, receiver: member[0]._id }

   return (
      <>
         {members.map((member) => {
            if (member._id !== myUserid()) {
               const idUsers = { sender: myUserid(), receiver: member._id };
               return (
                  <Fragment key={member._id}>
                     <ListItemButton
                        onClick={() => {
                           openConversation(idUsers);
                           setUserDetail(member);
                        }}
                        sx={{
                           display: 'flex',
                           m: '1.5rem',
                           cursor: 'pointer',
                        }}
                     >
                        <AvatarChatComponent member={member}/>
                        <Box
                           sx={{ display: 'flex', flexDirection: 'column', ml: '1rem',maxHeight:'70px',maxWidth:'300px' }}
                        >
                           <Typography variant="h6" sx={{ fontSize: '1.6rem' }}>
                              {member.name}
                           </Typography>
                           <Typography
                              sx={{
                                 fontSize: '1.2rem',
                                 fontWeight: 'bold',
                                 color: 'secondary.variante',
                                 overflow: 'hidden',
                                 textOverflow: 'ellipsis',
                                 // whiteSpace: 'nowrap'
                              }}
                           >
                              {lastmessage.message}
                           </Typography>
                   
                        </Box>
                     </ListItemButton>
                     <Divider />
                  </Fragment>
               );
            }
         })}
      </>
   );
}
