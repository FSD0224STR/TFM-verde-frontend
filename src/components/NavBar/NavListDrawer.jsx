import React from "react";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
} from "@mui/material";
import { main_theme } from "../../../palette-theme-colors";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CardMembershipOutlinedIcon from "@mui/icons-material/CardMembershipOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";

const NavLinks = [
  {
    title: "Inicio",
    path: "/home",
    icon: <HomeOutlinedIcon />,
  },
  {
    title: "Membresia",
    path: "#membresia",
    icon: <CardMembershipOutlinedIcon />,
  },
  {
    title: "Login",
    path: "/Login",
    icon: <LoginOutlinedIcon />,
  },
  {
    title: "Registrate",
    path: "/register",
    icon: <HowToRegOutlinedIcon />,
  },
];

export default function NavListDrawer() {
  return (
    <ThemeProvider theme={main_theme}>
      <Box sx={{ width: 350,minHeight:"100vh",bgcolor: "lightsalmon" }}>
        <nav>
          <List>
            {NavLinks.map((item) => (
              <ListItem disablePadding key={item.title}>
                <ListItemButton component="a" href={item.path}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </nav>
      </Box>
    </ThemeProvider>
  );
}
