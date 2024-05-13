import React, { useState } from "react";
import NavListDrawer from "./NavListDrawer";
import MeetDancingIcon from "../../assets/MeetDancingIcon.png";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppBar position="static" sx={{ textAlign: "left", padding:"0.8rem"}}>
        <Toolbar sx={{justifyContent:"space-between" }}>
          <IconButton
            color="inherit"
            size="large"
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Avatar src={MeetDancingIcon} alt="meetDancig icono" sx={{m:'auto',width:60,height:60}}></Avatar>
                  <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}>
                      <Typography mr='1rem'>¿Aun no eres miembro?</Typography>
            <Button color="inherit" sx={{mr:"1rem",bgcolor:"#338DB8"}}>Sing Up</Button>
            <Button color="inherit" sx={{bgcolor:"background.secondary",color:"text.secondary"}}>Login</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer open={open} anchor="left" onClose={() => setOpen(false)}>
        <NavListDrawer setOpen={setOpen} />
      </Drawer>
    </>
  );
}
