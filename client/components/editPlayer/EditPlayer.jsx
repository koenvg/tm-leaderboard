import { Meteor } from 'meteor/meteor'
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import  '../../../public/lib/formatter'

export class EditPlayer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      formError: false,
      player: {},
    }
  }
  componentDidMount() {
    Meteor.call('player.get', this.props.playerId, function (error, player) {
      if (error) {
        console.error(error)
      } else {
        this.setState({
          player,
        })
        ReactDOM.findDOMNode(this.refs.name).value = player.name
        ReactDOM.findDOMNode(this.refs.email).value = player.email
        ReactDOM.findDOMNode(this.refs.time).value = player.time
        Materialize.updateTextFields()
        $('#time').formatter({
          pattern: '{{99}}:{{99}}.{{999}}',
          persistent: true,
        })
      }
    }.bind(this))
  }
  handleSubmit(event) {
    event.preventDefault()
    const player = this.state.player
    player.name = ReactDOM.findDOMNode(this.refs.name).value.trim()
    player.email = ReactDOM.findDOMNode(this.refs.email).value.trim()
    player.time = ReactDOM.findDOMNode(this.refs.time).value.trim()

    Meteor.call('player.update', player, (error) => {
      if (error) {
        this.setState({
          formError: true,
        })
        Materialize.toast('An error occurred while submitting the form, please check if your data is correct.', 4000)
      } else {
        this.setState({
          formError: false,
        })
        Materialize.toast('All changes are saved', 4000)
      }
    })
  }
  render() {
    return (
      <div className="row wrapper white">
        <h3 className="header center">Edit player {this.state.player.name}</h3>
        { this.state.formError ?
          <div className="card-panel red lighten-2 error-message">
              An error occurred while submitting the form, please check if your data is correct.
          </div> : ''
        }
        <form className="col s12" onSubmit={this.handleSubmit.bind(this)}>
          <div className="row">
            <div className="input-field col s12">
                <i className="material-icons prefix">perm_identity</i>
              <input id="name" type="text" className="validate" ref="name" required="required"/>
              <label htmlFor="name">Name</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">email</i>
              <input id="email" type="email" className="validate" ref="email" required="required"/>
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">av_timer</i>
              <input id="time" type="text" className="validate" ref="time"/>
              <label htmlFor="time">Time</label>
            </div>
          </div>
          <button type="submit" className="btn">Update</button>
        </form>
      </div>
    )
  }
}

EditPlayer.propTypes = {
  playerId: PropTypes.string.isRequired
}
