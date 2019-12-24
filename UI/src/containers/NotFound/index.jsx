import React from 'react';

// Custom Imports
import { colors } from '../../theme';

import data from '../../data/AboutUs';

import logo from '../../images/verde-blocks-logo_original.png';

// Container for dummy component
const NotFound = () => (
    <div className="grid-x app-content" style={{ background: colors.lightGreen, border: colors.white }}>
        <div className="cell small-6">
            {data.map(({ id, content, title }) => (
                <div key={id} className="grid-y" style={{ margin: '15%' }}>
                    <div className="cell small-6 medium-8 large-2" style={{ color: colors.navyBlue }}>
                        <h3 style={{ fontWeight: 'bold' }}> This is a dummy page.</h3>
                    </div>
                </div>
            ))}

        </div>
        <div className="cell small-6">
            <ul style={{margin: '9% 2%'}}>
                <img alt="verde blocks" src={logo} />
            </ul>
        </div>
    </div>
);

export default NotFound;
