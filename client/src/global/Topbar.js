import { Box, IconButton, useTheme, Avatar, Menu, MenuItem } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { AuthContext } from "../helpers/AuthContext";
import SignInIcon from '@mui/icons-material/ExitToApp';
import RegisterIcon from '@mui/icons-material/PersonAdd';
import { SearchContext } from '../helpers/SearchContext';

import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useEffect } from "react";
import IU from './IU.png';

const Topbar = () => {
  const navigate = useNavigate();
  const { authState, setAuthState } = useContext(AuthContext);
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const [hoverText, setHoverText] = useState("");
  const [hoverBoxPosition, setHoverBoxPosition] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const { search, setSearch } = useContext(SearchContext);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
    setTimeout(() => {
      navigate("/");
    }, 500);
  };
  // useEffect(() => {
  //   console.log("authState changed:", authState);
  // }, [authState]);

  const handleMouseEnter = (event, text) => {
    setHoverText(text);
    setHoverBoxPosition(event.currentTarget.getBoundingClientRect());
  };

  const handleMouseLeave = () => {
    setHoverText("");
    setHoverBoxPosition({});
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {!authState.status && (
        <Box display="flex">
          <IconButton
            onMouseEnter={(event) => handleMouseEnter(event, "Sign In")}
            onMouseLeave={handleMouseLeave}
            onClick={() => navigate("/login")}
          >
            <SignInIcon />
          </IconButton>

          <IconButton
            onMouseEnter={(event) => handleMouseEnter(event, "Register")}
            onMouseLeave={handleMouseLeave}
            onClick={() => navigate("/registration")}
          >
            <RegisterIcon />
          </IconButton>
        </Box>

      )}
      {authState.status && (
        <Box display="flex" justifyContent="space-between" p={2}>
          {/* SEARCH BAR */}
          <Box
            display="flex"
            backgroundColor={colors.primary[400]}
            borderRadius="3px"
          >
            <InputBase sx={{ ml: 5, flex: 1 }} placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
            <IconButton type="button" sx={{ p: 1 }}>
              <SearchIcon />
            </IconButton>
          </Box>

          {/* ICONS */}
          <Link to="/">
            <IconButton
              onMouseEnter={(event) => handleMouseEnter(event, "Home")}
              onMouseLeave={handleMouseLeave}
            >
              <HomeOutlinedIcon />
            </IconButton>
          </Link>

          {/* Show icons only when user is authenticated */}
          <Box display="flex">
            <IconButton
              onClick={colorMode.toggleColorMode}
              onMouseEnter={(event) =>
                handleMouseEnter(event, "Toggle color mode")
              }
              onMouseLeave={handleMouseLeave}
            >
              {theme.palette.mode === "dark" ? (
                <DarkModeOutlinedIcon />
              ) : (
                <LightModeOutlinedIcon />
              )}
            </IconButton>

            <IconButton
              onClick={() => navigate("/form")}
              onMouseEnter={(event) => handleMouseEnter(event, "Upload")}
              onMouseLeave={handleMouseLeave}
            >
              <CloudUploadOutlinedIcon />
            </IconButton>

            <IconButton
              onMouseEnter={(event) => handleMouseEnter(event, "Settings")}
              onMouseLeave={handleMouseLeave}
              onClick={handleMenuOpen}
            >
              <SettingsOutlinedIcon />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={logout}>Log out</MenuItem>
              <MenuItem onClick={handleMenuClose}>Change user settings</MenuItem>
            </Menu>

            <IconButton
              onMouseEnter={(event) => handleMouseEnter(event, "Profile")}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/profile/1">
                <Avatar
                  alt="Profile picture"
                  src={IU}
                  sx={{ width: 32, height: 32 }}
                />
              </Link>
            </IconButton>
          </Box>

          {/* HOVER TEXT */}

        </Box>
      )}

      {hoverText && (
        <Box
          position="absolute"
          top={hoverBoxPosition.top + hoverBoxPosition.height + 8}
          left={hoverBoxPosition.left}
          bgcolor="background.paper"
          color="text.primary"
          px={1}
          py={0.5}
          borderRadius={1}
        >
          {hoverText}
        </Box>
      )}
    </>
  );



};

export default Topbar;