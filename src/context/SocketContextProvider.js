import SocketContext from "./SocketContext";
import {io} from "socket.io-client";
import React, {useContext, useEffect} from "react";
import AuthUserContext from "./AuthUserContext";
let socket = io('http://localhost:3001');
const SocketProvider = (props) => {

  const authUserContext = useContext(AuthUserContext);
  useEffect(() => {
    // const initSocket = io('http://localhost:3001/', {
    //   withCredentials: true,
    // });
    // setSocket(initSocket);
    // let socket = io('https://dack-caro-online-api.herokuapp.com/');
     //for testing in local
    socket.on('connect', () => {
      if (!authUserContext.user) {
        return ;
      }
      if (authUserContext.user.length === 0){
        return ;
      }
      socket.emit('new-user-online', authUserContext.user);
    });
  }, []);
  return(
    <SocketContext.Provider value={ {socket: socket} }>
      { props.children }
    </SocketContext.Provider>
  )
};
export default SocketProvider;