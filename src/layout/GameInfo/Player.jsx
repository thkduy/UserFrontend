import React from "react";
import {makeStyles} from "@material-ui/core";

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
    marginBottom: "5px"
  },
  playerTime: {
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
  },
});

export default function PlayerContainer(props){
  const classes = useStyles();

  return (
    <div className={classes.player}>
      <div className={classes.playerTitle}>
        {props.title}
      </div>
      <div className={classes.playerName}>
        {props.playerName}
      </div>
      <div className={classes.playerTime}>
        {props.time}
      </div>
    </div>

  )
}