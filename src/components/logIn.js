import React, { Component } from "react";
import "./style/logIn.css";

class LogIn extends Component {
  render() {
    return (
      <div className="main">
        <form id="form">
          <div className="form-group">
            <label for="email">Email</label>
            <input
              type="text"
              name="email"
              className="form-control"
              id="email"
              placeholder="email@example.com"
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
          <a className="btn btn btn-primary" href="sign_up.html">
            Sign Up
          </a>
        </form>
      </div>
    );
  }
}

export default LogIn;
