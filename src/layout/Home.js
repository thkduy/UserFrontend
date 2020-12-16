import {React, useEffect, useState} from "react";

import dotenv from 'dotenv';
import ListUsers from "./Home/ListUsers";
import MessageBoard from "./MessageBoard/MessageBoard";
import MessageComponent from "./MessageBoard/MessageComponent";
import GameBoard from "./GameBoard/GameBoard";
import GameContainer from "./GameContainer";
dotenv.config();
console.log(process.env.SERVER_HOST);


export default function Home() {

  return (
    // <MessageBoard />
    //<GameBoard />
    <GameContainer />
  );
}

