import { React, useState, useContext } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import authUserContext from '../context/AuthUserContext';
import jwt from "jsonwebtoken";
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { makeStyles } from "@material-ui/styles";
import {
  Box, TextField, Button, IconButton, Input, InputLabel, InputAdornment, FormControl, Typography, Paper, Container,
} from "@material-ui/core";
import { AccountCircle, Visibility, VisibilityOff } from "@material-ui/icons";
import FacebookIcon from '@material-ui/icons/Facebook';
import Alert from '@material-ui/lab/Alert';
import LockIcon from '@material-ui/icons/Lock';
import { login, loginFacebook, loginGoogle } from '../api/index';

const useStyles = makeStyles({
  facebookButton: {
    backgroundColor: '#3b5998',
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 2px 2px 0px, rgba(0, 0, 0, 0.24) 0px 0px 1px 0px',
    borderRadius: '2px',
    border: '1px solid transparent',
    fontSize: '14px',
    fontWeight: 500,
    fontFamily: 'Roboto, sans-serif',
    width: 200,
    height: 45,
    "&:hover": {
      cursor: 'pointer',
      background: '#3b5998',
      opacity: 0.9
    }
  }
})
const clientId = '221518239051-e1tr6ae3cgmjpdmflafidpv9mqrmqd1a.apps.googleusercontent.com';
export default function Login() {
  const classes = useStyles();
  const {
    isAuthenticated,
    checkAuthenticated,
    signIn,
    setNewToken,
  } = useContext(authUserContext);
  let location = useLocation();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const [values, setValues] = useState({
    password: "",
    showPassword: false
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async () => {

    const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(pattern)) {
      setError('Invalid email');
      return;
    } else {
      setError('');
    }

    const response = await login(email, values.password);
    const res = await response.json();
    if (response.ok) {
      const user = jwt.decode(res.token);
      checkAuthenticated(!isAuthenticated);
      signIn(user);
      setNewToken(res.token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("token", res.token);
      let { from } = location.state || { from: { pathname: "/" } };
      history.push(from);
    } else if (response.status === 400) {
      setError(res.message);
      return;
    }
  };

  const responseGoogle = async (resp) => {
    const response = await loginGoogle(resp.accessToken, resp.profileObj.email, resp.profileObj.name, resp.profileObj.imageUrl);
    const res = await response.json();
    if (response.ok) {
      const user = jwt.decode(res.token);
      checkAuthenticated(!isAuthenticated);
      signIn(user);
      setNewToken(res.token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("token", res.token);
      let { from } = location.state || { from: { pathname: "/" } };
      history.push(from);
    } else if (response.status === 400) {
      setError(res.message);
      return;
    }
  }

  const responseGoogleFail = (resp) => {
    console.log(resp);
  }

  const responseFacebook = async (resp) => {
    if (!(resp.status && resp.status === "unknown")) {
      const response = await loginFacebook(resp.accessToken, resp.email, resp.name, resp.picture.data.url);
      const res = await response.json();
      if (response.ok) {
        const user = jwt.decode(res.token);
        checkAuthenticated(!isAuthenticated);
        signIn(user);
        setNewToken(res.token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem("token", res.token);
        let { from } = location.state || { from: { pathname: "/" } };
        history.push(from);
      } else if (response.status === 400) {
        setError(res.message);
        return;
      }
    }

  }

  return (
    <Container maxWidth="sm" component={Paper}>
      <Box display="flex" flexDirection="column" alignItems="center" pt={2} pb={2}>
        <Typography variant="h4">Login</Typography>
        {error.length > 0 ? <Alert severity="error">{error}</Alert> : null}
        <Box display="flex" flexDirection="row" alignItems="flex-end" width="100%" mt={1}>
          <AccountCircle style={{ marginBottom: 5, marginRight: 5 }} />
          <TextField
            label="Email"
            value={email}
            onChange={handleEmailChange}
            fullWidth
          />
        </Box>
        <Box display="flex" flexDirection="row" alignItems="flex-end" width="100%" mt={1}>
          <LockIcon style={{ marginBottom: 5, marginRight: 5 }} />
          <FormControl fullWidth>
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="space-between" width="100%" mt={1} mb={1}>
          <Typography variant="subtitle1">
            <Link to="/forgot-password">Forgot password?</Link>
          </Typography>
          <Typography variant="subtitle1">
            Don't have account?<Link to="/register" style={{marginLeft:5}}>Register now!</Link>
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          disabled={!email.trim().length > 0 || !values.password.trim().length > 0}
          style={{ width: '100%', marginLeft: 25, marginRight: 25}}
        >
          Login
      </Button>
        <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" width="100%" mt={2}>
          <Typography variant="h5">OR</Typography>
          <Box display="flex" flexDirection="row" flexWrap="wrap" alignItems="center" justifyContent="space-between" width="80%">
            <GoogleLogin
              clientId={clientId}
              onSuccess={responseGoogle}
              onFailure={responseGoogleFail}
              cookiePolicy={'single_host_origin'}
            />
            <FacebookLogin
              cssClass={classes.facebookButton}
              appId="173125904556436"
              fields="name,email,picture"
              callback={responseFacebook}
              icon={<FacebookIcon style={{ marginLeft: 5, marginRight: 10 }} />}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}