import React from 'react';

// Custom Imports
import { colors } from '../../theme';

import data from '../../data/AboutUs';

import logo from '../../images/verde-blocks-logo_original.png';

// Container for About us component
const AboutUs = () => (
  <div className="grid-x app-content" style={{ background: colors.lightGreen, border: colors.white }}>
    <div className="cell small-6">
      {data.map(({ id, content, title }) => (
        <div key={id} className="grid-y" style={{ margin: '15%' }}>
          <div className="cell small-6 medium-8 large-2" style={{ color: colors.navyBlue }}>
            <h3 style={{ fontWeight: 'bold' }}>{title}</h3>
          </div>
          <div className="cell small-6 medium-4 large-10 content" style={{ color: colors.regularGray }}>
            {content}
          </div>
        </div>
      ))}

    </div>
    <div className="cell small-6">
      <ul style={{}}>
        <img alt="verde blocks" className="logoBanner" src={logo} />
      </ul>
    </div>
  </div>
);

export default AboutUs;
