import React from 'react';
import Formsy from 'formsy-react';
import PropTypes from 'prop-types';

// Custom Imports
import TextArea from '../../components/Forms/TextArea';
import TextField from '../../components/Forms/TextField';

import {
    button
} from '../../theme';

// Component for contact us form
const Contact = ({ canSubmit, disableButton, enableButton, submit }) => (
    <Formsy onSubmit={submit} onValid={enableButton} onInvalid={disableButton} className="contact">
        <TextField id="name" type="text" name="name" placeholder="Username"
            validations={{
                isWords: true,
                maxLength: 60,
            }}
            validationErrors={{
                isWords: 'Please enter a valid username',
                maxLength: 'Username cannot be longer than 60 characters',
            }} required />
        <TextField id="number" type="number" name="number" placeholder="Phone Number"
            validations={{
                matchRegexp: /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,3})|(\(?\d{2,3}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/,
            }}
            validationErrors={{
                matchRegexp: 'Please enter a valid contact number',
            }}
            required />
        <TextField id="email" type="text" name="email" placeholder="Email" validations={{
            isEmail: true,
            maxLength: 60,
        }}
            validationErrors={{
                isEmail: 'Please enter a valid e-mail address',
                maxLength: 'E-mail cannot be longer than 60 characters',
            }} required />
        <TextArea id="message" type="text" name="message" placeholder="Message"
            validations={{
                isWords: true,
                maxLength: 160,
            }}
            validationErrors={{
                isWords: 'Please enter a valid message',
                maxLength: 'The message cannot be longer than 60 characters',
            }}
            required />
        <button
            disabled={!canSubmit}
            type="submit"
            style={{
                ...button,
                width: '100%',
                height: '2.4375rem',
                marginTop: '4%',
                marginBottom: '10%',
            }}
        >
            SUBMIT
</button>
    </Formsy>
);

Contact.propTypes = {
    canSubmit: PropTypes.bool.isRequired,
    disableButton: PropTypes.func.isRequired,
    enableButton: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
};

export default Contact;
