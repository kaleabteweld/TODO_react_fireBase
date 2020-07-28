import React, { Component } from "react";
import "./style/main_list.css";

import $ from "jquery";

import Data_list from "./data_list";

import fireDB from "../fireBase/fire_base_init";

class Main_list extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      loding: true,
    };
  }

  user_id = "fpFJo7RTdugJ6qK8e7WlPhEPcHr2";
  items = [];

  // add todo's to ui
  componentDidMount() {
    fireDB
      .collection("user_interction")
      .doc(this.user_id)
      .collection("ToDo")
      .orderBy("time")
      .onSnapshot((sanp) => {
        let Changes = sanp.docChanges();

        Changes.forEach((chage) => {
          //console.log(chage.doc.data());
          if (chage.type == "added") {
            if (this.state.loding) {
              this.setState({
                loding: false,
              });
            }

            this.items.push({
              id: chage.doc.id,
              ToDo: chage.doc.data().ToDo,
              done_percentage:
                chage.doc.data().done_percentage == 0 ? false : true,
            });

            this.setState({
              items: this.items,
            });
          }
        });
      });
  }

  // fireDB eidt
  doneCH = (id, index, Done) => {
    let temp = this.state.items;
    temp[index].done_percentage = Done;

    this.setState(
      {
        items: temp,
      },
      () => {
        fireDB
          .collection("user_interction")
          .doc(this.user_id)
          .collection("ToDo")
          .doc(id)
          .update({
            done_percentage: Done ? "100" : "0",
          });
      }
    );
  };
  editCh = (id, index, Date) => {
    let temp = this.state.items;
    temp[index].ToDo = Date;
    this.setState(
      {
        items: temp,
      },
      () => {
        fireDB
          .collection("user_interction")
          .doc(this.user_id)
          .collection("ToDo")
          .doc(id)
          .update({
            ToDo: String(Date),
          });
      }
    );
  };
  removeCh = (id, index) => {
    console.log("removeCh: " + id);
    console.log("removeCh index: " + index);

    let temp = this.state.items;

    if (temp[index] != undefined) {
      temp.pop(index);
      this.setState(
        {
          items: temp,
        },
        () => {
          fireDB
            .collection("user_interction")
            .doc(this.user_id)
            .collection("ToDo")
            .doc(String(id))
            .delete();
        }
      );
    }
  };

  render() {
    if (this.state.loding) {
      return (
        <div className="loader-wrapper">
          <span className="loader">
            <span className="loader-inner"></span>
          </span>
        </div>
      );
    } else {
      return (
        <div className="fouces">
          {this.state.items.map((data, index) => (
            <Data_list
              key={this.state.items[index].id}
              ID={this.state.items[index].id}
              index={index}
              data={this.state.items[index].ToDo}
              done={this.state.items[index].done_percentage}
              doneCH={this.doneCH}
              editCh={this.editCh}
              removeCh={this.removeCh}
            />
          ))}
        </div>
      );
    }
  }
}

export default Main_list;
