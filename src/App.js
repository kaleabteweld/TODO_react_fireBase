import React from 'react';
import logo from './logo.svg';
import './App.css';

import Nav from "./components/nav"
import Main_list from "./components/main_list"
import Add_new_list from "./components/add_new_list"


function App() {
  return (

      <React.Fragment>    
      
        <Nav />
        <Main_list />
        <Add_new_list />

      </React.Fragment>


  );
}

export default App;
