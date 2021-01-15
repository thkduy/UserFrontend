import {io} from "socket.io-client";
import {React, useContext, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import SocketContext from "../../context/SocketContext";
import GameBoard from "../GameBoard/GameBoard";
import GameInfo from "../GameInfo/GameInfo";
import authUserContext from "../../context/AuthUserContext";
import GameContext from "../../context/GameContext";
import ResultGameDialog from "./ResultGameDialog";
import AnnotationDialog from "./AnnotationDialog";

export default function GameContainer(){
  const history = useHistory();
  const socketContext = useContext(SocketContext);
  const socket = socketContext.socket;

  const data = useContext(authUserContext);
  const user = data.user;

  const {roomId} = useParams();

  const getDefaultBoardState = () => {
    const defaultBoardState = new Array(16);
    for (let i = 0; i < 16; i++) {
      defaultBoardState[i] = new Array(16);
      for (let j = 0; j < 16; j++) {
        defaultBoardState[i][j] = 0;
      }
    }
    return defaultBoardState;
  }
  const [boardState, setBoardState] = useState(getDefaultBoardState());
  const [boardEnabled, setBoardEnabled] = useState(false);

  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);

  const [sessionPlayerState, setSessionPlayerState] = useState(null);


  const[result, setResult] = useState(-1);

  const [messages, setMessages] = useState([]);
  const [drawStatus, setDrawStatus] = useState(null); //0: me //1: partner
  const [playTurn, setPlayTurn] = useState(0);

  const handleLeave = () => {
    socket.emit('leave-game');
    history.push('/');
  }

  useEffect(() => {
    let sessionPlayer = null;
    socket.emit('join-game', roomId, user, (error) => {
      console.log('join-game ' + roomId);
      if(error) {
        alert(error);
      }

    });
    socket.on('room-info', (room) => {
      console.log('room-info ' + JSON.stringify(room))

      if (room.lastMatch){
        const newBoardState = getDefaultBoardState();
        let step;
        for (step of room.lastMatch.steps){
          newBoardState[step.positionX][step.positionY] = step.value;
        }
        setBoardState(newBoardState);

      }
      setResult(room.currentResultStatus);
      setMessages(room.messages.map(value => {
        return {name: value.owner.name, content: value.content}
      }));

      setPlayer1(room.player1);
      setPlayer2(room.player2);
      if (room.player1 && room.player1._id === user._id) {
          sessionPlayer = 'player1';
      }
      else if (room.player2 && room.player2._id === user._id){
          sessionPlayer = 'player2';
      }
      else {
        sessionPlayer = null;
      }
      setSessionPlayerState(sessionPlayer);
      setPlayTurn(room.playTurn);

      if ((sessionPlayer) === ('player' + room.playTurn) && room.player1Status && room.player2Status) {
        setBoardEnabled(true);
      }
      else {
        setBoardEnabled(false);
      }

      if ((sessionPlayer) && room.drawRequests && room.drawRequests.length > 0){
        if (room.drawRequests[0] === (sessionPlayer)) {
          setDrawStatus(0);
        }
        else setDrawStatus(1);
      }
      else setDrawStatus(null);


    });

    socket.on('ask-for-starting-new-match', (roomId) => {
      console.log('ask-for-starting-new-match');
      if (sessionPlayer) {
        console.log('emit accept-start-new-match ' + roomId + ' ' + sessionPlayer);
        socket.emit('accept-start-new-match ', roomId, sessionPlayer);
      }
    });

    socket.on('start-new-match', (roomId, playTurn) => {
      console.log('start-new-match ' + playTurn);
      if (sessionPlayer === 'player' + playTurn) {
        setBoardEnabled(true);
      }
    });

    socket.on('end-game', gameResult => {
      setBoardEnabled(false);
      console.log('end-game ' + JSON.stringify(gameResult));
    });

    socket.on('messages', messages => {
      setMessages(messages);
    })

    return () => {
      socket.off('room-info');
      socket.off('ask-for-starting-new-match');
      socket.off('start-new-match');
      socket.off('end-game');
      socket.off('messages');
    }

  },[]);

  const handleGoingToPlayClick = (playerNum) => {
    if (playerNum === 'player1'){
      if (player2 && player2._id === user._id){
        return false;
      }
    }
    else { //playerNum === 'player2'
      if (player1 && player1._id === user._id){
        return false;
      }
    }
    socket.emit("set-player", roomId, playerNum, user);
  }

  const handleCellClicked = (row, col) => {
    if (boardEnabled) {
      setBoardEnabled(false);
      socket.emit("chess-move", roomId, row, col);
    }
  }

  const handleAcceptStartNewMatchClicked = () => {
    if (sessionPlayerState) {
      console.log('emit accept-start-new-match ' + roomId + ' ' + sessionPlayerState);
      socket.emit('accept-start-new-match', roomId, sessionPlayerState);
    }
  }

  const handleStandUp = (playerNumber) => {
    console.log('emit stand-up ' + playerNumber);
    if (sessionPlayerState === playerNumber) {
      socket.emit('stand-up', roomId, sessionPlayerState);

    }
  }
  const emitMessage = (curMessage) => {
    socket.emit('message', roomId, user, curMessage);
  }

  const surrender = () => {
    console.log('surrender');
    setBoardEnabled(false);
    if (sessionPlayerState) {
      socket.emit('surrender', roomId, sessionPlayerState);
    }
  }

  const mappingRoomResultToAnnotation = {
    "-2": <AnnotationDialog message= {sessionPlayerState ? 'Waiting for new opponent...' : 'Please choose your chair'}/> ,
    "-1": <></>,
    "0": <ResultGameDialog message={'Draw'} isPlayer={sessionPlayerState != null}/>,
    "1": <ResultGameDialog message={'Player #1 won'} isPlayer={sessionPlayerState != null} />,
    "2": <ResultGameDialog message={'Player #2 won'} isPlayer={sessionPlayerState != null} />,
  }

  return (
    <GameContext.Provider value={{
      handleGoingToPlayClick: handleGoingToPlayClick,
      handleCellClicked: handleCellClicked,
      boardEnabled: boardEnabled,
      handleAcceptStartNewMatchClicked: handleAcceptStartNewMatchClicked,
      sessionPlayer: sessionPlayerState,
      gameResult: result,
      handleStandUp: handleStandUp,
      emitMessage: emitMessage,
      messages: messages,
      surrender: surrender,
      drawStatus: drawStatus,
      playTurn: playTurn,

    }}>
      <Container>
        <Grid container spacing={0}>
          <Grid item xs={8} style={{display: 'flex', justifyContent: 'center', backgroundColor: "#FFEAA7", position: 'relative'}}>
            <GameBoard boardState={boardState}/>
            {
              mappingRoomResultToAnnotation[result]
            }
          </Grid>
          <Grid item xs ={4}>
            <GameInfo
              style = {{height: "100%"}}
              roomId={roomId}
              player1Name={player1 ? player1.name: null}
              player2Name={player2 ? player2.name: null}/>
          </Grid>
        </Grid>
      </Container>
    </GameContext.Provider>
  );
}