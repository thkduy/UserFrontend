import {Box, createStyles, makeStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React from "react";
import GameBoard from "./GameBoard/GameBoard";
import MessageBoard from "./MessageBoard/MessageBoard";

// const useStyles = makeStyles(theme => createStyles({
//   root: {
//     display: 'flex',
//   }
// }));

export default function GameContainer(){
  return (
    <Grid container spacing={2}>
      <Grid item xs={7} style={{display: 'flex', justifyContent: 'flex-end'}}>
        <GameBoard />
      </Grid>
      <Grid item xs ={5}>
        <MessageBoard />
      </Grid>
    </Grid>
  )
}
