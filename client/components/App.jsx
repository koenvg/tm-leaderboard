import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

class App extends Component {
    render(){
        return(
            <div className="container">
                Banaan
            </div>
        )
    }
}

export default createContainer(() => {
    return {

    };
}, App);