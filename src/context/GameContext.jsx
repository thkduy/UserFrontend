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
    surrender: null
});

export default GameContext;