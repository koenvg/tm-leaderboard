import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { jQuery } from 'jQuery';
import  '../../../public/lib/formatter';

export class AddPlayer extends Component{
    constructor(props) {
        super(props);

        this.state = {
            formError: false
        };
    }
    componentDidMount(){
        $('#time').formatter({
            'pattern': '{{99}}:{{99}}.{{999}}',
            'persistent': true
        });
    }
    handleSubmit(event){
        event.preventDefault();
        const name = ReactDOM.findDOMNode(this.refs.name).value.trim();
        const email = ReactDOM.findDOMNode(this.refs.email).value.trim();
        const time = ReactDOM.findDOMNode(this.refs.time).value.trim();

        Meteor.call('players.insert', name, email, time, (error) =>{
            if (error) {
                this.setState({
                    formError: true,
                });
                Materialize.toast('An error occurred while submitting the form, please check if your data is correct.', 4000)
            }else{
                ReactDOM.findDOMNode(this.refs.name).value = '';
                ReactDOM.findDOMNode(this.refs.email).value = '';
                ReactDOM.findDOMNode(this.refs.time).value = '';
                this.setState({
                    formError: false,
                });
            }
        })
    }
    render(){
        return (
            <div className="row wrapper white">
                <h2 className="header center">Enter your details</h2>
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
                    <button type="submit" className="btn">Add</button>
                </form>
            </div>
        )
    }
}