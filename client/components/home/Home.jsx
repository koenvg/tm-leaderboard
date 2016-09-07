import React, { Component, PropTypes } from 'react';
import {LeaderBoardContainer} from '../leaderboard/Leaderboard';
import {LatestEntriesContainer} from '../latestEntries/LatestEntries';

export class Home extends Component{
    render(){
        return (
            <div>
                <LeaderBoardContainer/>
                <LatestEntriesContainer/>
            </div>
        )
    }
}