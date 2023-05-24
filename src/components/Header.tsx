import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { Auth } from "aws-amplify";
import { useState } from "react";
import logo from "../images/wilshire-logo.png";
import "../styles/Header.css";
import Report from "./Report";
import EditCategoriesModal from "./categories/EditCategoriesModal";

function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOut = async () => {
    try {
      await Auth.signOut();
      handleClose();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };

  return (
    <header className="header">
      <div className="left">
        <img className="wilshire-logo" src={logo} alt="logo" />
      </div>
      <div className="right">
        <EditCategoriesModal />
        <Report />
        <IconButton
          aria-label="logout"
          aria-haspopup="true"
          onClick={handleMenu}
        >
          <AccountCircleIcon fontSize="large" />
        </IconButton>
      </div>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={signOut}>Log out</MenuItem>
      </Menu>
    </header>
  );
}

export default Header;
