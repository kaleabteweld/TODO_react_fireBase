import React from "react";
import logo from "./logo.svg";
import "./App.css";

import Nav from "./components/nav";
import LogIn from "./components/logIn";

import Root from "./components/root";
import { BrowserRouter, Route } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Nav />
        <Route exact path="/" component={LogIn} />
        <Route exact path="/logIn" component={LogIn} />
        <Route exact path="/signIn" component={LogIn} />
        <Route exact path="/home" component={Root} />
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
