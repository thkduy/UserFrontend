import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles} from "@material-ui/core";
import React from "react";

const useSenderContainerStyles = makeStyles((theme) => createStyles({
  root: {
    display: 'flex',
    flexGrow: '1',
    overflowY: 'auto',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '10px',
    marginBottom: '10px',
    '& > *': {
      margin: '3px 0px'
    },
  }
}));

export default function MessagesContainer (props){
  const classes = useSenderContainerStyles();
  return (
    <div className={classes.root} >
      { props.children }
    </div>
  )
}