import {React, useState} from "react";
import {useHistory} from "react-router-dom";
import {
  Box,
  TextField,
  Container,
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
  Visibility,
  VisibilityOff
} from "@material-ui/icons";
import Alert from '@material-ui/lab/Alert';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import FaceIcon from '@material-ui/icons/Face';
import {register} from "../api/index";

export default function Register() {
  const history = useHistory();

  const [error, setError] = useState('');
  const [values, setValues] = useState({
    email: "",
    name: "",
    password: "",
    showPassword: false
  });
  const handleChange = (prop) => (event) => {
    setValues({...values, [prop]: event.target.value});
  };

  const handleClickShowPassword = () => {
    setValues({...values, showPassword: !values.showPassword});
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSignup = async () => {

    const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!values.email.match(pattern)) {
      setError('Invalid email');
      return;
    }

    const response = await register(values.name, values.email, values.password);
    const res = await response.json();
    if (response.ok) {
      history.push('/login');
    } else if (response.status === 400) {
      setError(res.message);
      return;
    }

  };

  return(
    <Container maxWidth="sm" component={Paper}>
      <Box display="flex" flexDirection="column" alignItems="center" pt={2} pb={2}>
        <Typography variant="h4">Register</Typography>
        {error.length > 0 ? <Alert severity="error" style={{width:'95%'}}>{error}</Alert> : null}
        <Box display="flex" flexDirection="row" alignItems="flex-end" width="100%" mt={1}>
          <EmailIcon style={{ marginBottom: 5, marginRight: 5 }} />
          <TextField
            label="Email"
            value={values.email}
            onChange={handleChange('email')}
            fullWidth
          />
        </Box>
        <Box display="flex" flexDirection="row" alignItems="flex-end" width="100%" mt={1}>
          <FaceIcon style={{ marginBottom: 5, marginRight: 5 }} />
          <TextField
            label="Name"
            value={values.name}
            onChange={handleChange('name')}
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
        <Button
          variant="contained"
          color="primary"
          onClick={handleSignup}
          disabled={
            !values.email.trim().length > 0 ||
            !values.name.trim().length > 0 ||
            !values.password.trim().length > 0
          }
          style={{ width: '50%', marginLeft: 25, marginRight: 25, marginTop:30 }}
        >
          Register
        </Button>
      </Box>
    </Container>
  );
}