import React, { Component } from "react";

import Main_list from "./main_list";
import Add_new_list from "./add_new_list";

class Root extends Component {
  render() {
    return (
      <React.Fragment>
        <Main_list />
        <Add_new_list />
      </React.Fragment>
    );
  }
}

export default Root;
