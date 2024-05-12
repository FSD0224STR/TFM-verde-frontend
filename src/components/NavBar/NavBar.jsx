import React, { useState } from "react";
import NavListDrawer from "./NavListDrawer";
import {
  AppBar,
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
      <AppBar position="static" sx={{ textAlign: "left" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            size="large"
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            MeetDancing
          </Typography>
          <Box sx={{display:{xs:"none",sm:"block"}}}>
            <Button color="inherit">Sing Up</Button>
            <Button color="inherit">Login</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer open={open} anchor="left" onClose={() => setOpen(false)}>
        <NavListDrawer />
      </Drawer>
    </>
  );
}
