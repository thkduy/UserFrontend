import {React, useState } from "react";
import {useHistory} from "react-router-dom";
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
    Visibility,
    VisibilityOff
} from "@material-ui/icons";
import Alert from '@material-ui/lab/Alert';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import FaceIcon from '@material-ui/icons/Face';

const api_url = 'http://localhost:3001/api';

export default function Register(){
    const history = useHistory();
    
    const [error, setError] = useState('');
    const [values, setValues] = useState({
        email: "",
        name: "",
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

    const handleSignup = async () => {

        var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;         
        if(!values.email.match(pattern)){
            setError('Invalid email');
            return;
        }

        const options = {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            body: JSON.stringify({ 
                password: values.password,
                name: values.name,
                email: values.email,
            }),
        }

        const response = await fetch(api_url + `/user/register`, options);
        const res = await response.json();
        if(response.ok){
            history.push('/login');
        }else if (response.status === 400) {
            setError(res.message);
            return;
        }
        
    };

    return(
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
                        style={{ marginTop: 10}}
                    >
                        <Grid item>
                            <Typography variant="h4">
                                Register
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
                            <EmailIcon />
                        </Grid>
                        <Grid item>
                            <TextField 
                                label="Email"
                                value={values.email} 
                                style={{ width: 250 }} 
                                onChange={handleChange('email')}    
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
                            <FaceIcon />
                        </Grid>
                        <Grid item>
                            <TextField 
                                label="Name"
                                value={values.name} 
                                style={{ width: 250 }} 
                                onChange={handleChange('name')}    
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
                    <Grid
                        container
                        spacing={1}
                        alignItems="flex-end"
                        justify="center"
                        style={{ marginTop: 20, marginBottom: 10 }}
                    >
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSignup}
                                disabled={
                                    !values.email.trim().length > 0 ||
                                    !values.name.trim().length > 0 || 
                                    !values.password.trim().length > 0
                                }
                            >
                                Register
                            </Button>
                        </Grid>
                    </Grid>
                    </Box>
            </Paper>
            </Grid>
        </Grid>
    );
}