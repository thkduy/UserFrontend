import { React, useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  TextField,
  Box,
  Grid,
} from "@material-ui/core";

import ListUsers from "./Home/ListUsers";
import ListRoom from "./Home/ListRoom";
import ButtonDialogPlayNow from "./Home/DialogPlayNow";
import ButtonDialogNewGame from "./Home/DialogNewGame";

import authUserContext from '../context/AuthUserContext';
import SocketContext from "../context/SocketContext";
import Container from "@material-ui/core/Container";


export default function Home() {
  const history = useHistory();

  const socketContext = useContext(SocketContext);
  const socket = socketContext.socket;
  const data = useContext(authUserContext);
  const user = data.user;

  useEffect(() => {
    if (!data.isAuthenticated) {
      history.push('/login')
    }
  })

  const [roomId, setRoomId] = useState('');

  const handleChange = (event) => {
    setRoomId(event.target.value)
  }

  useEffect(() => {
    socket.on('new-game-id', (roomId) =>{
      console.log('new-game-id' + roomId);
      history.push(`/game/${roomId}`);
    });

    return () => {
      socket.off('new-game-id');
    }
  }, []);

  const handleJoinGame = () => {
    socket.emit('join-game', roomId, user, '', (error) => {
      console.log('join-game ' + roomId);
      if(error) {
        alert(error);
        setRoomId('');
      }
      else{
        history.push(`/game/${roomId}`);
      }
    });
  }

  return (
    <Container maxWidth="lg">
      <Box display="flex" flexDirection="row" justifyContent="space-between" style={{ marginBottom: 20 }}>
        <Box display="flex">
          {/*<Button variant="contained" color="secondary" onClick={handleCreateNewGame}>*/}
          {/*  New game*/}
          {/*</Button>*/}
          <ButtonDialogNewGame />
          <ButtonDialogPlayNow />
        </Box>

        <Box display="flex" alignItems="center">
          <TextField size="small" label="Enter game code" value={roomId} variant="outlined" onChange={handleChange} />
          <Button variant="contained" color="secondary" onClick={handleJoinGame} style={{ marginLeft: 10 }}>
            Join game
          </Button>
        </Box>
      </Box>
      <Grid container spacing={10}>
        <Grid item xs={8}>
          <ListRoom />
        </Grid>
        <Grid item xs={4}>
          <ListUsers />
        </Grid>
      </Grid>
    </Container>
  )
}