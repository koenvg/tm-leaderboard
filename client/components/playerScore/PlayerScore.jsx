import React, { Component, PropTypes } from 'react'

export class PlayerScore extends Component {
  constructor(props) {
    super(props)

    this.state = {
      position: 'Calculating...',
    }
    this.updateScore.bind(this)
  }

  updateScore(self, time) {
    Meteor.call('player.position', time, (error, position) => {
      let displayedPosition = position
      if (this._mounted) {
        if (!error) {
          if (position < 10) {
            displayedPosition = `0 ${position}`
          }
          self.setState({
            position: displayedPosition,
          })
        }
      }
    })
  }

  componentWillReceiveProps(props) {
    const self = this
    this.updateScore(self, props.player.time)
  }
  componentDidMount() {
    this._mounted = true
    const self = this
    this.updateScore(self, this.props.player.time)
  }

  componentWillUnmount() {
    this._mounted = false
  }
  render() {
    return (
        <li>
            <div className="player">
                <span className="score">{this.state.position}</span>
                {this.props.player.name}
                <span className="badge red">{this.props.player.time}</span>
            </div>
        </li>

    )
  }
}

PlayerScore.propTypes = {
  player: PropTypes.object.isRequired,
}
