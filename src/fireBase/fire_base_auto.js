import firebase from "firebase";
import fireDB from "./fire_base_init";
import React, { useContext } from "react";

import { ToDoContext } from "../components/ToDoContext";

export const fireAuth = firebase.auth();

export function FireAuth() {
  const [log_inState, setLog_inState] = useContext(ToDoContext);

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.

      // console.log("User is signed in");
      if (String(log_inState.userId) != String(user.uid)) {
        setLog_inState({
          log_in: true,
          userId: user.uid,
        });
      }

      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // ...
    } else {
    }
  });

  return null;
}
