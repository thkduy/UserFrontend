import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles} from "@material-ui/core";
import React from "react";

const useSenderContainerStyles = makeStyles((theme) => createStyles({
  Con: {
    padding: '0px 10px 10px 10px',
    height: '30px',
    display: 'flex',
    flexDirection: 'horizontal',
    alignItems: 'center',

  }
}));

export default function SenderContainer (props){
  const classes = useSenderContainerStyles();
  return (
    <div className={classes.Con} >
      { props.children }
    </div>
  )
}