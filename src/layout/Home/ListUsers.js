import {io} from "socket.io-client";
import {React, useContext, useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {Typography} from "@material-ui/core";
import SocketContext from "../../context/SocketContext";
import AuthUserContext from "../../context/AuthUserContext";

export default function ListUsers(){

  const socketContext = useContext(SocketContext);
  const socket = socketContext.socket;

  const auth = useContext(AuthUserContext);

  let [users, setUsers] = useState([]);

  useEffect( () => {
    // console.log('listuser ON mount')
    socket.emit('required-list-online');
    socket.emit('new-user-online', auth.user);
    // console.log('socket emitted');
    socket.on('list-online', (listUsers) => {
      // let arrListOnline = Object.keys(receivedListOnline).map((key) => receivedListOnline[key]);
      console.log('list-online ' + JSON.stringify(listUsers));
      setUsers(listUsers);
    });
    return () => {
      // console.log('listuser UN mount');
      socket.off('list-online');
    }
  }, []);



  return (<>
    {/* <Container>
      <Grid container style={{marginTop: 50}} component="section">
        <Grid item xs={6}> */}
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
                  {users.map((user, index) => (
                    <TableRow key={index}>
                      <TableCell width="25%">
                        <Typography variant="h5">
                          {index + 1}
                        </Typography>
                      </TableCell>
                      <TableCell width="75%">
                        <Grid container spacing={1} alignItems="center">
                          {/*<Grid item>*/}
                          {/*  <Avatar />*/}
                          {/*</Grid>*/}
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
        {/* </Grid>
      </Grid>
    </Container> */}
  </>);
}