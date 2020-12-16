import {Box, createStyles, makeStyles} from "@material-ui/core";
import React, {useContext, useEffect, useState} from "react";
import RowGameBoard from "./RowGameBoard";
import Paper from "@material-ui/core/Paper";
import SocketContext from "../../context/SocketContext";
import GameBoardContext from "../../context/GameBoardContext";

const useStyles = makeStyles(theme => createStyles({
  paper: {
    padding: '10px'
  },
  root: {
    display: 'flex',
    flexDirection: 'column',

  }
}));

export default function GameBoard(){
  const classes = useStyles();
  // const allValues = [
  //   [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, -1, 0, -1, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1]
  // ];

  const socketContext = useContext(SocketContext);
  const socket = socketContext.socket;

  const [allValues, setAllValues] = useState([]);
  useEffect(() => {

    const defaultAllValues = new Array(16);
    for (let i = 0; i < 16; i++){
      defaultAllValues[i] = new Array(16);
      for (let j = 0; j < 16; j++){
        defaultAllValues[i][j] = 0;
      }
    }

    setAllValues(defaultAllValues);
  }, []);

  const handleCellClicked = (row, column) => {
    const _allValues = allValues.slice();
    _allValues[row][column] = (row + column) % 2 ? -1 : 1;
    setAllValues(_allValues);
  }

  return (
    <GameBoardContext.Provider value={{handleCellClicked: handleCellClicked}}>
      <Paper className={classes.paper} elevation={2} >
        <Box component="div" className={classes.root}>
          { allValues.map((rowValues, index) =>
            <RowGameBoard listValues={rowValues} row = {index} />)
          }
        </Box>
      </Paper>
    </GameBoardContext.Provider>

  )
}