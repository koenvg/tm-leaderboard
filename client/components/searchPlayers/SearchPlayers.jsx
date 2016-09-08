import React, { Component, PropTypes } from 'react';
import { PlayerScore } from '../playerScore/PlayerScore';

export class SearchPlayers extends Component{
    constructor(props) {
        super(props);

        this.state = {
            players: []
        }
        this.search = this.search.bind(this);
    }
    search(event){
        let self = this;
        let searchText = event.target.value;
        searchPlayers(self, searchText);
    }
    componentDidMount(){
        this._mounted = true;
        let self = this;
        searchPlayers(self, '');
    }
    componentWillUnmount() {
        this._mounted = false;
    }
    renderResults(){
        return this.state.players.map((player,i) => (
            <PlayerScore key={player._id} position={i+1} player={player} />
        ));
    }
    render(){
        return (
            <div className="leaderboard">
                <input type="text" ref="query" onKeyUp={this.search}/>
                <h4>Results</h4>
                {this.renderResults()}
            </div>
        )
    }
}

function searchPlayers(self, text){
    Meteor.call('players.search', text, function(error, players){
        if(this._mounted) {
            if (error) {
            } else {
                self.setState({
                    players: players
                })
            }
        }
    }.bind(self));
}