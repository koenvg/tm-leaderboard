import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import { AppLayout } from '../../client/components/App.jsx';
import { LeaderBoardContainer } from '../../client/components/leaderboard/Leaderboard';
import { AddPlayer } from '../../client/components/addPlayer/AddPlayer';

export default function () {

    FlowRouter.route('/', {
        name: 'Home',
        action() {
            mount(AppLayout, {
                content: <LeaderBoardContainer/>,
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
