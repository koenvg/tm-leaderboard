import React, { Component, PropTypes } from 'react';

export class PlayerScore extends Component{
    render(){
        if(this.props.position == 1){
            return (
                <div className="card-panel position first-position">
                    #{this.props.position} {this.props.player.name}
                    <span className="badge blue">{this.props.player.time}</span>
                </div>
            )
        }
        return(
            <div className="card-panel position">
                #{this.props.position} {this.props.player.name}
                <span className="badge blue">{this.props.player.time}</span>
            </div>

        );
    }
}

PlayerScore.propTypes ={
    player: PropTypes.object.isRequired
};