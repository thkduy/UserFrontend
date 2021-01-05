import React, { useState } from 'react';
import swal from "sweetalert";
import jwt from "jsonwebtoken";
import { useHistory, useParams } from 'react-router-dom';
import {
    TextField,
    Typography,
    Grid,
    Button,
    Paper,
    Container
} from '@material-ui/core';
import { changePassword } from '../api'

export default function ChangePassword() {
    const { token } = useParams();
    const data = jwt.decode(token);
    const email = data.email;
    const history = useHistory();

    const [valuesPassword, setValuesPassword] = useState({
        password: "",
        isError: false,
        Error: "",
    });

    const handlePasswordChange = (prop) => (e) => {
        if (valuesPassword.password.length > 5) {
            setValuesPassword({
                ...valuesPassword,
                [prop]: e.target.value,
                isError: false,
                Error: "",
            });
        } else {
            setValuesPassword({ ...valuesPassword, [prop]: e.target.value });
        }
    };

    const [valuesConfirmPassword, setValuesConfirmPassword] = useState({
        confirmPassword: "",
        isError: false,
        Error: "",
    });

    const handleConfirmPasswordChange = (prop) => (e) => {
        setValuesConfirmPassword({ ...valuesConfirmPassword, [prop]: e.target.value });
        if (valuesPassword.password === valuesConfirmPassword.confirmPassword) {
            setValuesConfirmPassword({
                ...valuesConfirmPassword,
                isError: false,
                Error: ""
            });
        }
    };

    const handleChangePassword = async () => {
        if (valuesPassword.password.length < 6) {
            setValuesPassword({
                ...valuesPassword,
                isError: true,
                Error: "Password must have at least 6 characters!"
            });
            return;
        }

        if (valuesConfirmPassword.confirmPassword !== valuesPassword.password) {
            setValuesConfirmPassword({
                ...valuesConfirmPassword,
                isError: true,
                Error: "Password don't match!"
            });
            return;
        }
        //call api
        const res = await changePassword(token, valuesPassword.password);
        const response =  await res.json();
        if(res.ok){
            await swal({
                title: `${response.message}`,
                text: "Login to continue.",
                icon: "success",
                buttons: {
                    ok: "OK"
                }
            });
            history.push('/login');
        } else if(res.status===400){
            swal({
                title: `${response.message}`,
                icon: "error",
                buttons: {
                    ok: "OK"
                }
            });
        }
        
    };

    return (
        <Container maxWidth="sm">
        <Paper style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>

        
        <Grid container spacing={1} direction="column" justify="center" alignItems="center">
            <Grid item>
                <Typography variant="h5" style={{ fontWeight: 'bold', color: '#555555', marginTop:'10px', marginBottom: '20px' }}
                > Change password for {email}</Typography>
            </Grid>
            <Grid item>
                <TextField
                    margin='dense' type="password" value={valuesPassword.password} onChange={handlePasswordChange("password")}
                    error={valuesPassword.isError} label="Password" variant="outlined"
                    helperText={valuesPassword.isError ? valuesPassword.Error : "At least 6 characters"}
                    inputProps={{ style: { fontSize: 22 } }}
                />
            </Grid>
            <Grid item>
                <TextField
                    margin='dense' type="password" value={valuesConfirmPassword.confirmPassword}
                    onChange={handleConfirmPasswordChange("confirmPassword")} error={valuesConfirmPassword.isError}
                    label="Confirm password" helperText={valuesConfirmPassword.Error} variant="outlined"
                    inputProps={{ style: { fontSize: 22 } }}
                />
            </Grid>
            <Grid item>
                <Button onClick={handleChangePassword} variant="contained" color="primary"
                    style={{ marginTop:'10px', marginBottom: '10px', width: '200px'}}
                    disabled={ !valuesPassword.password.trim().length || !valuesConfirmPassword.confirmPassword.trim().length }
                > Change </Button>
            </Grid>
        </Grid>
        </Paper>
        </Container>
    );
}