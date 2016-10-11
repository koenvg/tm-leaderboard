
import React, { Component, PropTypes } from 'react';

export class Navigation extends Component{

    downloadCsv(){
        console.log('banaan');
        Meteor.call('downloadCsv', function(err, res){
            if(err){
                console.log(err);
            }else{
                var link = document.createElement('a');
                link.download = 'player.csv';
                link.href = 'data:text/csv;base64,' + res;
                link.click();
            }
        });
    }
    render(){
        return (
            <nav className="black" role="navigation">
                <div className="nav-wrapper">
                    <a id="logo-container" href="/" className="brand-logo left"><span><img id="logo-nav" className="left" src="/images/logo.jpg"></img></span>666 - GAMERS</a>
                    <div className="container">
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a href="/add-player">Add Player</a></li>
                            <li><a href="/search">Search/edit players</a></li>
                            <li><a href="#" onClick={this.downloadCsv.bind(this)}>Download CSV</a> </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}