import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import {
  TextField,
  Button,
  Box,
  Grid,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#2196f3",
    },
  },
  typography: {
    fontFamily: ["Arial", "sans-serif"].join(","),
    color: "#fff",
  },
});

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const login = () => {
    const data = { username: username, password: password };

    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        navigate("/");
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box m={2}>
        <Grid container spacing={2} justify="center">
          <Grid item xs={12} sm={6}>
            <Box mb={2}>
              <TextField
                id="username"
                name="username"
                label="Username"
                variant="outlined"
                fullWidth
                InputProps={{
                  style: {
                    color: "#fff",
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: "#ccc",
                  },
                }}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box mb={2}>
              <TextField
                id="password"
                name="password"
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                InputProps={{
                  style: {
                    color: "#fff",
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: "#ccc",
                  },
                }}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{
                color: "#fff",
                backgroundColor: "#2196f3",
                "&:hover": {
                  backgroundColor: "#1976d2",
                },
              }}
              onClick={login}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default Login;
