import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import { pink } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { setUser } from "../redux/features/userSlice";
import { setAuthModalOpen } from "../redux/features/authModalSlice";
import { toast } from "react-toastify";
import userApi from "../api/modules/user.api";
import { useState } from "react";
import { Alert, LoadingButton } from "@mui/lab";
import { NavLink, useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="#b3b3b3" // Set the text color to white
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="#b3b3b3" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiInputLabel-root": {
      color: "#8c8c8c", // Change the initial label color to gray
    },
    "& .MuiInputLabel-shrink": {
      color: "#8c8c8c", // Change the label color when it floats to the top
    },
    "& .MuiFilledInput-root": {
      backgroundColor: "#333", // Set background color to #333
      "&:hover": {
        backgroundColor: "#444", // Change background color on hover (you can adjust this color)
      },
      "& .MuiFilledInput-underline:before": {
        borderBottomColor: "#ff0", // Change underline/border color when focused (you can adjust this color)
      },
      "& .MuiFilledInput-input": {
        color: "#fff", // Change text color to white
      },
      // Prevent autofill background color from changing to white
      "& input:-webkit-autofill": {
        "-webkit-box-shadow": `0 0 0 100px #333 inset`, // Set autofill background color to #333
        "-webkit-text-fill-color": "#fff", // Set autofill text color to white
      },
    },
    link: {
      color: "#fff", // Set the text color to white
      textDecoration: "none", // Remove the underline
      "&:hover": {
        textDecoration: "underline",
        color: "white", // Display a white underline on hover
      },
    },
    loadingButton: {
      backgroundColor: "rgb(255, 0, 0)",
      "& .MuiCircularProgress-svg": {
        color: "white", // Set the color of the loading spinner to white
      },
    },
  },
}));

export default function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const signinForm = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(5, "password minimum 8 characters")
        .required("password is required"),
    }),
    onSubmit: async (values) => {
      setErrorMessage(undefined);
      setIsLoginRequest(true);
      const { response, err } = await userApi.signin(values);
      setIsLoginRequest(false);
      if (response) {
        signinForm.resetForm();
        console.log(response);
        localStorage.setItem("userData", JSON.stringify(response.user));
        dispatch(setUser(response.user));
        navigate("/");
        // dispatch(setAuthModalOpen(false));
        toast.success("Sign in success");
      }

      if (err) setErrorMessage(err.message);
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          boxShadow={3}
          sx={{
            backgroundColor: "rgba(0,0,0,.75)",
            marginTop: 8,
            padding: "20px 40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            style={{ color: "#fff", fontSize: "32px", fontWeight: "500" }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            // onSubmit={handleSubmit}
            onSubmit={signinForm.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {errorMessage && (
              <Box sx={{ marginTop: 2 }}>
                <Alert
                  severity="error"
                  variant="outlined"
                  sx={{
                    borderColor: "#e87c03", // Set the border color to yellow (#ff0)
                    color: "#fff", // Set the text color to white
                    backgroundColor: "transparent", // Set the background color to transparent
                    "& .MuiAlert-icon": {
                      color: "#e87c03", // Set the icon color to white
                    },
                  }}
                >
                  {errorMessage == "Sorry" ? (
                    <>
                      Sorry, we can't find an account with this email address.
                      Please try again or{" "}
                      <span onClick={() => navigate("/register")}>
                        {" "}
                        <Link
                          href="#"
                          underline="always" // Set underline to always be shown
                          sx={{
                            color: "#fff",
                            textDecoration: "underline", // Always show underline in white color
                          }}
                        >
                          create a new account
                        </Link>
                      </span>
                    </>
                  ) : (
                    <>
                      Incorrect password. Please try again or you can{" "}
                      <span onClick={() => navigate("/forget-password")}>
                        {" "}
                        <Link
                          href="#"
                          underline="always" // Set underline to always be shown
                          sx={{
                            color: "#fff",
                            textDecoration: "underline", // Always show underline in white color
                          }}
                        >
                          reset your password
                        </Link>
                      </span>
                    </>
                  )}
                </Alert>
              </Box>
            )}
            <TextField
              className={classes.root}
              margin="normal"
              required
              fullWidth
              id="filled-basic-email"
              label="Email Address"
              variant="filled"
              name="email"
              autoComplete="email"
              autoFocus
              value={signinForm.values.email}
              onChange={signinForm.handleChange}
              error={
                signinForm.touched.email &&
                signinForm.errors.email !== undefined
              }
              helperText={signinForm.touched.email && signinForm.errors.email}
            />
            <TextField
              className={classes.root}
              margin="normal"
              required
              fullWidth
              name="password"
              id="filled-basic-password"
              label="Password"
              variant="filled"
              type="password"
              autoComplete="current-password"
              value={signinForm.values.password}
              onChange={signinForm.handleChange}
              error={
                signinForm.touched.password &&
                signinForm.errors.password !== undefined
              }
              helperText={
                signinForm.touched.password && signinForm.errors.password
              }
            />
            <LoadingButton
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              sx={{ marginTop: 2 }}
              loading={isLoginRequest}
              style={{ backgroundColor: "rgb(255, 0, 0)" }}
            >
              SIGN IN
            </LoadingButton>
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  sx={{
                    color: "#737373",
                    "&.Mui-checked": {
                      color: "#fff",
                    },
                  }}
                />
              }
              label={
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: "400",
                    color: "#b3b3b3",
                  }}
                >
                  Remember me
                </Typography>
              }
            />
            <Grid container style={{ marginTop: "3px" }}>
              {/* <Grid item xs sty> */}
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "400",
                  color: "#b3b3b3",
                  marginRight: "3px",
                }}
              >
                New to MoonFlix?
              </Typography>
              <div onClick={() => navigate("/register")}>
                <Link
                  href="#"
                  underline="hover"
                  sx={{
                    color: "#fff",
                  }}
                >
                  {"Sign up now."}
                </Link>
              </div>
            </Grid>

            
            {/* <Box sx={{ marginTop: 2 }}>
                <Alert severity="error" variant="outlined">
                  {errorMessage}
                </Alert>
              </Box> */}
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
