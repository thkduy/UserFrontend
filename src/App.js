import React, {useEffect, useState} from "react";
import { BrowserRouter as Router } from "react-router-dom";

import AuthUserContextProvider from './context/AuthUserContextProvider.js';
import SocketContextProvider from "./context/SocketContextProvider";
import Layout from './Layout';
import Countdown from "react-countdown";

// const renderer = ({ hours, minutes, seconds, completed }) => {
//   if (completed) {
//     // Render a completed state
//     return <>completed</>;
//   } else {
//     // Render a countdown
//     return <span>{minutes}:{seconds}</span>;
//   }
// };
// <Countdown date={Date.now() + 10000} renderer={renderer}>
//
// </Countdown>



export default function App() {
  return (
    <Router>
      <AuthUserContextProvider>
        <SocketContextProvider>
          <Layout/>
        </SocketContextProvider>
      </AuthUserContextProvider>
    </Router>

  );
}