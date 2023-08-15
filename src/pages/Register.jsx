import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import * as Yup from "yup";
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
import OtpInput from 'react-otp-input';

import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { BASEURL } from "../ApiUrl";
import useMediaQuery from '@mui/material/useMediaQuery';
import { MuiOtpInput } from 'mui-one-time-password-input'
// import { styled } from 'styled-component' // or emotion
  // Custom styles for the input box
  const inputStyle = {
    width: '50px', // Adjust the width as per your requirement
    height: '50px', // Adjust the height as per your requirement
    fontSize: '18px', // Adjust the font size as per your requirement
    margin: '5px', // Adjust the margin as per your requirement
    borderRadius: '4px', // Adjust the border radius as per your requirement
    border: '1px solid #ccc', // Adjust the border style and color as per your requirement
    outline: 'none', // Remove the default focus outline if not needed
    textAlign: 'center', // Center the text inside the input box
  };
function Copyright(props) {

  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
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
    otpInput: {
      "& .MuiOtpInput-TextField":{
        backgroundColor: 'white',
        color: 'black',
      },
     
      // Add any other styling properties you want to customize
    },
  },
}));
// const MuiOtpInputStyled = styled(MuiOtpInput)`
//   display: flex;
//   gap: 30px;
//   max-width: 650px;
//   margin-inline: auto;
// `
const defaultTheme = createTheme();
function Register() {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
const isMediumScreen = useMediaQuery((theme) => theme.breakpoints.between('md'));
const islargeScreen = useMediaQuery((theme) => theme.breakpoints.between('lg'));
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: isSmallScreen ? "90%" : isMediumScreen ? "80%" : islargeScreen?"60%":"40%", // Adjust width based on screen size
  border:"none",
  borderRadius:"10px",
  color:"white",
  bgcolor: 'rgba(0,0,0,.75)',
  boxShadow: 24,
  p: 4,
};
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [otp, setOtp] = useState('');
  const [receivedOtp, setReceivedOtp] = useState('1234'); // OTP received from the backend

