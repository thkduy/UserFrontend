import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import AuthUserContextProvider from './context/AuthUserContextProvider.js';

import Home from './layout/Home.js';

import Login from './layout/Login.js';

import Register from './layout/Register.js';

import GameBoard from "./layout/Game/GameBoard.js";

import MenuAppBar from './components/AppBar.js';
import SocketContextProvider from "./context/SocketContextProvider";


export default function App() {
  return (
    <Router>
      <AuthUserContextProvider>
        <SocketContextProvider>
          <div>
            <MenuAppBar/>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/login" component={Login}/>
              <Route path="/register" component={Register}/>
              <Route path="/game/:roomId" component={GameBoard}/>
            </Switch>
          </div>
        </SocketContextProvider>
      </AuthUserContextProvider>
    </Router>
  );
}