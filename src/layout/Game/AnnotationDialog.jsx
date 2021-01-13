import Button from "@material-ui/core/Button";
import {React} from "react";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    bottom: '0px',
    right: '0px',
    margin: 'auto',
    width: '250px',
    height: '100px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EED369',
    fontWeight: 'bold',
    fontFamily: 'arial',
    border: '3px solid #5C5A46',
    borderRadius: '10px',
  },
});

export default function ResultGameDialog(props){
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div style={{marginBottom: '15px'}}>
        {props.message}
      </div>
      <div >
        Waiting for next match ...
      </div>
    </div>
  )
}