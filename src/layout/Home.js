import {React, useEffect, useState, useContext} from "react";
import {useHistory} from "react-router-dom";
import {
  Button,
  TextField
} from "@material-ui/core";

import ListUsers from "./Home/ListUsers";

import authUserContext  from '../context/AuthUserContext';
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
    socket.emit('create-game', { user });
    socket.on('get-new-game-id', (data) =>{
      // console.log(data);
      history.push(`/game/${data.roomId}`);
    });
  }

  const handleJoinGame = () => {
    socket.emit('join-game',{ user, roomId},(error) => {
      if(error) {
        alert(error);
        setRoomId('');
      }else{
        history.push(`/game/${roomId}`);
      }
    });

  }

  return (
    <>
      {/*<ListUsers />*/}
      <Button variant="contained" color="secondary" onClick={handleCreateNewGame}>
        Create new game
      </Button>
      <TextField label="Enter game code" value={roomId} variant="outlined" onChange={handleChange}/>
      <Button variant="contained" color="secondary" onClick={handleJoinGame}>
        Join game
      </Button>
    </>
  );
}

