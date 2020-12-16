import {React, useContext, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {Typography, Button, Box, Grid, Container, Divider} from "@material-ui/core";
import { borders } from '@material-ui/system';
import SocketContext from "../../context/SocketContext";

export default function GameBoard(){
  const history = useHistory();
  const socketContext = useContext(SocketContext);
  const socket = socketContext.socket;

  const {roomId} = useParams();
  const [players, setPlayers] = useState([]);
  const [viewers, setViewers] = useState([]);

  const handleLeave = () => {
    socket.emit('leave-game');
    history.push('/');
  }
  
  useEffect(() => {
    socket.on('roomPlayer', (data) =>{
        const newPlayerArray = [];
        data.players.map((player) => {
            newPlayerArray.push(player.user);
            return 0;
        });
        setPlayers(newPlayerArray);
    });

    socket.on('roomViewer', (data) =>{
      const newViewerArray = [];
      data.viewers.map((viewer) => {
        newViewerArray.push(viewer.user);
          return 0;
      })
      setViewers(newViewerArray);
  });
  },[socket]);

  return (
      <Container>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
        <Box border={1} borderColor="secondary.main" p={1}>
          Room id: {roomId}
        </Box>
          <Box>
            {players.map((player, index) => <Typography key={index}>Player {index} : {player.name}</Typography>)}
            {viewers.map((viewer, index) => <Typography key={index}>Viewer {index} : {viewer.name}</Typography>)}
          </Box>
            <Button variant="contained" color="secondary" onClick={handleLeave}>
              Leave game
            </Button>
        </Grid>
        <Divider />
      </Container>
  );
}