import React from 'react';

// Custom Imports
import { colors } from '../../theme';
import { Link } from 'react-router-dom';

// Container for Account component
const Account = () => (
    <div className="grid-x app-content" style={{ background: colors.lightGreen, border: colors.white }}>
        <div className="cell small-6">
            <ul>
                <li name="changePassword" className="active">
                    <Link onClick={() => this.handleClick('changePassword')} to="/changePassword">Change Password</Link>
                </li>
            </ul>
        </div>
    </div>
);

export default Account;
