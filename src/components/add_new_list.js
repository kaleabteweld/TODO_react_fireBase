import React, { Component } from "react";
import "./style/add_new_list.css";

import fireDB from "../fireBase/fire_base_init";

import $ from "jquery";

export class Add_new_list extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      input: "",
    };
  }

  onChage = (event) => {
    this.setState({
      input: $(event.target).val(),
    });
  };
  onAdd = () => {
    this.setState(
      {
        show: true,
      },
      () => {
        $("#new").animate(
          {
            top: "-=75vh",
          },
          600
        );
      }
    );
  };
  onCancel = () => {
    $("#new").animate(
      {
        top: "+=75vh",
      },
      600,
      () => {
        this.setState({
          show: false,
        });
      }
    );
  };
  onCreaet = (event) => {
    let target = $(event.target).parent().parent().find("#us_text");

    let user_id = "fpFJo7RTdugJ6qK8e7WlPhEPcHr2";
    let temp = new Date();

    fireDB
      .collection("user_interction")
      .doc(user_id)
      .collection("ToDo")
      .add({
        ToDo: target.val(),
        time: temp,
        done_percentage: "0",
      })
      .then((response) => {
        this.onCancel();
      });
  };

  render() {
    if (this.state.show) {
      return (
        <div id="new">
          <textarea
            name="us_text"
            id="us_text"
            rows="10"
            placeholder="  Add your remainder here"
            value={this.state.input}
            onChange={this.onChage}
          ></textarea>
          <div class="Nav">
            <button id="Save" onClick={this.onCreaet} class="btn btn-primary">
              Save
            </button>
            <button id="cancel" onClick={this.onCancel} class="btn btn-danger">
              cancel
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <img
            id="add_todo"
            onClick={this.onAdd}
            src="https://img.icons8.com/nolan/96/add.png"
          />
        </div>
      );
    }
  }
}

export default Add_new_list;
