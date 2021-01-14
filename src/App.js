import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import AuthUserContextProvider from './context/AuthUserContextProvider.js';
import SocketContextProvider from "./context/SocketContextProvider";
import Layout from './Layout';


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