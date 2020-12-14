import {io} from "socket.io-client";
import {React, useContext, useEffect, useState} from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {Typography} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import SocketContext from "../../context/SocketContext";

export default function ListUsers(){

  const socketContext = useContext(SocketContext);
  const socket = socketContext.socket;
  console.log("use socket "+ socket);

  let [listOnlineUser, setListOnlineUser] = useState([]);

  useEffect( () => {
    socket.on('requireIdUser', () => {
      socket.emit('requireIdUser', localStorage.getItem("user"));
    });

    socket.on('sendListOnline', (receivedListOnline) => {
      let arrListOnline = Object.keys(receivedListOnline).map((key) => receivedListOnline[key]);
      console.log(arrListOnline);
      setListOnlineUser(arrListOnline);
    });
  }, []);



  return (<>
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
  </>);
}