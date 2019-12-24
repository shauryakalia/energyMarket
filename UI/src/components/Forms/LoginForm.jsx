import React from 'react';
import Formsy from 'formsy-react';
import PropTypes from 'prop-types';

// Custom Imports
import PasswordField from '../../components/Forms/PasswordField';
import TextField from '../../components/Forms/TextField';

import {
    colors, button, loggedOutForms,
} from '../../theme';

// Compenent for Login 
const Login = ({ onSubmit }) => (
    <Formsy
        onValidSubmit={onSubmit}
        style={loggedOutForms}
    >
        <TextField
            name="email"
            type="text"
            id="email"
            validations={{
                isEmail: true,
                maxLength: 60,
            }}
            validationErrors={{
                isEmail: 'Enter a valid e-mail address',
                maxLength: 'E-mail cannot be longer than 60 characters',
            }}
            placeholder="Username"
            required
        />
        <PasswordField
            name="password"
            id="password"
            type="password"
            placeholder="Password"
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
            LOGIN
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

Login.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default Login;
