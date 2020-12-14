import React, { useState, useEffect } from "react";
import SocketContext from "./SocketContext";
import {io} from "socket.io-client";

const SocketProvider = (props) => {

  let socket = io('http://localhost:3001/', {
    withCredentials: true,
  });

  // useEffect(() => {
  //   const initSocket = io('http://localhost:3001/', {
  //     withCredentials: true,
  //   });
  //   setSocket(initSocket);
  // }, []);
  return(
    <SocketContext.Provider value={ {socket: socket} }>
      { props.children }
    </SocketContext.Provider>
  )
};
export default SocketProvider;