import {io} from "socket.io-client";
import {React, useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
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

export default function GameBoard(){
  const history = useHistory();
  const socketContext = useContext(SocketContext);
  const socket = socketContext.socket;

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
        console.log(newPlayerArray);
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

  // useEffect(() => {
  //   socket.on('join-game', () => {
  //     socket.emit('requireIdUser', localStorage.getItem("user"));
  //   });

  //   socket.on('sendListOnline', (receivedListOnline) => {
  //     let arrListOnline = Object.keys(receivedListOnline).map((key) => receivedListOnline[key]);
  //     console.log(arrListOnline);
  //     setListOnlineUser(arrListOnline);
  //   });
  // });



  return (
      <>
      <Button variant="contained" color="secondary" onClick={handleLeave}>
        Leave game
      </Button>
      {players.map((player, index) => <Typography key={index}>Player {index} : {player.name}</Typography>)}
      {viewers.map((viewer, index) => <Typography key={index}>Viewer {index} : {viewer.name}</Typography>)}
    </>
  );
}