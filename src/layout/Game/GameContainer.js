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
import Button from "@material-ui/core/Button";
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
  let sessionPlayer = null;

  const[result, setResult] = useState(-1);

  const [messages, setMessages] = useState([]);

  const handleLeave = () => {
    socket.emit('leave-game');
    history.push('/');
  }

  useEffect(() => {
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
      setMessages(room.messages);

      setPlayer1(room.player1);
      if (room.player1) {
        if (room.player1._id === user._id) {
          sessionPlayer = 'player1';
        }
      }

      setPlayer2(room.player2);
      if (room.player2){
        if (room.player2._id === user._id) {
          sessionPlayer = 'player2';
        }
      }
      setSessionPlayerState(sessionPlayer);

      if ((sessionPlayer || sessionPlayerState) === ('player' + room.playTurn) && room.player1Status && room.player2Status) {
        setBoardEnabled(true);
      }
      else {
        setBoardEnabled(false);
      }

    });

    socket.on('ask-for-starting-new-match', (roomId) => {
      console.log('ask-for-starting-new-match');
      if (sessionPlayer) {
        console.log('emit accept-start-new-match ' + roomId + ' ' + sessionPlayer);
        socket.emit('accept-start-new-match', roomId, sessionPlayer);
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

  return (
    <GameContext.Provider value={{
      handleGoingToPlayClick: handleGoingToPlayClick,
      handleCellClicked: handleCellClicked,
      boardEnabled: boardEnabled,
      handleAcceptStartNewMatchClicked: handleAcceptStartNewMatchClicked,
      sessionPlayer: sessionPlayerState,
      gameResult: result,
      handleStandUp: handleStandUp
    }}>
      <Container>
        <Grid container spacing={0}>
          <Grid item xs={8} style={{display: 'flex', justifyContent: 'center', backgroundColor: "#FFEAA7", position: 'relative'}}>
            <GameBoard boardState={boardState}/>
            {result !== -1 ?
              (sessionPlayerState ?
                <ResultGameDialog message={'Player #' + result + ' won'}  />
                : <AnnotationDialog message={'Player #' + result + ' won'} />
              )
              : <> </>
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