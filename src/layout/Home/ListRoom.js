import React, {useContext, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import ButtonDialog from './DialogJoinGame';
import SocketContext from "../../context/SocketContext";
import AuthUserContext from "../../context/AuthUserContext";
import {useHistory} from "react-router-dom";
// const data = [
//   {
//     "roomid": "12345",
//     "player1": "player 1 name",
//     "player2": "player 2 name",
//     "isLock" : true
//   }
// ]
const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 600,
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const authContext = useContext(AuthUserContext);
  const socketContext = useContext(SocketContext);
  const socket = socketContext.socket;
  const user = authContext.user;

  const [rooms, setRooms] = useState([]);
  const history = useHistory();

  const handleJoinGame = (roomId) => {
    socket.emit('join-game', roomId, user, (error) => {
      console.log('join-game ' + roomId);
      if(error) {
        alert(error);
      }
      else{
        history.push(`/game/${roomId}`);
      }
    });
  }

  useEffect( () => {
    socket.emit('all-rooms-info');
    socket.on('all-rooms-info', allRooms => {
      console.log('all-rooms-info ' + JSON.stringify(allRooms))
      if (!allRooms) setRooms([]);
      else setRooms(allRooms);
    });
    return (() => {
      socket.off('all-rooms-info');
    })
  }, []);

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
                <TableCell width="10%" align="center" />
                <TableCell width="20%" align="center">RoomId</TableCell>
                <TableCell width="25%" align="center">Player 1</TableCell>
                <TableCell width="25%" align="center">Player 2</TableCell>
                <TableCell width="20%" align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms && rooms.length > 0 ? rooms.map((room, index) => (
                <TableRow key={index}>
                    <TableCell align="center">
                      {room.isLock ? <LockOutlinedIcon color="secondary"/> : <LockOpenOutlinedIcon color="primary"/>}
                    </TableCell>
                    <TableCell align="center">
                        <Typography>{room.roomId}</Typography>
                    </TableCell>
                    <TableCell align="center">
                        <Typography>{room.player1}</Typography>
                    </TableCell>
                    <TableCell align="center">
                        <Typography>{room.player2}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      {room.isLock ?
                        <ButtonDialog roomId={room.roomId}/> :
                        <Button variant="contained" color="primary" onClick={() => handleJoinGame(room.roomId)}>Join</Button>}
                    </TableCell>
                </TableRow>
            )) : null}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
