import React, { Component, PropTypes } from 'react';

export class PlayerScore extends Component{
    constructor(props) {
        super(props);

        this.state = {
            position: 'Calculating...'
        };
    }
    componentWillReceiveProps(props){
        let self = this;
        updateScore(self, props.player.time);
    }
    componentDidMount(){
        this._mounted = true;
        let self = this;
        updateScore(self, this.props.player.time);

    }
    componentWillUnmount() {
        this._mounted = false;
    }
    render(){

        return(
            <li>
                <div className="position ">
                    {this.state.position}. {this.props.player.name}
                    <span className="badge blue">{this.props.player.time}</span>
                </div>
            </li>

        );
    }
}

PlayerScore.propTypes ={
    player: PropTypes.object.isRequired
};

function updateScore(self, time){
    Meteor.call('player.position', time, function(error, position){
        if(this._mounted){
            if(error){
            }else{
                self.setState({
                    position: position
                })
            }
        }
    }.bind(self));
}