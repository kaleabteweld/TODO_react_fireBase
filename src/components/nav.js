import React, { useContext } from "react";
import { ToDoContext } from "../components/ToDoContext";
import $ from "jquery";

import { Dropdown } from "react-bootstrap";
import { fireAuth } from "../fireBase/fire_base_auto";

import "./style/nav.css";

function Nav() {
  const [log_inState, setLog_inState] = useContext(ToDoContext);

  function cilk(event) {
    fireAuth.signOut().then(
      function () {
        setLog_inState({
          log_in: false,
        });
      },
      function (error) {
        console.error("Sign Out Error", error);
      }
    );
  }
  if (!log_inState.log_in) {
    return (
      <div className="top">
        <p>TODO</p>
      </div>
    );
  } else {
    return (
      <div className="top">
        <p>TODO</p>

        <div className="user">
          <div className="dropleft">
            <Dropdown>
              <Dropdown.Toggle id="us_pic">
                <img src="https://img.icons8.com/nolan/100/user.png" />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <button
                  id="log_out"
                  onClick={cilk}
                  className="dropdown-item btn btn-primary"
                >
                  {" "}
                  log_out{" "}
                </button>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    );
  }
}

// <img
// id="us_pic"
// onClick={cilk}
// className="dropdown-toggle"
// type="button"
// data-toggle="dropdown"
// aria-haspopup="true"
// aria-expanded="false"
// src="https://img.icons8.com/nolan/100/user.png"
// />
// <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
// <button className="dropdown-item btn btn-primary">Settings</button>
// <button id="log_out" className="dropdown-item btn btn-primary">
//   Log Out
// </button>
// </div>
// class Nav extends Component {
//     render() {
//         return (

//             <div className="top">

//                 <p>TODO</p>

//                 <div className="user">

//                     <div className="dropleft">
//                         <img id="us_pic" className="dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" src="https://img.icons8.com/nolan/100/user.png"/>
//                         <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
//                             <button className="dropdown-item btn btn-primary">Settings</button>
//                             <button id="log_out" className="dropdown-item btn btn-primary">Log Out</button>
//                         </div>
//                     </div>
//                 </div>
//           </div>
//         )
//     }
// }

export default Nav;
