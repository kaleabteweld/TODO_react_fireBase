import React, { useContext, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import Nav from "./components/nav";
import LogIn from "./components/logIn";
import SignIn from "./components/signIn";
import Root from "./components/root";
import { FireAuth } from "./fireBase/fire_base_auto";

import { ToDoContext, ToDoContextProvider } from "./components/ToDoContext";

import { BrowserRouter, Route } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <ToDoContextProvider>
        <FireAuth />
        <BrowserRouter>
          <Nav />

          <Route exact path="/" component={LogIn} />
          <Route exact path="/logIn" component={LogIn} />
          <Route exact path="/signIn" component={SignIn} />
          <Route exact path="/home" component={Root} />
        </BrowserRouter>
      </ToDoContextProvider>
    </React.Fragment>
  );
}

export default App;
