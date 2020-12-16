import {io} from "socket.io-client";
import {React, useContext, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {Typography, Button} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import SocketContext from "../../context/SocketContext";
import GameBoard from "../GameBoard/GameBoard";
import MessageBoard from "../MessageBoard/MessageBoard";

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
      <Button variant="contained" color="secondary" onClick={handleLeave}>
        Leave game
      </Button>
      {players.map((player, index) => <Typography key={index}>Player {index} : {player.name}</Typography>)}
      {viewers.map((viewer, index) => <Typography key={index}>Viewer {index} : {viewer.name}</Typography>)}
      <Grid container spacing={2}>
        <Grid item xs={7} style={{display: 'flex', justifyContent: 'flex-end'}}>
          <GameBoard />
        </Grid>
        <Grid item xs ={5}>
          <MessageBoard />
        </Grid>
      </Grid>
    </>
  );
}