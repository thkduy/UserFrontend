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

import ActivateAccount from './layout/ActivateAccount';
import EnterEmailRecover from './layout/EnterEmailRecover';
import Profile from './layout/Profile';
import GameHistory from './layout/GameHistory';
import Rank from './layout/Rank';
import ViewGame from './layout/ViewGame/ViewGame';
import Error404 from './layout/Error';

import MenuAppBar from './components/AppBar.js';
import SocketContextProvider from "./context/SocketContextProvider";
import GameContainer from "./layout/Game/GameContainer";
import ChangePassword from "./layout/ChangePassword.js";


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
              <Route path="/game/:roomId" component={GameContainer}/>
              <Route path="/activate/:token" component={ActivateAccount}/>
              <Route path="/forgot-password" component={EnterEmailRecover}/>
              <Route path="/change-password/:token" component={ChangePassword}/>
              <Route path="/profile" component={Profile}/>
              <Route path="/history" component={GameHistory}/>
              <Route path="/rank" component={Rank}/>
              <Route path="/view-game" search="?gameid=id" component={ViewGame}/>
              <Route component={Error404}/>
            </Switch>
          </div>
        </SocketContextProvider>
      </AuthUserContextProvider>
    </Router>
  );
}