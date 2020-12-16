import Paper from "@material-ui/core/Paper";
import {createStyles, makeStyles, Typography} from "@material-ui/core";
import React from "react";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => createStyles({
  root: {
    backgroundColor: '#DDDDDD',
    padding: '7px',
    borderRadius: '15px',
  }
}));

export default function MessageComponent(props) {
  const classes = useStyles();

  const {name, content} = props;

  return (
    <Box component="div" display="block" className={classes.root} >
        <b> [{name}] </b> {content}
    </Box>
  )
}