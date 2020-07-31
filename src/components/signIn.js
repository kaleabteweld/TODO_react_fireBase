import React, { useState, useEffect, useContext, useRef } from "react";
import { Redirect } from "react-router-dom";
import $ from "jquery";

import { ToDoContext } from "./ToDoContext";

import "../components/style/sign.css";

import { fireAuth } from "../fireBase/fire_base_auto";
import fireDB from "../fireBase/fire_base_init";

function SignIn() {
  const [log_inState, setLog_inState] = useContext(ToDoContext);

  const [inputname, setinputname] = useState("");
  const [inputemail, setinputemail] = useState("");
  const [inputpass, setinputpass] = useState("");

  const Nref = useRef();
  const Eref = useRef();
  const Pref = useRef();

  var Input = (event) => {
    let target = $(event.target);
    switch ($(target).attr("name")) {
      case "name":
        setinputname($(target).val());
        break;
      case "email":
        setinputemail($(target).val());
        break;
      case "pass":
        setinputpass($(target).val());
        break;
    }
  };

  var Submit = (e) => {
    e.preventDefault();

    var name = $(Nref.current);
    var email = $(Eref.current);
    var password = $(Pref.current);

    if (inputname.length == 0) {
      name.addClass("is-invalid");
      name.removeClass("is-valid");
    }
    if (inputpass == 0) {
      password.addClass("is-invalid");
      password.removeClass("is-valid");
    } else {
      fireAuth
        .createUserWithEmailAndPassword(inputemail, inputpass)
        .then(function (response) {
          console.log(response.user);

          var id = response.user.uid;
          fireDB
            .collection("user")
            .doc(response.user.uid)
            .set({
              name: inputname,
              email: inputemail,
            })
            .then(function (response) {
              setLog_inState({
                log_in: true,
                userId: id,
              });
            })
            .catch(function (error) {
              console.log(error);

              email.addClass("is-invalid");
              email.removeClass("is-valid");
              $(email.siblings("#error_email")).text(error.message);
            });
        })
        .catch(function (error) {
          console.log(error);
          if (error.code.search("password") != -1) {
            password.addClass("is-invalid");
            password.removeClass("is-valid");
            $(password.siblings("#error_pass")).text(error.message);
          }
          if (error.code.search("email") != -1) {
            email.addClass("is-invalid");
            email.removeClass("is-valid");
            $(email.siblings("#error_email")).text(error.message);
          }
        });
    }
  };

  if (log_inState.log_in) {
    return <Redirect to="/home" />;
  } else {
    return (
      <div className="main">
        <form id="form_sig" onSubmit={Submit}>
          <div className="T">
            <div className="form-group">
              <label for="name">your full Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="name"
                value={inputname}
                onChange={Input}
                ref={Nref}
              ></input>
              <div id="email_id" className="invalid-feedback">
                <p>Enter your Name</p>
              </div>
            </div>
          </div>

          <div className="T">
            <div className="form-group">
              <label for="emaill">Email</label>
              <input
                type="text"
                className="form-control"
                id="emaill"
                name="email"
                placeholder="email@example.com"
                value={inputemail}
                onChange={Input}
                ref={Eref}
              ></input>
              <div className="invalid-feedback" id="error_email">
                <p>check your Email</p>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label for="passs">password</label>
            <input
              type="password"
              className="form-control"
              id="passs"
              name="pass"
              placeholder="*******"
              value={inputpass}
              onChange={Input}
              ref={Pref}
            ></input>
            <div className="invalid-feedback" id="error_pass">
              <p>
                check your password, Must Be less Than Or Equal 8 Charcter's
              </p>
            </div>
          </div>

          <button
            id="posts"
            type="submit"
            value="submit"
            className="btn btn-success"
          >
            {" "}
            sign In
          </button>
        </form>
      </div>
    );
  }
}

// export class SignIn extends Component {

//   constructor(props) {
//     super(props)

//     this.state = {

//     }
//   }

//   render() {

//   }
// }

export default SignIn;
