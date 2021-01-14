import SocketContext from "./SocketContext";
import {io} from "socket.io-client";
import {useContext} from "react";
import AuthUserContext from "./AuthUserContext";

const SocketProvider = (props) => {

  //let socket = io('https://dack-caro-online-api.herokuapp.com/');
  let socket = io('http://localhost:3001'); //for testing in local

  const authUserContext = useContext(AuthUserContext);
  socket.emit('new-user-online', authUserContext.user);

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