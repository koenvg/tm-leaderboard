import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { jQuery } from 'jQuery';
import  '../../../public/lib/formatter';

export default class AddScore extends Component{
    componentDidMount(){
        $('#time').formatter({
            'pattern': '{{99}}:{{99}}',
            'persistent': true
        });
    }
    handleSubmit(event){
        event.preventDefault();
        const name = ReactDOM.findDOMNode(this.refs.name).value.trim();
        const email = ReactDOM.findDOMNode(this.refs.email).value.trim();
        const time = ReactDOM.findDOMNode(this.refs.time).value.trim();

        Meteor.call('players.insert', name, email, time);

        // Clear form
        ReactDOM.findDOMNode(this.refs.name).value = '';
        ReactDOM.findDOMNode(this.refs.email).value = '';
        ReactDOM.findDOMNode(this.refs.time).value = '';
        $('#addScore').closeModal();
    }
    render(){
        return (

            <div id="addScore" className="modal bottom-sheet">
                <div className="modal-content">
                    <div className="row">
                        <form className="col s12" onSubmit={this.handleSubmit.bind(this)}>
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">mode_edit</i>
                                    <input id="name" type="text" className="validate" ref="name" required="required"/>
                                    <label htmlFor="name">Name</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">account_circle</i>
                                    <input id="email" type="email" className="validate" ref="email" required="required"/>
                                    <label htmlFor="email">Email</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">mode_edit</i>
                                    <input id="time" type="text" className="validate" ref="time"/>
                                    <label htmlFor="time">Time</label>
                                </div>
                            </div>
                            <button type="submit" className="btn">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}