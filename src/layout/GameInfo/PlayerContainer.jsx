import React, {useContext} from "react";
import {makeStyles} from "@material-ui/core";
import GameContext from "../../context/GameContext";
import Button from "@material-ui/core/Button";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles({
  player: {
    width: "45%",
    margin: "0px 10px",

  },
  playerTitle: {
    height: "15px",
    backgroundColor: "#1F2930",
    padding: "3px 5px",
    fontWeight: "bold",
    fontSize: "11px",
    color: "#FFFFFF"
  },
  playerName: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "40px",
    fontSize: "14px",
    border: "1px solid black",
    backgroundColor: "#FFFFFF",
    marginBottom: "5px",
    position: 'relative'
  },
  joinRoom: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "40px",
    fontSize: "14px",
    border: "2px solid #BBBBBB",
    backgroundColor: "#DDDDDD",
    marginBottom: "5px"
  },
  playerTime: {
    display: "flex",
    alignItems: "center",
    fontSize: "14px",

  },
  button: {
    backgroundColor: '#1F2930',
    '&:hover': {
      backgroundColor: '#000000',
    },
    color: '#FFFFFF',
    fontWeight: 'bold',
    textTransform: 'none',
    borderRadius: '10px',
  }
});

export default function PlayerContainer(props){
  const classes = useStyles();
  const gameContext = useContext(GameContext);


  return (
    <div className={classes.player}>
      <div className={classes.playerTitle}>
        {props.title}
      </div>
      {
        props.playerName ?
          <div>
            <div className={classes.playerName}>

              <div style={props.countDown ? {fontWeight: 'bold'} : {}}>
                {props.playerName}
              </div>
              {
                props.canStandUp ?
                  <IconButton
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    style={{
                      height: '25px',
                      width: '5px',
                      position: 'absolute',
                      right: '0px',
                      marginRight: '3px'
                    }}
                    onClick={() => {gameContext.handleStandUp(props.playerNumber)}}
                  >
                    <CloseIcon style={{height: '15px', width: '15px'}} />
                  </IconButton>
                  :
                  <></>
              }

            </div>

          </div>

          :
          <div className={classes.joinRoom} onClick={() => gameContext.handleGoingToPlayClick(props.playerNumber)}>
            {`#${props.playerNumber}`}
          </div>
      }

      <div className={classes.playerTime}>
        {props.time}
      </div>
    </div>

  )
}