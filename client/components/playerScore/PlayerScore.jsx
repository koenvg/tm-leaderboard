import React, { Component, PropTypes } from 'react';



export default class PlayerScore extends Component{
    render(){
        return (
            <tr>
                <td>{this.props.position}</td>
                <td>{this.props.player.name}</td>
                <td>{this.props.player.time}</td>
            </tr>
        )
    }
}

PlayerScore.propTypes ={
    player: PropTypes.object.isRequired
};