import { React, useState, useContext, useEffect } from "react";
import {
    Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Box, Avatar,
    Grid, CircularProgress
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import authUserContext from '../context/AuthUserContext';
import { getRank } from "../api";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    tableHead: {
        color: '#123456',
        fontWeight: 'bold'
    }
});

export default function GameHistory() {
    const classes = useStyles();
    const { 
        token,
        checkAuthenticated,
        signIn,
        setNewToken
    } = useContext(authUserContext);
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await getRank(token);
            const res = await response.json();
            if (response.ok) {
                const data = res.data;
                data.map((item) => {
                    if (item.point < 500) item.rank = 'ForFun ✌';
                    if (item.point >= 500 && item.point < 1000) item.rank = 'Gold ✨';
                    if (item.point >= 1000 && item.point < 1500) item.rank = 'Platinum 🌟';
                    if (item.point >= 1500) item.rank = 'Master 💎';
                    const winrate = item.numOfMatches > 0 ? (100 * item.totalWin / item.numOfMatches) : 0;
                    if(winrate === 100 || winrate === 0)
                        item.winrate = winrate;
                    else item.winrate = winrate.toFixed(2);
                    return true;
                })
                setData(data);
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
    }, [token, checkAuthenticated, signIn, setNewToken]);
    return (
        <Container maxWidth="lg">
            <Typography variant="h4" style={{marginBottom:20}}>Rank</Typography>
            {data ? 
            data.length === 0 ? <Typography variant="h4">None match was found</Typography>:
            <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell width="10%" align="center">ID</TableCell>
                            <TableCell width="30%">User</TableCell>
                            <TableCell width="15%" align="center">Rank</TableCell>
                            <TableCell width="15%" align="center">Point</TableCell>
                            <TableCell width="15%" align="center">Winrate</TableCell>
                            <TableCell width="15%" align="center">Win-Lose</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.length > 0 ? data.map((user, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row" align="center">
                                    {index + 1}
                                </TableCell>
                                <TableCell>
                                    <Grid container direction="row" alignItems="center" >
                                        <Avatar src={user.avatar} />
                                        <Box style={{ marginLeft: 10 }}>
                                            <Typography>{user.name}</Typography>
                                            <Typography>{user.email}</Typography>
                                        </Box>
                                    </Grid>
                                </TableCell>
                                
                                <TableCell align="center">{user.rank}</TableCell>
                                <TableCell align="center">{user.point} ⚜️</TableCell>
                                <TableCell align="center">
                                    {user.winrate}%
                                </TableCell>
                                <TableCell align="center">{user.totalWin}-{user.numOfMatches - user.totalWin}</TableCell>
                            </TableRow>
                        )) : null}
                    </TableBody>
                </Table>
            </TableContainer>:<Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>}
        </Container> 
    );
}