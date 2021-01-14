import React, {useContext} from "react";
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import AuthUserContext from './context/AuthUserContext';

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
import GameContainer from "./layout/Game/GameContainer";
import ChangePassword from "./layout/ChangePassword.js";


export default function Layout() {
    const { isAuthenticated } = useContext(AuthUserContext);
    return (
        <div>
            <MenuAppBar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/game/:roomId">
                    {isAuthenticated ? <GameContainer/> : <Redirect to={{ pathname: "/login", state: { from: '/' }}}/>}
                </Route>
                <Route path="/activate/:token" component={ActivateAccount} />
                <Route path="/forgot-password" component={EnterEmailRecover} />
                <Route path="/change-password/:token" component={ChangePassword} />
                <Route path="/profile">
                    {isAuthenticated ? <Profile/> : <Redirect to={{ pathname: "/login", state: { from: '/profile' }}}/>}
                </Route>
                <Route path="/history">
                    {isAuthenticated ? <GameHistory/> : <Redirect to={{ pathname: "/login", state: { from: '/history' }}}/>}
                </Route>
                <Route path="/rank">
                    {isAuthenticated ? <Rank/> : <Redirect to={{ pathname: "/login", state: { from: '/rank' }}}/>}
                </Route>
                <Route path="/view-game" search="?gameid=id">
                    {isAuthenticated ? <ViewGame/> : <Redirect to={{ pathname: "/login", state: { from: '/' }}}/>}
                </Route>
                <Route component={Error404} />
            </Switch>
        </div>
    );
}