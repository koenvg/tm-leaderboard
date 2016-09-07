import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import { AppLayout } from '../../client/components/App.jsx';
import { Home } from '../../client/components/home/Home';
import { AddPlayer } from '../../client/components/addPlayer/AddPlayer';

export default function () {

    FlowRouter.route('/', {
        name: 'Home',
        action() {
            mount(AppLayout, {
                content: <Home/>,
            });
        }
    });

    FlowRouter.route('/add-player', {
        name: 'Nea Player',
        action() {
            mount(AppLayout, {
                content: <AddPlayer/>,
            });
        }
    });

}