const [userData, setuserData] = useState(null)
  const dispatch = useDispatch();
  const classes = useStyles();
  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [validate, setvalidate] = useState(false)
  const navigate = useNavigate();
  const signinForm = useFormik({
    initialValues: {
      password: "",
      username: "",
      email: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(6, "username minimum 6 characters")
        .required("username is required"),
      password: Yup.string()
        .min(6, "password minimum 6 characters")
        .required("password is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "confirmPassword not match")
        .min(6, "confirmPassword minimum 6 characters")
        .required("confirmPassword is required"),
    }),
    onSubmit: async (values) => {
      setErrorMessage(undefined);
      setIsLoginRequest(true);
      console.log(values);
      const { response, err } = await userApi.signup(values);
      setIsLoginRequest(false);

      if (response) {
        signinForm.resetForm();
        setuserData(response.user)
        setOpen(true)
        // console.log(response);
        // localStorage.setItem("userData", JSON.stringify(response.user));
        // dispatch(setUser(response.user));
        // toast.success("Sign up success");
        // navigate("/");
      }

      if (err) setErrorMessage(err.message);
    },
  });
    // Handler for OTP change
    const handleOtpChange = (value) => {
      setOtp(value);
      console.log(value);
      if (value.length === 6) {
        verifyOtp(value); // Verify OTP when user completes all 4 digits
      }
    };
  
    // Handler for OTP verification
    const verifyOtp = async(enteredOtp) => {
      try {
        const result=await axios.post(`${BASEURL}/api/user/codeverification`,{email:userData.email,code:enteredOtp})
        if(result.status===200){
          toast.success("Verify account successfully...Please login again")
          navigate("/login")
          
        }
      } catch (error) {
        console.log(error);
        if(error.response.status===401){
          setErrorMessage("Incorrect code")
          setvalidate(false)
        }
      }
      
    };
  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          {/* <Button onClick={handleOpen}>Open modal</Button> */}
          {
            open?<div>
           
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              hideBackdrop
              onClose={handleClose}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{
                backdrop: {
                  timeout: 500,
                },
              }}
            >
              <Fade in={open}>
                <Box sx={style}>
                  <Typography id="transition-modal-title" variant="h6" component="h2">
                    Enter Verfication code 
                  </Typography>
                  <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                   We sent you a verification code by email 
                  </Typography>
                  <div style={{marginTop:"30px",display:"flex"}} >
                  {/* <OtpInput
            value={otp}
            onChange={handleOtpChange}
            numInputs={6}
            inputStyle={inputStyle} // Apply the custom style to the input boxes
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
          /> */}
           <MuiOtpInput value={otp} onChange={handleOtpChange} length={6}   
           sx={{
                    "& .MuiOtpInput-TextField": {
                      color: "#e87c03", // Set the icon color to white
                      backgroundColor: "white",
                    },
                    "& .MuiOtpInput-Box":{
                     
                    },
                    "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root":{
                      height:"2.5rem" 
                    },
                  }} />
          {
            validate && <CircularProgress size={40} style={{marginTop:"10px"}}/>
          }
           
                  </div>
                  {errorMessage && (
               <Box sx={{ marginTop: 2 }}>
                 <Alert severity="error" variant="outlined">
                   {errorMessage}
                 </Alert>
               </Box>
             )}
                
                </Box>
              </Fade>
            </Modal>
          </div>:
           <Box
           sx={{
             backgroundColor: "rgba(0,0,0,.75)",
             marginTop: 8,
             padding: "20px 40px",
             display: "flex",
             flexDirection: "column",
             alignItems: "center",
           }}
         >
           {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
             <LockOutlinedIcon />
           </Avatar> */}
           <Typography
             component="h1"
             variant="h5"
             style={{ color: "#fff", fontSize: "32px", fontWeight: "500" }}
           >
             Sign Up
           </Typography>
           <Box
             component="form"
             // onSubmit={handleSubmit}
             onSubmit={signinForm.handleSubmit}
             noValidate
             sx={{ mt: 1 }}
           >
             <TextField
               className={classes.root}
               margin="normal"
               required
               fullWidth
               id="filled-basic-email"
               label="Username"
               variant="filled"
               name="username"
               autoComplete="username"
               inputProps={{
                 autoComplete: "username", // Set the specific autoComplete prop of the input to "username"
               }}
               autoFocus
               value={signinForm.values.username}
               onChange={signinForm.handleChange}
               error={
                 signinForm.touched.username &&
                 signinForm.errors.username !== undefined
               }
               helperText={
                 signinForm.touched.username && signinForm.errors.username
               }
             />
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
             <TextField
               className={classes.root}
               margin="normal"
               required
               fullWidth
               name="confirmPassword"
               id="filled-basic-password"
               label="confirmPassword"
               variant="filled"
               type="password"
               autoComplete="current-password"
               value={signinForm.values.confirmPassword}
               onChange={signinForm.handleChange}
               error={
                 signinForm.touched.confirmPassword &&
                 signinForm.errors.confirmPassword !== undefined
               }
               helperText={
                 signinForm.touched.confirmPassword &&
                 signinForm.errors.confirmPassword
               }
             />

             <LoadingButton
               type="submit"
               fullWidth
               size="large"
               variant="contained"
               sx={{ marginTop: 4 }}
               loading={isLoginRequest}
               style={{ backgroundColor: "rgb(255, 0, 0)" }}
             >
               SIGN UP
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
               // label="Remember me"
               // style={{ color: "#b3b3b3", fontSize: "13px", fontWeight: "400" }}
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
                 Already have an account?
               </Typography>
               <div onClick={() => navigate("/login")}>
                 <Link
                   href="#"
                   underline="hover"
                   sx={{
                     color: "#fff",
                   }}
                 >
                   {"Sign in."}
                 </Link>
               </div>
             </Grid>
             {errorMessage && (
               <Box sx={{ marginTop: 2 }}>
                 <Alert severity="error" variant="outlined">
                   {errorMessage}
                 </Alert>
               </Box>
             )}
           </Box>
         </Box>
          }
         
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default Register;
