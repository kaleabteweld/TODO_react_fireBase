import React, { useState, useEffect, useContext } from "react";
import "./style/main_list.css";

import $ from "jquery";

import Data_list from "./data_list";

import fireDB from "../fireBase/fire_base_init";

import { ToDoContext } from "./ToDoContext";

function Main_list() {
  const [log_inState, setLog_inState] = useContext(ToDoContext);
  const user_id = log_inState.userId;

  const [items, setitems] = useState([]);
  const [loding, setloding] = useState(true);

  useEffect(() => {
    var Items = [];

    fireDB
      .collection("user_interction")
      .doc(user_id)
      .collection("ToDo")
      .orderBy("time")
      .onSnapshot((sanp) => {
        let Changes = sanp.docChanges();

        Changes.forEach((chage) => {
          if (chage.type == "added") {
            if (loding) {
              setloding(false);
            }

            // Items.push({
            //   id: chage.doc.id,
            //   ToDo: chage.doc.data().ToDo,
            //   done_percentage:
            //     chage.doc.data().done_percentage == 0 ? false : true,
            // });

            setitems((preItem) => [
              ...preItem,
              {
                id: chage.doc.id,
                ToDo: chage.doc.data().ToDo,
                done_percentage:
                  chage.doc.data().done_percentage == 0 ? false : true,
              },
            ]);
          }
        });
      });
  }, []);

  let doneCH = (id, index, Done) => {
    let temp = items;
    temp[index].done_percentage = Done;
    fireDB
      .collection("user_interction")
      .doc(user_id)
      .collection("ToDo")
      .doc(id)
      .update({
        done_percentage: Done ? "100" : "0",
      });
    setitems(temp);
  };
  let editCh = (id, index, Date) => {
    let temp = items;
    temp[index].ToDo = Date;

    fireDB
      .collection("user_interction")
      .doc(user_id)
      .collection("ToDo")
      .doc(id)
      .update({
        ToDo: String(Date),
      });

    setitems(temp);
  };
  let removeCh = (id, index) => {
    let temp = items;

    if (String(temp[index].id) == id) {
      fireDB
        .collection("user_interction")
        .doc(user_id)
        .collection("ToDo")
        .doc(String(id))
        .delete();

      const newList = temp.filter((item) => String(item.id) !== String(id));
      setitems(newList);
    }
  };

  if (loding) {
    return (
      <div className="loader-wrapper">
        <span className="loader">
          <span className="loader-inner"></span>
        </span>
      </div>
    );
  } else {
    console.log("*******");
    items.map((data) => console.log(data));
    console.log("*******");
    return (
      <div className="fouces">
        {items.map((data, index) => (
          <Data_list
            userId={user_id}
            key={data.id}
            ID={data.id}
            index={index}
            data={data.ToDo}
            done={data.done_percentage}
            doneCH={doneCH}
            editCh={editCh}
            removeCh={removeCh}
          />
        ))}
      </div>
    );
  }
}

// class Main_list extends Component {

//   constructor(props) {
//     super(props);

//     this.state = {
//       items: [],
//       loding: true,
//     };
//   }

//   user_id = this.props.userId;

//   // add todo's to ui
//   componentDidMount() {
//     console.log(this.user_id);

//     fireDB
//       .collection("user_interction")
//       .doc(this.user_id)
//       .collection("ToDo")
//       .orderBy("time")
//       .onSnapshot((sanp) => {
//         let Changes = sanp.docChanges();

//         Changes.forEach((chage) => {
//           //console.log(chage.doc.data());
//           if (chage.type == "added") {
//             if (this.state.loding) {
//               this.setState({
//                 loding: false,
//               });
//             }

//             this.items.push({
//               id: chage.doc.id,
//               ToDo: chage.doc.data().ToDo,
//               done_percentage:
//                 chage.doc.data().done_percentage == 0 ? false : true,
//             });

//             this.setState({
//               items: this.items,
//             });
//           }
//         });
//       });
//   }

//   // fireDB eidt
//   doneCH = (id, index, Done) => {
//     let temp = this.state.items;
//     temp[index].done_percentage = Done;

//     this.setState(
//       {
//         items: temp,
//       },
//       () => {
//         fireDB
//           .collection("user_interction")
//           .doc(this.user_id)
//           .collection("ToDo")
//           .doc(id)
//           .update({
//             done_percentage: Done ? "100" : "0",
//           });
//       }
//     );
//   };
//   editCh = (id, index, Date) => {
//     let temp = this.state.items;
//     temp[index].ToDo = Date;
//     this.setState(
//       {
//         items: temp,
//       },
//       () => {
//         fireDB
//           .collection("user_interction")
//           .doc(this.user_id)
//           .collection("ToDo")
//           .doc(id)
//           .update({
//             ToDo: String(Date),
//           });
//       }
//     );
//   };
//   removeCh = (id, index) => {
//     console.log("removeCh: " + id);
//     console.log("removeCh index: " + index);

//     let temp = this.state.items;

//     if (temp[index] != undefined) {
//       temp.pop(index);
//       this.setState(
//         {
//           items: temp,
//         },
//         () => {
//           fireDB
//             .collection("user_interction")
//             .doc(this.user_id)
//             .collection("ToDo")
//             .doc(String(id))
//             .delete();
//         }
//       );
//     }
//   };

//   render() {
//     if (this.state.loding) {
//       return (
//         <div className="loader-wrapper">
//           <span className="loader">
//             <span className="loader-inner"></span>
//           </span>
//         </div>
//       );
//     } else {
//       return (
//         <div className="fouces">
//           {this.state.items.map((data, index) => (
//             <Data_list
//               key={this.state.items[index].id}
//               ID={this.state.items[index].id}
//               index={index}
//               data={this.state.items[index].ToDo}
//               done={this.state.items[index].done_percentage}
//               doneCH={this.doneCH}
//               editCh={this.editCh}
//               removeCh={this.removeCh}
//             />
//           ))}
//         </div>
//       );
//     }
//   }
// }

export default Main_list;
