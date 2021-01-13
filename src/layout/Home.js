import { React, useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  TextField,
  Box,
  Grid,
  Typography
} from "@material-ui/core";

import ListUsers from "./Home/ListUsers";
import ListRoom from "./Home/ListRoom";
import ButtonDialogPlayNow from "./Home/DialogPlayNow";

import authUserContext from '../context/AuthUserContext';
import SocketContext from "../context/SocketContext";


export default function Home() {
  const history = useHistory();
  const socketContext = useContext(SocketContext);
  const socket = socketContext.socket;
  const data = useContext(authUserContext);
  const user = data.user;

  const [roomId, setRoomId] = useState('');

  const handleChange = (event) => {
    setRoomId(event.target.value)
  }

  const handleCreateNewGame = () => {
    socket.emit('create-game', user);

  }

  useEffect(() => {
    socket.on('new-game-id', (roomId) =>{
      console.log(roomId);
      history.push(`/game/${roomId}`);
    });
    return () => {
      socket.off('new-game-id');
    }
  }, []);

  const handleJoinGame = () => {
    socket.emit('join-game', roomId, user, (error) => {
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
    <>
      { data.isAuthenticated ?
        <>
          <Container maxWidth="lg">
            <Box display="flex" flexDirection="row" justifyContent="space-between" style={{ marginBottom: 20 }}>
              <Box display="flex">
                <Button variant="contained" color="secondary" onClick={handleCreateNewGame}>
                  New game
                  </Button>
                <ButtonDialogPlayNow />
              </Box>

              <Box display="flex" alignItems="center">
                <TextField size="small" label="Enter game code" value={roomId} variant="outlined" onChange={handleChange} />
                <Button variant="contained" color="secondary" onClick={handleJoinGame} style={{ marginLeft: 10 }}>
                  Join game
                  </Button>
              </Box>
            </Box>
            <Grid container spacing={1}>
              <Grid item xs={9}>
                <ListRoom />
              </Grid>
              <Grid item xs={3}>
                <ListUsers />
              </Grid>
            </Grid>
          </Container>
        </>
        :
        <Typography variant="h1">
          Welcome to Caro Online !
          </Typography>
      }
    </>
  )
}