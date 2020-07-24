import React, { Component } from 'react'

class Edit extends Component {
    
    
    
    constructor(props) {
        super(props)
    
        this.state = {
             edit:true
        }
    }
    

    edit =() =>{
        this.setState({
            edit:false
        })
    }
    
    render() {

        if (this.state.edit) {
            return(    
            <React.Fragment>
                <p id="TODO">{this.props.text}</p> 
                 

                <div className="back">
                    <img id="edit" onClick={this.edit} src="https://img.icons8.com/fluent/50/000000/edit.png"/>
                    <img id="remove" src="https://img.icons8.com/ios-glyphs/30/000000/filled-trash.png"/>
                </div>
        </React.Fragment>);

        } else {
            return(    
                <React.Fragment>
                    <input value={this.props.text} className="To_input" type="text" name="TODO" id="TODO"></input> 
                    <div id="edi"> 
                        <img id="save"  src="https://img.icons8.com/cute-clipart/50/000000/cancel-2.png"/>
                        <img id="cancel" src="https://img.icons8.com/fluent/48/000000/checkmark.png"/>
                    </div>
            </React.Fragment>);
        }
    }
}

export default Edit
