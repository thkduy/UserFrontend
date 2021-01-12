import {makeStyles} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import React from "react";
import MessageBoard from "../MessageBoard/MessageBoard";
import Button from "@material-ui/core/Button";
import PlayerContainer from "./Player";

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
  }
})

export default function GameInfo(){

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div style={{height: "230px"}}>
        <div className={classes.title}>
          Room #34343443
        </div>

        <div className={classes.flexRow}>
          <PlayerContainer title="Player 1" playerName="Anh Hao" time = "00 : 45" />
          <PlayerContainer title="Player 2" playerName="Khanh Duy" time = "00 : 45" />
        </div>
        <div className={classes.monitors}>
          <Button variant="outlined" color="primary" style={{height: "30px", textTransform: 'none'}} >
            Xin Hòa
          </Button>
          <Button variant="outlined" color="primary" style={{height: "30px", textTransform: 'none'}} >
            Đầu hàng
          </Button>
        </div>
      </div>
      <MessageBoard />
    </div>
  )

}