import { Box, IconButton, useTheme, Avatar } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

import IU from './IU.png'
const Topbar = () => {
  const navigate = useNavigate();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const [hoverText, setHoverText] = useState("");
  const [hoverBoxPosition, setHoverBoxPosition] = useState({});

  const handleMouseEnter = (event, text) => {
    setHoverText(text);
    setHoverBoxPosition(event.currentTarget.getBoundingClientRect());
  };

  const handleMouseLeave = () => {
    setHoverText("");
    setHoverBoxPosition({});
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
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
        >
          <SettingsOutlinedIcon />
        </IconButton>

        <IconButton
          onMouseEnter={(event) => handleMouseEnter(event, "Profile")}
          onMouseLeave={handleMouseLeave}
        >
        <Link to="/profile">

          <Avatar
            alt="Profile picture"
            src= {IU}
            sx={{ width: 32, height: 32 }}
          />
          </Link>

        </IconButton>
      </Box>

      {/* HOVER TEXT */}
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
    </Box>
  );
};

export default Topbar;
