import React, { Component, PropTypes } from 'react';

export class PlayerSearchResult extends Component{
    render(){
        return (
            <tr>
                <td>{this.props.player.name}</td>
                <td>{this.props.player.email}</td>
                <td><a href={"/player/" + this.props.player._id + '/edit'}>Edit</a></td>
            </tr>
        )
    }
}

PlayerSearchResult.propTypes ={
    player: PropTypes.object.isRequired
};
