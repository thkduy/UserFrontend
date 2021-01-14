
import React, { useEffect, useState, useContext } from "react";
import {
    Container,
    Paper, 
    Typography,
    Grid,
    Box,
    Avatar,
    CircularProgress
} from "@material-ui/core";
import { getGame } from '../../api';
import authUserContext from '../../context/AuthUserContext';
import ChatBox from './ChatBox';
import GameBoard from "./GameBoard";

export default function ViewGame() {
    const { 
        token,
        checkAuthenticated,
        signIn,
        setNewToken
    } = useContext(authUserContext);
    const [data, setdata] = useState(null);
    useEffect(() => {
        async function fetchData() {
            let params = new URLSearchParams(window.location.search);
            const id = params.get('gameid');
            const response = await getGame(token, id);
            const res = await response.json();
            if (response.ok) {
                setdata(res.data);
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
            <Grid container spacing={1}>
                <Grid item xs={9}>
                    <Paper>
                        {data ? 
                        <Box display="flex" flexDirection="column">
                            <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" p={1}>
                                <Box display="flex" justifyContent="center" alignItems="center" mr={2}>
                                    <Avatar src={data[0].player1.avatar} />
                                    <Box style={{ marginLeft: 10 }}>
                                        <Typography>{data[0].player1.name}</Typography>
                                        <Typography>Turn: {data[0].firstMoveBy === 1 ? "X" : "O"}</Typography>
                                    </Box>
                                </Box>
                                <Typography variant="h4" color="secondary">VS</Typography>
                                <Box display="flex" justifyContent="center" alignItems="center" mr={2}>
                                    <Avatar src={data[0].player2.avatar} />
                                    <Box style={{ marginLeft: 10 }}>
                                        <Typography>{data[0].player2.name}</Typography>
                                        <Typography>Turn: {data[0].firstMoveBy === 2 ? "X" : "O"}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                            {data ? <GameBoard steps={data[0].steps}/> : null}
                        </Box>
                        :<Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>}
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper style={{ height: '400px', overflowY: 'scroll' }}>
                        {data && data.length > 0 ? 
                            data.map((game) => game.messages.map((message, index) => <ChatBox key={index} {...message} />)): 
                            <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}