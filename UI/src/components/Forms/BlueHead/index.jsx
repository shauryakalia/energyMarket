import React from 'react';
import PropTypes from 'prop-types';

// Custom Imports
import { colors } from '../../../theme.js';

// Component to display header bar in registration form
const BlueHead = ({ label }) => {
        return (<div style={{ background: '#021f54', margin: '10px' }}>
                <h6 style={{ color: colors.white, fontWeight: 'bold', padding: '1%' }}>{label}</h6>
        </div>
        );
}

BlueHead.propTypes = {
        label: PropTypes.string.isRequired,
};

export default BlueHead;