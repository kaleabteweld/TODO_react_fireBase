import React, { Component } from "react";
import "../components/style/sign.css";

export class SignIn extends Component {
  render() {
    return (
      <div className="main">
        <form id="form_sig">
          <div className="T">
            <div className="form-group">
              <label for="name">your full Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="name"
              ></input>
              <div id="email_id" className="invalid-feedback">
                <p>Enter your Name</p>
              </div>
            </div>

            <div className="form-group">
              <label for="us_name">User Name</label>
              <input
                type="text"
                className="form-control"
                id="us_name"
                name="us_name"
                placeholder="User Name"
              ></input>
              <div className="invalid-feedback">
                <p>User Name taken, plese try agen</p>
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
                name="emaill"
                placeholder="email@example.com"
              ></input>
              <div className="invalid-feedback">
                <p>check your Email</p>
              </div>
            </div>

            <div className="form-group">
              <label for="phon">Phon Number</label>
              <input
                type="number"
                className="form-control"
                id="phon"
                name="phon"
                placeholder="+251....."
              ></input>
              <div className="invalid-feedback">
                <p>check your Phone Number</p>
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
            ></input>
            <div className="invalid-feedback">
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

export default SignIn;
