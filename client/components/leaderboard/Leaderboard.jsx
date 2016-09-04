import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import PlayerScore from '../playerScore/PlayerScore';
import {Players} from '../../../imports/model/player';
import FlipMove from 'react-flip-move';

class Leaderboard extends Component{

    renderPlayerScores(){
        return this.props.players.map((player,i) => (
            <PlayerScore key={player._id} position={i+1} player={player} />
        ));
    }
    render(){
        return (
            <div className="leaderboard">
                <FlipMove enterAnimation="elevator" leaveAnimation="elevator">
                    {this.renderPlayerScores()}
                </FlipMove>
            </div>
        )
    }
}

Leaderboard.propTypes = {
    players: PropTypes.array.isRequired,
};

export default leaderBoardContainer = createContainer(() => {
    Meteor.subscribe('players');
    return {
        players: Players.find({}, {sort: {time:1}}).fetch()
    };
}, Leaderboard);