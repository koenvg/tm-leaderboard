import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'

import { PlayerScore } from '../playerScore/PlayerScore'
import { Players } from '../../../imports/model/player'
import FlipMove from 'react-flip-move'

class Leaderboard extends Component {
  renderPlayerScores() {
    return this.props.players.map((player, i) => (
        <PlayerScore key={ player._id } position={ i + 1 } player={player} />
    ))
  }
  render() {
    return (
        <div className="leaderboard">
            <h3 className="center header">Top 10 Players!</h3>
            <ul>
                <FlipMove enterAnimation="elevator" leaveAnimation="elevator">
                        { this.renderPlayerScores() }
                </FlipMove>
            </ul>
        </div>
    )
  }
}

Leaderboard.propTypes = {
  players: PropTypes.array.isRequired,
}

export const LeaderBoardContainer = createContainer(() => {
  Meteor.subscribe('leaderboard')
  return {
    players: Players.find({}, { sort: { time: 1 }, limit: 10 }).fetch(),
  }
}, Leaderboard)
