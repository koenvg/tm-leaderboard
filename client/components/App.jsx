import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import {Players} from '../../imports/model/player';
import Leaderboard from './leaderboard/Leaderboard';
import Navigation from './navigation/Navigation';
import AddScore from './addScore/AddScore';

class App extends Component {
    render(){
        return(
            <div>
                <Navigation/>
                <div className="container">
                    <Leaderboard players={this.props.players}/>
                </div>
                <AddScore/>
            </div>
        )
    }
}

App.propTypes = {
    players: PropTypes.array.isRequired,
};

export default createContainer(() => {
    return {
        players: Players.find({}).fetch()
    };
}, App);