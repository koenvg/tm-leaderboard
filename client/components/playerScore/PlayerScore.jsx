import React, { Component, PropTypes } from 'react';

export class PlayerScore extends Component{
    constructor(props) {
        super(props);

        this.state = {
            position: 'Calculating...'
        };
    }
    componentDidMount(){
        this._mounted = true;
        Meteor.call('player.position', this.props.player.time, function(error, position){
            if(this._mounted){
                if(error){
                }else{
                    this.setState({
                        position: position
                    })
                }
            }
        }.bind(this));
    }
    componentWillUnmount() {
        this._mounted = false;
    }
    render(){
        if(this.props.position == 1){
            return (
                <div className="card-panel position first-position">
                    #{this.state.position} {this.props.player.name}
                    <span className="badge blue">{this.props.player.time}</span>
                </div>
            )
        }
        return(
            <div className="card-panel position">
                #{this.state.position} {this.props.player.name}
                <span className="badge blue">{this.props.player.time}</span>
            </div>

        );
    }
}

PlayerScore.propTypes ={
    player: PropTypes.object.isRequired
};