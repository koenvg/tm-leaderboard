import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Players } from '../../../imports/model/player';
import { PlayerScore } from '../playerScore/PlayerScore';
import FlipMove from 'react-flip-move';

class LatestEntries extends Component{

    renderPlayerScores(){
        console.log(this.props.players);
        return this.props.players.map((player,i) => (
            <PlayerScore key={player._id} position={i+1} player={player} />
        ));
    }

    render(){
        return (
            <div className="leaderboard">
                <h1> Latest entries</h1>
                <FlipMove enterAnimation="elevator" leaveAnimation="elevator">
                    {this.renderPlayerScores()}
                </FlipMove>
            </div>
        )
    }
}

LatestEntries.propTypes = {
    players: PropTypes.array.isRequired,
};

export const LatestEntriesContainer = createContainer(() => {
    let size = 5;
    Meteor.subscribe('latestEntries', size);
    return {
        players: Players.find({}, {
            sort: {createdAt: -1},
            limit: size
        }).fetch()
    };

}, LatestEntries);