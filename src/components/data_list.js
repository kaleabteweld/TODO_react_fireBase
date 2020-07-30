import React, { Component } from "react";
import "./style/data_list.css";
import $ from "jquery";

import fireDB from "../fireBase/fire_base_init";

class Data_list extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.ID,
      done: this.props.done,
      edit: true,
      index: this.props.index,

      data: this.props.data,

      input: this.props.data,

      remove: false,
    };
  }

  componentDidMount() {
    let user_id = this.props.userId;

    fireDB
      .collection("user_interction")
      .doc(user_id)
      .collection("ToDo")
      .orderBy("time")
      .onSnapshot((sanp) => {
        let Changes = sanp.docChanges();

        Changes.forEach((chage) => {
          if (chage.type == "modified") {
            console.log("modified");

            let id = chage.doc.id;
            console.log(id);
            console.log(this.props.ID);

            if (String(this.props.ID) == String(id)) {
              // chage done
              if (
                this.state.done !=
                (chage.doc.data()["done_percentage"] == "0" ? false : true)
              ) {
                this.setState({
                  done:
                    String(chage.doc.data()["done_percentage"]) == "0"
                      ? false
                      : true,
                });
              }

              // chage ToDo
              if (this.state.data != chage.doc.data()["ToDo"]) {
                this.setState({
                  data: chage.doc.data()["ToDo"],
                  input: chage.doc.data()["ToDo"],
                });
              }
            }
          }
          if (chage.type == "removed") {
            if (String(this.props.ID) == String(chage.doc.id)) {
              this.remove();
            }
          }
        });
      });
  }

  cheack = () => {
    this.setState(
      {
        done: this.state.done ? false : true,
      },
      () => {
        this.props.doneCH(this.props.ID, this.props.index, this.state.done);
      }
    );
  };
  edit = () => {
    this.setState({
      edit: false,
    });
  };
  remove = () => {
    this.props.removeCh(this.props.ID, this.props.index);
  };
  cancel = () => {
    this.setState({
      edit: true,
    });
  };
  save = (event) => {
    let target = $(event.target).parent().parent().find("#TODO");
    console.log(target.val());

    this.setState(
      {
        data: target.val(),
        edit: true,
      },
      () => {
        this.props.editCh(this.props.ID, this.props.index, target.val());
      }
    );
  };
  input = (event) => {
    this.setState({
      input: $(event.target).val(),
    });
  };

  render() {
    if (this.state.edit) {
      return (
        <div className="todo">
          <input
            // defaultChecked={this.state.done}
            checked={this.state.done}
            onChange={this.cheack}
            type="checkbox"
            name="done"
            id="done"
          ></input>

          <p id="TODO">{this.state.data}</p>

          <div className="back">
            <img
              id="edit"
              onClick={this.edit}
              src="https://img.icons8.com/fluent/50/000000/edit.png"
            />
            <img
              id="remove"
              onClick={this.remove}
              src="https://img.icons8.com/ios-glyphs/30/000000/filled-trash.png"
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="todo">
          <input
            // defaultChecked={this.state.done}
            checked={this.state.done}
            onChange={this.cheack}
            type="checkbox"
            name="done"
            id="done"
          ></input>

          <input
            value={this.state.input}
            onChange={this.input}
            className="To_input"
            type="text"
            name="TODO"
            id="TODO"
          ></input>

          <div id="edi">
            <img
              id="cancel"
              onClick={this.cancel}
              src="https://img.icons8.com/cute-clipart/50/000000/cancel-2.png"
            />
            <img
              id="save"
              onClick={this.save}
              src="https://img.icons8.com/fluent/48/000000/checkmark.png"
            />
          </div>
        </div>
      );
    }
  }
}

export default Data_list;
