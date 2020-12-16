
import React, {useContext, useEffect, useState} from "react";

import SocketContext from "../../context/SocketContext";
import makeStyles from "@material-ui/core/styles/makeStyles";

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MessageTextField from "./MessageTextField";
import SenderContainer from "./SenderContainer";
import MessagesContainer from "./MessagesContainer";
import MessageComponent from "./MessageComponent";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '350px',
    height: '400px',
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function MessageBoard(){
  const classes = useStyles();

  const socketContext = useContext(SocketContext);
  const socket = socketContext.socket;

  const [listMessage, setListMessage] = useState([]);
  useEffect( () => {
    const mockListMessage = [
      {
        content: "Hello I'm Hao",
        name: "Hao"
      },
      {
        content: "Hello I'm Hao. Hello I'm Hao. Hello I'm Hao",
        name: "Hao"
      },
    ];

    setListMessage(mockListMessage);
  }, []);


  const [curMessage, setCurMessage] = useState("");

  const handleBtnSendClick = (event) => {
    event.preventDefault();
    if (curMessage !== ""){
      //handle here
      setCurMessage("");
    }
  }
  return (
  <Paper className={classes.root} elevation={2} >
    <MessagesContainer>
      {
        listMessage.map(message => (<MessageComponent {...message}/>))
      }
      <MessageComponent content="Hello i'm Hao" name="Hao" />
    </MessagesContainer>
    <SenderContainer>
      <form id="msgForm" onSubmit={handleBtnSendClick} style={{flexGrow: "1", marginRight: '5px'}}>
        <MessageTextField
          // className={classes.margin}
          placeholder={"Message... "}
          fullWidth
          variant="outlined"
          defaultValue=""
          id="validation-outlined-input"
          autoComplete='off'
          value = {curMessage}
          onChange = {(event) => {setCurMessage(event.target.value)}}
        />
      </form>
      <SendButton
        variant="contained"
        color="primary"
        type="submit"
        //onClick = {handleBtnSendClick}
        form = "msgForm"
      />
    </SenderContainer>
  </Paper>
  );
}

const SendButton = function (props) {
  return (
    <Button {...props} variant="contained" color="primary" >
      Send
    </Button>
  )
}
