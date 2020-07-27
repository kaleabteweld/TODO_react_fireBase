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
    };
  }

  user_id = "fpFJo7RTdugJ6qK8e7WlPhEPcHr2";
  items = [];

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
          if (chage.type == "modified") {
            console.log(chage.doc.data()["ToDo"]);

            let index = this.state.items.findIndex(
              (items) => String(items.id) == String(chage.doc.id)
            );
            console.log("chage index: " + index);

            let temp = this.state.items;
            temp[index].done_percentage = chage.doc.data()["done_percentage"];
            this.setState({
              items: temp,
            });
          }
        });
      });
  }

  doneCH = (id, index, Done) => {
    let temp = this.state.items;
    temp[index].done_percentage = Done;

    console.log("new stat");
    console.log(temp);
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

  render() {
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
          />
        ))}
      </div>
    );
  }
}

export default Main_list;
