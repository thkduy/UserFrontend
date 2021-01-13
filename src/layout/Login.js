import { React, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import authUserContext from '../context/AuthUserContext';
import jwt from "jsonwebtoken";
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import {
  Box,
  TextField,
  Grid,
  Button,
  IconButton,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  Typography,
  Paper,
} from "@material-ui/core";
import {
  AccountCircle,
  Visibility,
  VisibilityOff
} from "@material-ui/icons";
import Alert from '@material-ui/lab/Alert';
import LockIcon from '@material-ui/icons/Lock';
import { login, loginFacebook, loginGoogle } from '../api/index';

const clientId = '221518239051-e1tr6ae3cgmjpdmflafidpv9mqrmqd1a.apps.googleusercontent.com';
export default function Login() {
  const {
    isAuthenticated,
    checkAuthenticated,
    signIn,
    setNewToken,
  } = useContext(authUserContext);
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
      history.push('/');
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
      history.push('/');
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
        history.push('/');
      } else if (response.status === 400) {
        setError(res.message);
        return;
      }
    }

  }

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
    >
      <Grid item>
        <Paper elevation={3}>
          <Box style={{ width: 300 }}>
            <Grid
              container
              spacing={1}
              justify="center"
              style={{ marginTop: 10 }}
            >
              <Grid item>
                <Typography variant="h4">
                  Login
                </Typography>
              </Grid>
            </Grid>
            {error.length > 0 ? <Alert severity="error">{error}</Alert> : null}
            <Grid
              container
              spacing={1}
              alignItems="flex-end"
              justify="center"
            >
              <Grid item>
                <AccountCircle />
              </Grid>
              <Grid item>
                <TextField
                  label="Email"
                  value={email}
                  style={{ width: 250 }}
                  onChange={handleEmailChange}
                />
              </Grid>
            </Grid>
            <Grid
              container
              spacing={1}
              alignItems="flex-end"
              justify="center"
            >
              <Grid item>
                <LockIcon />
              </Grid>
              <Grid item>
                <FormControl>
                  <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                  <Input
                    id="standard-adornment-password"
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
              </Grid>
            </Grid>
            <Grid container
              spacing={1}
              alignItems="flex-end"
              justify="center">
              <Typography variant="subtitle1" style={{ width: '100%', marginLeft: 25, marginRight: 25 }}>
                <Link to="/forgot-password">
                  Forgot password?
                  </Link>
              </Typography>
            </Grid>
            <Grid
              container
              spacing={1}
              alignItems="flex-end"
              justify="center"
              style={{ marginTop: 20, marginBottom: 10 }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleLogin}
                disabled={!email.trim().length > 0 || !values.password.trim().length > 0}
                style={{ width: '100%', marginLeft: 25, marginRight: 25 }}
              >
                Login
                </Button>
            </Grid>
            <Grid
              container
              spacing={1}
              alignItems="flex-end"
              justify="center"
            >
              <Grid item>
                <Typography variant="subtitle1">
                  Don't have account?
                  <Link to="/register">
                    Register now!
                  </Link>
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={1}
              alignItems="center"
              justify="center"
              style={{ marginBottom: 20 }}
            >
              <Grid item>
                <Typography variant="h5">
                  Or
                </Typography>
              </Grid>
              <Grid item>
                <GoogleLogin
                  clientId={clientId}
                  onSuccess={responseGoogle}
                  onFailure={responseGoogleFail}
                  cookiePolicy={'single_host_origin'}
                />
                </Grid>
                <Grid item>
                <FacebookLogin
                  style={{width:'200px!important'}}
                  appId="173125904556436"
                  fields="name,email,picture"
                  callback={responseFacebook}
                  icon="fa-facebook"
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}