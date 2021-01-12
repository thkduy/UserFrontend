import {io} from "socket.io-client";
import {React, useContext, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {Typography, Button, Box, Divider} from "@material-ui/core";
import SocketContext from "../../context/SocketContext";
import GameBoard from "../GameBoard/GameBoard";
import MessageBoard from "../MessageBoard/MessageBoard";
import GameInfo from "../GameInfo/GameInfo";

export default function GameContainer(){
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
      console.log(newViewerArray);
      setViewers(newViewerArray);
  });
  },[socket]);

  return (
    <>
    <Container>
      {/*<Grid*/}
      {/*    container*/}
      {/*    direction="row"*/}
      {/*    justify="space-between"*/}
      {/*    alignItems="center"*/}
      {/*  >*/}
      {/*  <Box border={1} borderColor="secondary.main" p={1}>*/}
      {/*    Room id: {roomId}*/}
      {/*  </Box>*/}
      {/*    <Box>*/}
      {/*      {players.map((player, index) => <Typography key={index}>Player {index} : {player.name}</Typography>)}*/}
      {/*      {viewers.map((viewer, index) => <Typography key={index}>Viewer {index} : {viewer.name}</Typography>)}*/}
      {/*    </Box>*/}
      {/*      <Button variant="contained" color="secondary" onClick={handleLeave}>*/}
      {/*        Leave game*/}
      {/*      </Button>*/}
      {/*  </Grid>*/}
      {/*  <Divider />*/}
        </Container>
      <Container>
        <Grid container spacing={0}>
          <Grid item xs={8} style={{display: 'flex', justifyContent: 'center', backgroundColor: "#FFEAA7"}}>
            <GameBoard />
          </Grid>
          <Grid item xs ={4}>
            <GameInfo style = {{height: "100%"}}/>
          </Grid>
        </Grid>
      </Container>

    </>
  );
}