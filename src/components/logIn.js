import React, { Component, useContext, useState } from "react";
import { fireAuth } from "../fireBase/fire_base_auto";
import "./style/logIn.css";

import { Redirect } from "react-router-dom";

import $ from "jquery";

import { ToDoContext } from "./ToDoContext";

function LogIn() {
  const [email, setemail] = useState("");
  const [pass, setepass] = useState("");

  const [log_inState, setLog_inState] = useContext(ToDoContext);

  let emailCh = (event) => {
    let target = $(event.target);
    setemail(target.val());
  };

  let passCh = (event) => {
    let target = $(event.target);
    setepass(target.val());
  };

  let Submit = (event) => {
    event.preventDefault();

    let email = $("#form #email");
    let password = $("#form #pass");

    var email_error = email.siblings("#error_email");
    var password_error = password.siblings("#error_pass");

    let email_ = email.val();
    let password_ = password.val();

    fireAuth
      .signInWithEmailAndPassword(email_, password_)
      .then((response) => {
        console.log("log in");

        $(email).val("");
        $(password).val("");

        email.removeClass("is-invalid");
        email.addClass("is-valid");
        password.removeClass("is-invalid");
        password.addClass("is-valid");

        // setLog_inState(preSetLog =>
        //    {
        //   log_in: true,
        // });
      })
      .catch(function (error) {
        console.log(error.message);
        console.log(error);

        if (error.code == "auth/invalid-email") {
          email.addClass("is-invalid");
          email.removeClass("is-valid");
          $(email_error).text(error.message);
        } else if (error.code == "auth/wrong-password") {
          password.addClass("is-invalid");
          password.removeClass("is-valid");
          $(password_error).text(error.message);
        } else {
          email.addClass("is-invalid");
          email.removeClass("is-valid");
          $(email_error).text(error.message);
        }
      });
  };

  if (log_inState.log_in) {
    return <Redirect to="/home" />;
  } else {
    return (
      <div className="main">
        <form id="form" onSubmit={Submit}>
          <div className="form-group">
            <label for="email">Email</label>
            <input
              type="text"
              name="email"
              className="form-control"
              id="email"
              placeholder="email@example.com"
              value={email}
              onChange={emailCh}
            ></input>
            <div id="error_email" className="invalid-feedback">
              <p>check your Email</p>
            </div>
          </div>

          <div className="form-group">
            <label for="pass">password</label>
            <input
              type="password"
              name="pass"
              className="form-control"
              id="pass"
              placeholder="*******"
              value={pass}
              onChange={passCh}
            ></input>
            <div id="error_pass" className="invalid-feedback">
              <p>check your password</p>
            </div>
          </div>

          <button
            id="post"
            type="submit"
            value="submit"
            className="btn btn-success"
          >
            Log In
          </button>
          <a className="btn btn btn-primary" href="/signIn">
            Sign Up
          </a>
        </form>
      </div>
    );
  }
}

// class LogIn extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       email: "",
//       pass: "",
//       log_in: false,
//     };
//   }

//   render() {

//   }
// }

export default LogIn;
