import React, { Component, PropTypes } from 'react';

export default class AddScore extends Component{

    handleSubmit(event){
        event.preventDefault();
        alert('Banaan');
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
                                    <input id="name" type="text" className="validate" ref="name"/>
                                    <label htmlFor="name">Name</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">account_circle</i>
                                    <input id="email" type="email" className="validate" ref="email"/>
                                    <label htmlFor="email">Email</label>
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