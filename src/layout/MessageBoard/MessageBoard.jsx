
import React, {useContext, useEffect, useState} from "react";

import SocketContext from "../../context/SocketContext";
import makeStyles from "@material-ui/core/styles/makeStyles";

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MessageTextField from "./MessageTextField";
import SenderContainer from "./SenderContainer";
import MessagesContainer from "./MessagesContainer";
import MessageComponent from "./MessageComponent";
import {useParams} from "react-router-dom";
import GameContext from "../../context/GameContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: "350px",
    backgroundColor: '#FFFFFF',
    border: "1px solid black"
  },
  margin: {
    margin: theme.spacing(1),
  },
  title: {
    height: "20px",
    backgroundColor: "#1F2930",
    padding: "5px 5px",
    fontWeight: "bold",
    fontSize: "12px",
    color: "#FFFFFF"
  }
}));

export default function MessageBoard(){
  const classes = useStyles();

  // const socketContext = useContext(SocketContext);
  // const socket = socketContext.socket;
  // const user = JSON.parse(localStorage.getItem("user"));

  const {roomId} = useParams();

  //const [listMessage, setListMessage] = useState([]);

  const gameContext = useContext(GameContext);
  const listMessage = gameContext.messages;
  console.log(listMessage);
  const [curMessage, setCurMessage] = useState("");
  const handleBtnSendClick = (event) => {
    event.preventDefault();
    if (curMessage != "") {
      gameContext.emitMessage(curMessage);
      setCurMessage("");
    }
  }

  // const handleBtnSendClick = (event) => {
  //   event.preventDefault();
  //   if (curMessage !== ""){
  //     //handle here
  //     socket.emit("userSendMessage", {roomId: roomId, message: {name: user.name, content: curMessage}});
  //     setCurMessage("");
  //   }
  // }
  //
  // useEffect(()=> {
  //   socket.on("serverBroadcastMessages", (newListMessages) => {
  //     setListMessage(newListMessages);
  //   });
  // }, []);

  return (
  <div className={classes.root} >
    <div className={classes.title}>
      Messages
    </div>
    <MessagesContainer>
      {
        listMessage.map(message => (<MessageComponent {...message}/>))
      }
    </MessagesContainer>
    <SenderContainer>
      <form id="msgForm" onSubmit={handleBtnSendClick} style={{flexGrow: "1", marginRight: '5px'}}>
        <MessageTextField
          // className={classes.margin}
          placeholder={"Message..."}
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
  </div>
  );
}

const SendButton = function (props) {
  return (
    <Button {...props} variant="contained" color="primary" >
      Send
    </Button>
  )
}
