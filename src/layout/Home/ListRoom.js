import React from 'react';
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
const data = [
  {
    "roomid": "12345",
    "player1": "player 1 name",
    "player2": "player 2 name",
    "isLock" : true
  },
  {
    "roomid": "23456",
    "player1": "player 1 name",
    "player2": "",
    "isLock" : false
  },
  {
    "roomid": "34567",
    "player1": "player 1 name",
    "player2": "player 2 name",
    "isLock" : false
  },
  {
    "roomid": "45678",
    "player1": "player 1 name",
    "player2": "",
    "isLock" : true
  },
  {
    "roomid": "56789",
    "player1": "player 1 name",
    "player2": "",
    "isLock" : false
  },
  {
    "roomid": "45678",
    "player1": "player 1 name",
    "player2": "",
    "isLock" : false
  },
  {
    "roomid": "45678",
    "player1": "player 1 name",
    "player2": "",
    "isLock" : true
  },
  {
    "roomid": "45678",
    "player1": "player 1 name",
    "player2": "",
    "isLock" : false
  },
  {
    "roomid": "45678",
    "player1": "player 1 name",
    "player2": "player 2 name",
    "isLock" : true
  },
  {
    "roomid": "45678",
    "player1": "player 1 name",
    "player2": "",
    "isLock" : false
  }
]
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

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
                <TableCell width="10%" align="center">Type</TableCell>
                <TableCell width="20%" align="center">RoomId</TableCell>
                <TableCell width="25%" align="center">Player 1</TableCell>
                <TableCell width="25%" align="center">Player 2</TableCell>
                <TableCell width="20%" align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.length > 0 ? data.map((room, index) => (
                <TableRow key={index}>
                    <TableCell align="center">
                      {room.isLock ? <LockOutlinedIcon color="secondary"/> : <LockOpenOutlinedIcon color="primary"/>}
                    </TableCell>
                    <TableCell align="center">
                        <Typography>{room.roomid}</Typography>
                    </TableCell>
                    <TableCell align="center">
                        <Typography>{room.player1}</Typography>
                    </TableCell>
                    <TableCell align="center">
                        <Typography>{room.player2}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      {room.isLock ? <ButtonDialog roomid={room.roomid}/> : <Button variant="contained" color="primary">Join</Button>}
                    </TableCell>
                </TableRow>
            )) : null}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
