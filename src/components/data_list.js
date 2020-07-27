import React, { Component } from "react";
import "./style/data_list.css";
import $ from "jquery";

import Edit from "./edit";
export class Data_list extends Component {
  constructor(props) {
    super(props);

    this.state = {
      done: this.props.done,
      edit: true,

      input: this.props.data,

      remove: false,
      data: this.props.data,
    };
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

    // this.props.parent.setState(
    //   {
    //     id: String(this.props.ID),
    //     done: this.state.done ? false : true,
    //   },
    //   () => {
    //     this.props.doneCH();
    //   }
    // );
  };

  edit = () => {
    this.setState({
      edit: false,
    });
  };

  remove = () => {
    this.setState({
      edit: false,
    });
  };

  cancel = () => {
    this.setState({
      edit: true,
    });
  };

  save = (event) => {
    let target = $(event.target).parent().parent().find("#TODO");

    this.setState(
      {
        edit: true,
      },
      () => {
        this.props.editCh(this.props.ID, target.val());
      }
    );

    // console.log(target);
    // this.props.parent.setState(
    //   {
    //     id: String(this.props.ID),
    //     data: target.val(),
    //   },
    //   () => {
    //     this.props.editCh();
    //   }
    // );
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
            defaultChecked={this.state.done}
            value={this.state.done}
            onChange={this.cheack}
            type="checkbox"
            name="done"
            id="done"
          ></input>

          <p id="TODO">{this.state.input}</p>

          <div className="back">
            <img
              id="edit"
              onClick={this.edit}
              src="https://img.icons8.com/fluent/50/000000/edit.png"
            />
            <img
              id="remove"
              src="https://img.icons8.com/ios-glyphs/30/000000/filled-trash.png"
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="todo">
          <input
            value={this.state.done}
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
