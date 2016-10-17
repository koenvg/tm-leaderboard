import React, { Component } from 'react'
import { LeaderBoardContainer } from '../leaderboard/Leaderboard'
import { LatestEntriesContainer } from '../latestEntries/LatestEntries'

export class Home extends Component {
  render() {
    return (
      <div>
        <div id="banner"></div>
        <LeaderBoardContainer/>
        <LatestEntriesContainer/>
      </div>
    )
  }
}
