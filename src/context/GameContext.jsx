import {createContext} from "react";

const GameContext = createContext({
    handleGoingToPlayClick: null,
    handleCellClicked: null,
    boardEnabled: false,
    handleAcceptStartNewMatchClicked: null,
    sessionPlayer: null,
    gameResult: -1,
    handleStandUp: null,
    messages: [],
    emitMessage: null,
    surrender: null,
    drawStatus: null,
    playTurn: 0,
});

export default GameContext;