import React from 'react';
import { Navigation } from './navigation/Navigation';

export const AppLayout = ({content}) => (
    <div>
        <main>
            <Navigation/>
            <div className="container">
                {content}
            </div>

        </main>
    </div>
);

