import React from 'react';
import PropTypes from 'prop-types';

// Custom Imports
import { colors } from '../../theme';

// Component to display available services
const Service = ({ heading, content }) => (
  <div className="cell small-6">
    <div className="grid-y" style={{ margin: '15% 0' }}>
      <div className="cell small-6 medium-8 large-2" style={{ color: colors.green }}>
        <h5>{heading}</h5>
      </div>
      <div className="cell small-6 medium-4 large-10 content" style={{ color: colors.navyBlue, paddingRight: '10%' }}>
        {content}
      </div>
    </div>
  </div>
);

Service.propTypes = {
  content: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
};

export default Service;
