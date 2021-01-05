import { React, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
    Grid,
    Card,
    CardHeader,
    CardContent,
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { activateAccount } from "../api";

export default function Home() {
    //const history = useHistory();
    const { token } = useParams();
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    useEffect(async () => {
        const response = await activateAccount(token);
        const res = await response.json();
        if (response.ok) {
            setMessage(res.message);
        } else if (response.status === 400) {
            setIsError(true);
            setMessage(res.message);
            return;
        }
    }, []);

    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            <Card>
                <CardHeader
                    title="Activate account"
                />
                <CardContent>
                    {
                    isError?<Alert severity="error">{message}</Alert>:
                    <Alert severity="success">{message}</Alert>
                    }
                    
                </CardContent>
            </Card>
        </Grid>
        
    )
}