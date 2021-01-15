import {makeStyles} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import React, {useContext} from "react";
import MessageBoard from "../MessageBoard/MessageBoard";
import Button from "@material-ui/core/Button";
import PlayerContainer from "./PlayerContainer";
import GameContext from "../../context/GameContext";
import SocketContext from "../../context/SocketContext";
import {useParams} from "react-router-dom";

const useStyles = makeStyles({
  root: {
    height: "100%",
    backgroundColor: "#99CCEE",
    padding: "10px",
    boxSizing: "border-box",
    "& > *" : {
      boxSizing: "border-box"
    }
  },
  flexRow: {
    display: "flex",
    justifyContent: "center"
  },

  title: {
    display: "flex",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: "14px",
    height: "25px",
    borderBottom: "1.5px solid #999999",
    marginBottom: "10px",
  },

  monitors: {
    borderTop: "1.5px solid #999999",
    display: "flex",
    flexDirection: "row",
    height: "30px",
    marginTop: "20px",
    "& > *": {
      fontSize: "14px",
      margin: "5px"
    }
  },
  request: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: '20px'
  },
  button: {
    backgroundColor: '#1F2930',
    '&:hover': {
      backgroundColor: '#000000',
    },
    color: '#FFFFFF',
    fontWeight: 'bold',
    textTransform: 'none',
    border: '2px solid #5C5A46',
    borderRadius: '10px',
    fontSize: "12px"

  }
})

export default function GameInfo(props){
  const gameContext = useContext(GameContext);
  const socketContext = useContext(SocketContext);
  const socket = socketContext.socket;

  const classes = useStyles();

  const {roomId} = useParams();

  const handleDrawRequestClicked = () => {
    if (gameContext.sessionPlayer) {
      socket.emit('draw-request', roomId, gameContext.sessionPlayer);
    }
  }
  const handRejectRequestClicked = () => {
    if (gameContext.sessionPlayer) {
      socket.emit('reject-draw-request', roomId);
    }
  }

  return (
    <div className={classes.root}>
      <div style={{height: "230px"}}>
        <div className={classes.title}>
          Room #{props.roomId}
        </div>

        <div className={classes.flexRow}>
          <PlayerContainer
            title="Player 1"
            playerNumber="player1"
            playerName={props.player1Name ? props.player1Name : null}
            countDown={'player' + gameContext.playTurn === 'player1'}
            time={45}
            canStandUp = {(gameContext.sessionPlayer === 'player1' && gameContext.gameResult !== -1)}
          />
          <PlayerContainer
            title="Player 2"
            playerNumber="player2"
            playerName={props.player2Name ? props.player2Name : null}
            countDown={'player' + gameContext.playTurn === 'player2'}
            time={45}
            canStandUp = {(gameContext.sessionPlayer === 'player2' && gameContext.gameResult !== -1)}/>
        </div>
        <div className={classes.monitors}>
          <Button
            disabled={!(gameContext.sessionPlayer && gameContext.gameResult == -1)}
            variant="outlined"
            color="primary"
            style={{height: "30px", textTransform: 'none'}}
            onClick={handleDrawRequestClicked}>
            Request draw
          </Button>
          <Button
            disabled={!(gameContext.sessionPlayer && gameContext.gameResult == -1)}
            variant="outlined"
            color="primary"
            style={{height: "30px", textTransform: 'none'}}
            onClick={() => gameContext.surrender()}
            >
            Surrender
          </Button>
        </div>
        {
          gameContext.drawStatus === 1 ?
            <div className={classes.request}>
              <div style={{fontSize: "13px", marginRight: "10px", fontWeight: 'bold', color: ""}}>
                Partner sent a draw request
              </div>
              <Button
                variant="outlined"
                size="small"
                className={classes.button}
                style={{marginRight: "10px"}}
                onClick={handleDrawRequestClicked}
              >
                Accept
              </Button>
              <Button
                variant="outlined"
                size="small"
                className={classes.button}
                onClick={handRejectRequestClicked}

              >
                No
              </Button>

            </div> :
              <>
                {
                  gameContext.drawStatus === 0 ?
                    <div className={classes.request} style={{fontSize: "13px", marginRight: "10px", fontWeight: 'bold', color: ""}}>
                      Draw request sent
                    </div> : <> </>
                }
            </>


        }


      </div>

      <MessageBoard />
    </div>
  )

}