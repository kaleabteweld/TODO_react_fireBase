import React, { createContext, useState } from "react";

export const ToDoContext = createContext();

export const ToDoContextProvider = (props) => {
  const [userState, SetuserState] = useState({
    log_in: false,
    userId: "abc",
  });

  return (
    <ToDoContext.Provider value={[userState, SetuserState]}>
      {props.children}
    </ToDoContext.Provider>
  );
};
