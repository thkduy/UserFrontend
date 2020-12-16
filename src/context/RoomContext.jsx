import {createContext} from "istanbul-lib-report";

const RoomContext = createContext({
  roomId: null
});

export default RoomContext;