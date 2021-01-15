import Button from "@material-ui/core/Button";
import {React, useContext, useState} from "react";
import {makeStyles} from "@material-ui/core";
import GameContext from "../../context/GameContext";

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
  button: {
    backgroundColor: '#1F2930',
    '&:hover': {
      backgroundColor: '#000000',
    },
    color: '#FFFFFF',
    fontWeight: 'bold',
    textTransform: 'none',
    border: '2px solid #5C5A46',
    borderRadius: '10px',
    '&:disabled': {
      color: '#DDDDDD',
      backgroundColor: '#555555',
    }
  }
});

export default function ResultGameDialog(props){
  const classes = useStyles();
  const gameContext = useContext(GameContext);
  const [disable, setDisable] = useState(false)

  const handleClick = () => {
    gameContext.handleAcceptStartNewMatchClicked();
    setDisable(true);
  }

  return (
    <div className={classes.root}>
      <div style={{marginBottom: '15px'}}>
        {props.message}
      </div>
      {
        props.isPlayer ? <Button
          variant="outlined"
          size="medium"
          className={classes.button}
          onClick={handleClick}
          disabled={disable}
        >
          {!disable ? 'Next match' : 'Waiting for partner...'}
        </Button>
        :
        <div >
          Waiting for next match...
        </div>

      }

    </div>
  )
}