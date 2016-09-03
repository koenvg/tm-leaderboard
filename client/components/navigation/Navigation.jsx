
import React, { Component, PropTypes } from 'react';

export default class Navigation extends Component{
    render(){
        return (
            <nav className="red darken-3" role="navigation">
                <div className="nav-wrapper container">
                    <a id="logo-container" href="#" className="brand-logo center">666 - GAMERS</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a href="sass.html">Add Score</a></li>
                    </ul>
                </div>
            </nav>
        )
    }
}