import React, { Component } from 'react';
import { Route, HashRouter, Switch } from "react-router-dom";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import Forgot from "./Forgot";
import Ride from "./Ride";
import Drive from "./Drive";
import Reset from "./Reset";
import Profile from "./Profile";

class Main extends Component {
    render() {
        return (
            <HashRouter>
              <Switch>
                  <Route exact path="/" component={Home}/>
                  <Route path="/signup" component={Signup}/>
                  <Route path="/login" component={Login}/>
                  <Route path="/forgot" component={Forgot}/>
                  <Route path="/ride" component={Ride}/>
                  <Route path="/drive" component={Drive}/>
                  <Route path="/reset/:reset_token" component={Reset}/>
                  <Route path="/profile" component={Profile}/>
              </Switch>
            </HashRouter>
        );
    }
}

export default Main;