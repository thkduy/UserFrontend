import {Box, createStyles, makeStyles} from "@material-ui/core";
import React, {useContext, useEffect, useState} from "react";
import RowGameBoard from "./RowGameBoard";
import {useParams} from "react-router-dom";

const useStyles = makeStyles(theme => createStyles({
  paper: {
    padding: '10px'
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: "20px"
  }
}));

export default function GameBoard(props){
  const classes = useStyles();
  const {roomId} = useParams();

  // const handleCellClicked = (row, column) => {
  //   const _allValues = allValues.slice();
  //   _allValues[row][column] = (row + column) % 2 ? -1 : 1;
  //   const newValue = _allValues[row][column];
  //   socket.emit("playerSendPace", {roomId: roomId, pace: {row: row, column: column, value: newValue}});
  //
  //   setAllValues(_allValues);
  // }

  useEffect(() => {
    // socket.on("serverSendBoardValues", ({boardValues}) => {
    //   setAllValues(boardValues);
    // });
  }, [])

  return (
        <Box component="div" className={classes.root}>
          { props.boardState.map((rowValues, index) =>
            <RowGameBoard listValues={rowValues} row={index} />)
          }
        </Box>
  )
}