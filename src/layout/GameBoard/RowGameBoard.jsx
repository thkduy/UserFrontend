import {Box, createStyles, makeStyles} from "@material-ui/core";
import React from "react";
import Cell from "./Cell";

const useRowGameBoardStyles = makeStyles(theme => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
  }
}));

export default function RowGameBoard(props){
  const {listValues, row} = props;

  const classes = useRowGameBoardStyles();

  return(
    <Box component="div" className={classes.root}>
      {
        listValues.map((value, index) => <Cell value={value} row={row} column={index} />)
      }
    </Box>
  )
}