import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';


import Leaderboard from './leaderboard/Leaderboard';
import Navigation from './navigation/Navigation';
import AddScore from './addScore/AddScore';

export default class App extends Component {
    render(){
        return(
            <div>
                <Navigation/>
                <div className="container">
                    <Leaderboard />
                </div>
                <AddScore/>
            </div>
        )
    }
}

