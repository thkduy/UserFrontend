import { React, useState, useContext, useEffect } from "react";
import {
    Typography,
    Container,
    Paper,
    Avatar,
    Box
} from "@material-ui/core";
import jwt from "jsonwebtoken";
import { makeStyles } from '@material-ui/core/styles';
import authUserContext from '../context/AuthUserContext';
import { getInfo } from '../api';

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: theme.spacing(20),
        height: theme.spacing(20),
        marginBottom: 10
    },
    title: {
        color: '#fff',
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.main,
        border: `1px solid ${theme.palette.primary.main}`,
        paddingLeft: 15,
        paddingTop: 5,
        paddingBottom: 5
    }
}));

export default function Profile() {
    const classes = useStyles();
    const { 
        token,
        checkAuthenticated,
        signIn,
        setNewToken
    } = useContext(authUserContext);
    const [user, setUser] = useState(null);
    const [rank, setRank] = useState('');

    useEffect(() => {
        async function fetchData(){
            const response = await getInfo(token, id);
            const res = await response.json();
            if (response.ok) {
                const data = res.data;
                if (data.point < 500) setRank('ForFun ✌');
                else if (data.point >= 500 && data.point < 1000) setRank('Gold ✨');
                else if (data.point < 1500 && data.point >= 500) setRank('Platinum 🌟');
                else setRank('Master 💎');
                setUser(data);
            } else if(response.status === 401){
                checkAuthenticated(false);
                signIn([]);
                setNewToken("");
                localStorage.removeItem("user");
                localStorage.removeItem("isAuthenticated");
                localStorage.removeItem("token");
            }
        }
        fetchData();
    }, [token]);
    return (
        <>
            {user ?
                <Container maxWidth="md">
                    <Paper>
                        <Box display="flex" flexDirection="row" justifyContent="space-evenly" p={1}>
                            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                                <Avatar variant="rounded" src={user.avatar} className={classes.avatar} />
                                <Typography variant="h4">{user.name}</Typography>
                            </Box>
                            <Box display="flex" flexDirection="column">
                                <Box display="flex" flexDirection="column" m={1}>
                                    <Typography className={classes.title}>User information</Typography>
                                    <Box border={1} borderColor="primary.main" display="flex" flexDirection="column" p={2} >
                                        <Typography>Email: {user.email}</Typography>
                                        <Typography>Account type: {user.accountType}</Typography>
                                        <Typography>Create at:  {user.createdDate.substring(0, 10)}</Typography>
                                    </Box>
                                </Box>
                                <Box display="flex" flexDirection="column" m={1}>
                                    <Typography className={classes.title}>Account information</Typography>
                                    <Box border={1} borderColor="primary.main" display="flex" flexDirection="column" p={2} >
                                        <Typography>Rank: {rank}</Typography>
                                        <Typography>Win rate: {user.numOfMatches > 0 ? (100 * user.totalWin / user.numOfMatches).toFixed(2) : 0}%</Typography>
                                        <Typography>The number of match: {user.numOfMatches}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
                : null}
        </>
    );
}