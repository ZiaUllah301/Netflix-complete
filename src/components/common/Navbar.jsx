import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "./Logo";

export default function Navbar() {
  const buttonSX = {
    "&:hover": {
      textDecoration: "underline",
      backgroundColor: "white",
    },
  };
  return (
    // <Box sx={{ flexGrow: 1 }}>
    <AppBar
      position="static"
      style={{
        backgroundColor: "white",
        borderBottom: "1px solid #e6e6e6",
        boxShadow: "none",
      }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <Logo />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          style={{ display: "block" }}
        ></Typography>

        <Button
          sx={buttonSX}
          style={{ color: "#333", fontSize: "19px", fontWeight: "500" }}
        >
          Sign Out
        </Button>
      </Toolbar>
    </AppBar>
    // </Box>
  );
}
