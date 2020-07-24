import React, { Component } from 'react'
import ReactDom from 'react-dom'

import "./style/nav.css"

class Nav extends Component {
    render() {
        return (

            <div className="top">

                <p>TODO</p>
        
                <div className="user">
        
                    <div className="dropleft">
                        <img id="us_pic" className="dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" src="https://img.icons8.com/nolan/100/user.png"/>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton"> 
                            <button className="dropdown-item btn btn-primary">Settings</button>
                            <button id="log_out" className="dropdown-item btn btn-primary">Log Out</button>
                        </div>
                    </div>
                </div>
          </div>
        )
    }
}

export default Nav
