import React, { Component, useContext, useState } from "react";
import { Redirect } from "react-router-dom";

import { ToDoContext } from "./ToDoContext";
import Main_list from "./main_list";
import Add_new_list from "./add_new_list";

function Root() {
  const [log_inState, setLog_inState] = useContext(ToDoContext);

  if (log_inState.log_in) {
    return (
      <React.Fragment>
        <Main_list userId={log_inState.userId} />
        <Add_new_list userId={log_inState.userId} />
      </React.Fragment>
    );
  } else {
    return <Redirect to="/" />;
  }
}
export default Root;
