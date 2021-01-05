import React, { useState } from 'react';
import { Button, Card, CardContent, Container, FormControl, Input, InputLabel, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Alert } from "@material-ui/lab";
import { SendMailChangePassword } from "../api";
const useStyles = makeStyles({
    gutterBottom: {
        marginBottom: '40px'
    },
    emailCard: {
        paddingLeft: '10px',
        paddingRight: '10px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    },
    emailButton: {
        width: '100%',
        height: '40px',
        marginBottom: '30px'
    }
})

export default function EnterEmailRecover() {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const handleSendMail = async () => {
        if (email.length === 0) {
            setError("Please fill out your email");
            return;
        } else {
            setError('');
        }
        const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!email.match(pattern)) {
            setError('Invalid email');
            return;
        } else {
            setError('');
        }

        const response = await SendMailChangePassword(email);
        const res = await response.json();
        if (response.ok) {
            setMessage(res.message);
            setError(null);
        } else if (response.status === 400) {
            setError("Your email doesn't exist!");
            setMessage(null);
            return;
        }
    }

    return (
        <Container maxWidth="xs" >
            <Card className={classes.emailCard} variant="outlined">
                <CardContent >
                    {error && <Alert severity="error" className={classes.gutterBottom}>{error}</Alert>}
                    {message && <Alert severity="success" className={classes.gutterBottom}>{message}</Alert>}
                    <Typography variant="h5" style={{ textAlign: 'center', fontWeight: 'bold', color: '#555555', marginBottom: '30px' }}>
                        Password Reset
                        </Typography>
                    <FormControl fullWidth className={classes.gutterBottom}>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input
                            id="email"
                            onChange={(event) => setEmail(event.target.value)} />
                    </FormControl>
                    <Button
                        className={classes.emailButton}
                        variant="contained"
                        color="primary"
                        onClick={handleSendMail}
                        disabled={!email.trim().length > 0}
                    >Send</Button>
                </CardContent>
            </Card>
        </Container>
    )
}