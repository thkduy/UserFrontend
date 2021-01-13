import {createStyles, makeStyles} from "@material-ui/core";
import React, {useContext, useState} from "react";
import GameContext from "../../context/GameContext";
import {IsoOutlined} from "@material-ui/icons";

const useCellGameBoardStyles = makeStyles(theme => createStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '35px',
    height: '35px',
    boxShadow: '0 0 0 0.5px #bbbbbb',
    "-webkitBoxShadow": '0 0 0 1px #bbbbbb',
    backgroundColor: '#FEFEFE',
    '& > svg': {
      width: '21px',
      height: '21px'
    },
    // '&:hover': {
    //   backgroundColor: "#FFEAA7"
    // }
  }
}));


export default function Cell(props){
  const gameContext = useContext(GameContext);
  const handleCellClicked = gameContext.handleCellClicked;
  const [hover, setHover] = useState(false);

  const classes = useCellGameBoardStyles();
  const {value, row, column} = props;
  const mappingValueToComponent = {
    "0": <></>,
    "1": <SvgX />,
    "2": <SvgO />
  }

  const handleMouseOut = () => {
    setHover(false);
  }
  const handleMouseOver = () => {
    if (gameContext.boardEnabled) {
      setHover(true);
    }
  }

  return (
    <div className={classes.root}
         onClick= {!value? () => handleCellClicked(row, column) : () => {}}
         onMouseOver={handleMouseOver}
         onMouseOut={handleMouseOut}
         style={{backgroundColor: hover ? '#FFEAA7' : '#FEFEFE'}}
    >
      {mappingValueToComponent[value]}
    </div>
  )
}

const SvgX = function (){
  return (
    <svg id="default-black" viewBox="0 0 100 100">
      <path d="M93.9 77.1L66.9 50 94 22.9c2.3-2.3 3.5-5.3 3.5-8.4A12.3 12.3 0 0 0 94 6c-2.3-2.3-5.3-3.5-8.4-3.5S79.3 3.8 77.2 6L50 33.1 22.9 6c-2.3-2.3-5.2-3.5-8.4-3.5S8.3 3.8 6 6s-3.5 5.3-3.5 8.4 1.3 6.2 3.5 8.4L33 50 6 77.1C1.3 81.7 1.3 89.3 6 94c2.3 2.3 5.3 3.5 8.4 3.5s6.2-1.3 8.4-3.5L50 66.9l27.1 27c2.3 2.3 5.3 3.5 8.4 3.5s6.2-1.3 8.4-3.5c2.3-2.3 3.5-5.3 3.5-8.4 0-3.2-1.3-6.2-3.5-8.4z" fill="#3174c8"/>
    </svg>
  )
}

const SvgO = function (){
  return (
    <svg id="default-white" viewBox="0 0 100 100">
      <path d="M50 2.5C23.8 2.5 2.5 23.8 2.5 50S23.8 97.5 50 97.5 97.5 76.2 97.5 50 76.2 2.5 50 2.5zm0 72.3a24.8 24.8 0 0 1 0-49.6 24.8 24.8 0 0 1 0 49.6z" fill="#ea576c"/>
    </svg>
  )
}