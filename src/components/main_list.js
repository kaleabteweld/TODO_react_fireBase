import React, { Component } from "react";
import "./style/main_list.css";


import Data_list from "./data_list";

export class Main_list extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      data: "",
      done: false,
      edit: false,
      remove: false,
    };
  }

  data = {
    vbegqigfygerw: {
      data: "hi",
      done: false,
    },
    "re;njreangjr": {
      data: "hey",
      done: false,
    },
    dsalhcvwehv: {
      data: "sup",
      done: false,
    },
  };

  doneCH = () => {
    this.data[this.state.id].done = this.state.done ? true : false;
    console.log("********** Data Updata doneCH ****************");
    console.log(this.data);
    console.log("**************************************");
  };
  editCh = () => {
    this.data[this.state.id].data = this.state.data;
    console.log("********** Data Updata editCh****************");
    console.log(this.data);
    console.log("**************************************");
  };

  ch = () => {
    this.data["vbegqigfygerw"].data = "vlbeqriubiufgqewufwei";
    this.setState({
      id: "vbegqigfygerw",
      data: "vlbeqriubiufgqewufwei",
    });
    console.log("********** Data Updata editCh****************");
    console.log(this.data);
    console.log("**************************************");
  };

  render() {
    console.log("main_list render");
    return (
      <div className="fouces">
        {Object.keys(this.data).map((index) => (
          <Data_list
            parent={this}
            key={index}
            ID={index}
            data={this.data[String(index)].data}
            done={this.data[String(index)].done}
            doneCH={this.doneCH}
            editCh={this.editCh}
          />
        ))}

        <button onClick={this.ch}>change</button>
      </div>
    );
  }
}

export default Main_list;
