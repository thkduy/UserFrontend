import {React, useEffect, useState} from "react";
import {
  Typography,
} from "@material-ui/core";
import {io} from 'socket.io-client';
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";

import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.SERVER_HOST);

const socket = io('http://localhost:3001', {
  withCredentials: true,

});

export default function Home() {
  let [listOnlineUser, setListOnlineUser] = useState([]);

  socket.on('requireIdUser', () => {
    socket.emit('requireIdUser', localStorage.getItem("user"));
  });

  socket.on('sendListOnline', (receivedListOnline) => {
    let arrListOnline = Object.keys(receivedListOnline).map((key) => receivedListOnline[key]);
    console.log(arrListOnline);
    setListOnlineUser(arrListOnline);
  });

  return (
    // <ListUserContainer>
    //     {listOnlineUser.map(user =>
    //         <Typography variant='h5'>
    //             {user.name}
    //         </Typography>
    //     )}
    // </ListUserContainer>
    <>
      <Container>
        <Grid container style={{marginTop: 50}} component="section">
          <Grid item xs={6}>
            <Paper>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell width="25%" style={{fontWeight: 'bold'}}>Number</TableCell>
                    <TableCell width="75%" style={{fontWeight: 'bold'}}>Participant</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  <>
                    {listOnlineUser.map((user, index) => (
                      <TableRow key={index}>
                        <TableCell width="25%">
                          <Typography variant="h5">
                            {index + 1}
                          </Typography>
                        </TableCell>
                        <TableCell width="75%">
                          <Grid container spacing={2} alignItems="center">
                            <Grid item>
                              <Avatar />
                            </Grid>
                            <Grid item>
                              <Typography variant="h5">
                                {user.name}
                              </Typography>
                            </Grid>
                          </Grid>
                        </TableCell>
                        {/*<TableCell align="right" width="5%">*/}
                        {/*  <IconButton aria-label="delete"*/}
                        {/*              onClick={() =>{}}>*/}
                        {/*    /!*<HighlightOffIcon/>*!/*/}
                        {/*  </IconButton>*/}
                        {/*</TableCell>*/}
                      </TableRow>
                    ))}</>

                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

