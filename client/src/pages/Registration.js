import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Grid,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import {useNavigate} from 'react-router-dom'

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#f44336",
    },
  },
  typography: {
    fontFamily: ["Arial", "sans-serif"].join(","),
  },
});

function Registration() {
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    password: "",
    phone: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(4).max(20).required(),
    phone: Yup.string().matches(
      /^\+?[1-9]\d{1,14}$/,
      "Invalid phone number"
    ),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then(() => {
      // console.log(data);
      navigate('/')
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box m={2}>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  id="username"
                  name="username"
                  label="Username"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    style: {
                      color: "#fff",
                      marginTop: "8px",
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      color: "#ccc",
                    },
                  }}
                />
                <ErrorMessage name="username" component="div" />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  id="email"
                  name="email"
                  label="Email"
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
                />
                <ErrorMessage name="email" component="div" />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
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
                />
                <ErrorMessage name="password" component="div" />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  id="phone"
                  name="phone"
                  label="Phone Number"
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
                />
                <ErrorMessage name="phone" component="div" />
              </Grid>
              <Grid item xs={12}>
                <Box mt={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{
                      color: "#fff",
                      backgroundColor: "#2196f3",
                      padding: "8px 16px",
                      "&:hover": {
                        backgroundColor: "#1976d2",
                      },
                    }}
                  >
                    Register
                  </Button>

                </Box>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </Box>
    </ThemeProvider>
  );
}

export default Registration;
