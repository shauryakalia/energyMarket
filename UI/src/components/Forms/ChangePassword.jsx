import React from 'react';
import Formsy from 'formsy-react';
import PropTypes from 'prop-types';

// Custom Imports
import PasswordField from '../../components/Forms/PasswordField';

import {
    colors, button, loggedOutForms,
} from '../../theme';

// Compenent for Login 
const ChangePassword = ({ onSubmit }) => (
    <Formsy
        onValidSubmit={onSubmit}
        style={loggedOutForms}
    >
        <PasswordField
            name="oldPassword"
            id="oldPassword"
            type="password"
            placeholder="Old Password"
            required
        />
        <PasswordField
            name="newPassword"
            id="newPassword"
            type="password"
            placeholder="New Password"
            required
        />
        <button
            type="submit"
            style={{
                ...button,
                width: '100%',
                height: '2.4375rem',
                marginTop: '4%',
                marginBottom: '10%',
            }}
        >
            CHANGE PASSWORD
</button>
        <div>
            <a
                style={{ color: colors.navyBlue }}
                href="#verify"
            >
                Forgot your password?
  </a>
        </div>
    </Formsy>
);

ChangePassword.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default ChangePassword;
