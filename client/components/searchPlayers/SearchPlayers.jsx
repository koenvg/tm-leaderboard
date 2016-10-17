import React, { Component } from 'react'
import { PlayerSearchResult } from '../playerSearchResult/PlayerSearchResult'

export class SearchPlayers extends Component {
  constructor(props) {
    super(props)

    this.state = {
      players: [],
    }
    this.searchPlayers.bind(this)
  }

  searchPlayers(self, text) {
    Meteor.call('players.search', text, (error, players) => {
      if (this._mounted) {
        if (!error) {
          self.setState({
            players,
          })
        }
      }
    })
  }

  search(event) {
    const self = this
    const searchText = event.target.value
    this.searchPlayers(self, searchText)
  }
  componentDidMount() {
    this._mounted = true
    const self = this
    this.searchPlayers(self, '')
  }

  componentWillUnmount() {
    this._mounted = false
  }

  renderResults() {
    return this.state.players.map((player) => (
        <PlayerSearchResult key={player._id} player={player} />
    ))
  }
  render() {
    return (
      <div className="wrapper white">
        <div className="row">
          <div className="input-field col s12">
              <input id="name"
                type="text"
                className="validate"
                ref="name" onKeyUp={this.search.bind(this)}/>
              <label htmlFor="name">Search query</label>
          </div>
        </div>
        <h4 className="header">Results</h4>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {this.renderResults()}
          </tbody>
        </table>
      </div>
    )
  }
}
